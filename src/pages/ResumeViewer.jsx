/* eslint template-curly-spacing: 0, indent: 0 */
/* globals TEMPLATES_LIST */
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { navigate, useIntl, RawIntlProvider } from 'gatsby-plugin-react-intl';
import { v4 as uuid } from 'uuid';
import { cloneDeep } from 'lodash';
import { Typography } from '@material-ui/core'; // Added Typography import

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
    const [username, lang] = (params['*'] || '').split('/');
    const template = uri.split('/').pop();
    const isPrinting = useDetectPrint();
    const [errorMessage, setErrorMessage] = useState(null); // Added errorMessage state

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
    const hasData = isObjectNotEmpty(toggleableJsonResume);

    useEffect(() => {
        const fetchResumeJsonAndLoadTemplate = async () => {
            if (!username) {
                // This case was previously navigate('/'), now setting an error or handling appropriately.
                // For this refactor, if username is missing, we can't fetch, so an error is appropriate.
                setErrorMessage(intl.formatMessage({ id: 'error.resume_fetch_failed' }));
                return;
            }

            const jsonString = await fetchGithubResumeJson(username);
            if (!jsonString) { // Check if jsonString is null or empty (fetch failure)
                setErrorMessage(intl.formatMessage({ id: 'error.resume_fetch_failed' }));
                return;
            }

            if (!isValidJsonString(jsonString)) {
                setErrorMessage(intl.formatMessage({ id: 'error.resume_invalid_json' }));
                return;
            }

            const jsonResume = JSON.parse(jsonString);
            if (!isObjectNotEmpty(jsonResume)) {
                setErrorMessage(intl.formatMessage({ id: 'error.resume_empty_json' }));
                return;
            }

            const toggleableObject = convertToToggleableObject(
                cloneDeep({
                    ...jsonResume,
                    __translation__: jsonResume.__translation__,
                    enableSourceDataDownload: jsonResume.enableSourceDataDownload,
                    coverLetter: {}, // Cover Letter not supported for the viewer
                })
            );

            if (!isObjectNotEmpty(toggleableObject)) {
                setErrorMessage(intl.formatMessage({ id: 'error.resume_processing_failed' }));
                return;
            }

            dispatch(setToggleableJsonResume(toggleableObject));
            const Template = await importTemplate(validTemplate);
            setResumeTemplate([
                <Template
                    key={uuid()}
                    customTranslations={toggleableObject.__translation__}
                    isPrinting={isPrinting}
                    jsonResume={{
                        ...baseResume,
                        ...convertToRegularObject(cloneDeep(toggleableObject)),
                    }}
                    coverLetterVariables={toggleableObject.coverLetter?.value?.variables || []}
                />,
            ]);
        };

        fetchResumeJsonAndLoadTemplate();
    }, [dispatch, intl, isPrinting, lang, username, validTemplate]); // Added intl to dependency array

    return (
        <RawIntlProvider value={pageIntl}>
            <SEO title={pageIntl.formatMessage({ id: 'resume_viewer' })} robots="noindex, nofollow" />
            <A4Container alignCenter>
                {errorMessage ? (
                    <Typography color="error">{errorMessage}</Typography>
                ) : (
                    <>
                        {hasData && <Suspense fallback={intl.formatMessage({ id: 'loading' })}>{resumeTemplate}</Suspense>}
                        {!hasData && intl.formatMessage({ id: 'loading' })}
                    </>
                )}
            </A4Container>
        </RawIntlProvider>
    );
};

export default ResumeViewer;
