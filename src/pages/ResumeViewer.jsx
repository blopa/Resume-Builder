/* eslint template-curly-spacing: 0, indent: 0 */
/* globals TEMPLATES_LIST */
import React, { lazy, Suspense, useContext, useEffect, useMemo, useState } from 'react';
import { navigate, useIntl, RawIntlProvider } from 'gatsby-plugin-intl';
import { v4 as uuid } from 'uuid';
import { cloneDeep } from 'lodash';
import useDetectPrint from 'use-detect-print';

// Components
import SEO from '../components/SEO';
import A4Container from '../components/A4Container';

// Utils
import { fetchGithubResumeJson, isValidJsonString } from '../utils/gatsby-frontend-helpers';
import { isObjectNotEmpty, convertToToggleableObject, convertToRegularObject } from '../utils/utils';

// Context
import { StoreContext } from '../store/StoreProvider';

// Actions
import setJsonResume from '../store/actions/setJsonResume';
import setToggleableJsonResume from '../store/actions/setToggleableJsonResume';

// Translations
import templateIntls from '../intl';

// Base resume
import baseResume from '../store/resume.json';

const importTemplate = (template) => lazy(() =>
    import(`../components/ResumeTemplates/${template}/Index`).catch(() =>
        import('../components/ResumeTemplates/Default/Index')));

const ResumeViewer = ({ params, uri }) => {
    const intl = useIntl();
    const [username, lang] = (params['*'] || '').split('/'); // TODO
    const template = uri.split('/').pop(); // TODO
    const isPrinting = useDetectPrint();

    const pageIntl = useMemo(() => {
        const newIntl = templateIntls.find(
            (tempIntl) => tempIntl.locale === lang
        );

        if (!newIntl) {
            return templateIntls.find(
                (tempIntl) => tempIntl.locale === intl.defaultLocale
            );
        }

        return newIntl;
    }, [intl.defaultLocale, lang]);

    const [resumeTemplate, setResumeTemplate] = useState(['Default']);
    const { state, dispatch } = useContext(StoreContext);

    const validTemplate = TEMPLATES_LIST.find(
        (templateName) => templateName.toLowerCase() === template.toLowerCase()
    );
    const hasData = isObjectNotEmpty(state?.toggleableJsonResume) && isObjectNotEmpty(state?.jsonResume);

    useEffect(() => {
        const fetchResumeJsonAndLoadTemplate = async () => {
            const jsonString = await fetchGithubResumeJson(username);
            if (!isValidJsonString(jsonString)) {
                navigate('/');
            }

            const jsonResume = JSON.parse(jsonString);
            if (!isObjectNotEmpty(jsonResume)) {
                navigate('/');
            }

            const toggleableJsonResume = convertToToggleableObject(cloneDeep(jsonResume));
            if (!isObjectNotEmpty(toggleableJsonResume)) {
                navigate('/');
            }

            dispatch(setJsonResume(jsonResume));
            dispatch(setToggleableJsonResume(toggleableJsonResume));
            const Template = await importTemplate(validTemplate);
            setResumeTemplate([
                <Template
                    key={uuid()}
                    // eslint-disable-next-line no-underscore-dangle
                    customTranslations={jsonResume.__translation__}
                    isPrinting={isPrinting}
                    jsonResume={{
                        ...baseResume,
                        ...convertToRegularObject(
                            cloneDeep(toggleableJsonResume)
                        ),
                    }}
                />,
            ]);
        };

        if (!username) {
            navigate('/');
        }

        fetchResumeJsonAndLoadTemplate();
    }, [dispatch, intl.defaultLocale, lang, username, validTemplate]);

    return (
        <RawIntlProvider
            value={pageIntl}
        >
            <SEO
                title={pageIntl.formatMessage({ id: 'resume_viewer' })}
                robots="noindex, nofollow"
            />
            <A4Container
                alignCenter
            >
                {hasData && (
                    <Suspense
                        fallback={intl.formatMessage({ id: 'loading' })}
                    >
                        {resumeTemplate}
                    </Suspense>
                )}
                {!hasData && intl.formatMessage({ id: 'loading' })}
            </A4Container>
        </RawIntlProvider>
    );
};

export default ResumeViewer;
