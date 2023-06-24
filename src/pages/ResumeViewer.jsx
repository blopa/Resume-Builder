/* eslint template-curly-spacing: 0, indent: 0 */
/* globals TEMPLATES_LIST */
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { navigate, useIntl, RawIntlProvider } from 'gatsby-plugin-react-intl';
import { v4 as uuid } from 'uuid';
import { cloneDeep } from 'lodash';

// Components
import SEO from '../components/SEO';
import A4Container from '../components/A4Container';

// Utils
import { fetchGithubResumeJson, isValidJsonString } from '../utils/gatsby-frontend-helpers';
import { isObjectNotEmpty, convertToToggleableObject, convertToRegularObject } from '../utils/utils';

// Hooks
import { useDispatch, useSelector } from '../store/StoreProvider';
import useDetectPrint from '../components/hooks/useDetectPrint';

// Actions
import setToggleableJsonResume from '../store/actions/setToggleableJsonResume';

// Translations
import templateIntls from '../intl';

// Base resume
import baseResume from '../store/resume.json';

// Selectors
import { selectToggleableJsonResume } from '../store/selectors';

const importTemplate = (template) =>
    lazy(() =>
        import(`../components/ResumeTemplates/${template}/Index`).catch(() =>
            import('../components/ResumeTemplates/Default/Index')
        )
    );

const ResumeViewer = ({ params, uri }) => {
    const intl = useIntl();
    const [username, lang] = (params['*'] || '').split('/'); // TODO
    const template = uri.split('/').pop(); // TODO
    const isPrinting = useDetectPrint();

    const pageIntl = useMemo(() => {
        const newIntl = templateIntls.find((tempIntl) => tempIntl.locale === lang);

        if (!newIntl) {
            return templateIntls.find((tempIntl) => tempIntl.locale === intl.defaultLocale);
        }

        return newIntl;
    }, [intl.defaultLocale, lang]);

    const [resumeTemplate, setResumeTemplate] = useState(['Default']);
    const toggleableJsonResume = useSelector(selectToggleableJsonResume);
    const dispatch = useDispatch();

    const validTemplate = TEMPLATES_LIST.find((templateName) => templateName.toLowerCase() === template.toLowerCase());
    // TODO
    const hasData = isObjectNotEmpty(toggleableJsonResume);

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

            const toggleableObject = convertToToggleableObject(
                cloneDeep({
                    ...jsonResume,
                    // eslint-disable-next-line no-underscore-dangle
                    __translation__: jsonResume.__translation__,
                    enableSourceDataDownload: jsonResume.enableSourceDataDownload,
                    // Cover Letter not supported for the viewer
                    coverLetter: {},
                })
            );
            if (!isObjectNotEmpty(toggleableObject)) {
                navigate('/');
            }

            dispatch(setToggleableJsonResume(toggleableObject));
            const Template = await importTemplate(validTemplate);
            setResumeTemplate([
                <Template
                    key={uuid()}
                    // eslint-disable-next-line no-underscore-dangle
                    customTranslations={toggleableObject.__translation__}
                    isPrinting={isPrinting}
                    // TODO maybe just send the JSON directly
                    jsonResume={{
                        ...baseResume,
                        ...convertToRegularObject(cloneDeep(toggleableObject)),
                    }}
                    coverLetterVariables={toggleableObject.coverLetter?.value?.variables || []}
                />,
            ]);
        };

        if (!username) {
            navigate('/');
        }

        fetchResumeJsonAndLoadTemplate();
    }, [dispatch, intl.defaultLocale, isPrinting, lang, username, validTemplate]);

    return (
        <RawIntlProvider value={pageIntl}>
            <SEO title={pageIntl.formatMessage({ id: 'resume_viewer' })} robots="noindex, nofollow" />
            <A4Container alignCenter>
                {hasData && <Suspense fallback={intl.formatMessage({ id: 'loading' })}>{resumeTemplate}</Suspense>}
                {!hasData && intl.formatMessage({ id: 'loading' })}
            </A4Container>
        </RawIntlProvider>
    );
};

export default ResumeViewer;
