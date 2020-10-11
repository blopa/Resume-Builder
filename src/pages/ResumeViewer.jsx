/* eslint template-curly-spacing: 0, indent: 0 */
/* globals TEMPLATES_LIST */
import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { navigate, useIntl } from 'gatsby-plugin-intl';
import { v4 as uuid } from 'uuid';
import { cloneDeep } from 'lodash';
import SEO from '../components/SEO';
import { fetchGithubResumeJson, isValidJsonString } from '../utils/gatsby-frontend-helpers';
import A4Container from '../components/A4Container';
import { StoreContext } from '../store/StoreProvider';
import setJsonResume from '../store/actions/setJsonResume';
import { isObjectNotEmpty, traverseObject } from '../utils/utils';
import setTogglableJsonResume from '../store/actions/setTogglableJsonResume';

const importTemplate = (template) => lazy(() =>
    import(`../components/ResumeTemplates/${template}/Index`).catch(() =>
        import('../components/ResumeTemplates/Default/Index')));

const ResumeViewer = ({ params, uri }) => {
    const intl = useIntl();
    const [resumeTemplate, setResumeTemplate] = useState(['Default']);
    const { state, dispatch } = useContext(StoreContext);

    const username = params['*']; // TODO
    const template = uri.split('/').pop(); // TODO
    const validTemplate = TEMPLATES_LIST.find(
        (templateName) => templateName.toLowerCase() === template.toLowerCase()
    );
    const hasData = isObjectNotEmpty(state?.togglableJsonResume) && isObjectNotEmpty(state?.jsonResume);

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

            const togglableJsonResume = traverseObject(cloneDeep(jsonResume));
            if (!isObjectNotEmpty(togglableJsonResume)) {
                navigate('/');
            }

            dispatch(setJsonResume(jsonResume));
            dispatch(setTogglableJsonResume(togglableJsonResume));
            const Template = await importTemplate(validTemplate);
            // console.log({validTemplate, jsonResume});
            setResumeTemplate([
                <Template
                    key={uuid()}
                    resume={togglableJsonResume}
                />,
            ]);
        };

        if (!username) {
            navigate('/');
        }

        fetchResumeJsonAndLoadTemplate();
    }, [dispatch, username, validTemplate]);

    return (
        <div>
            <SEO
                title={intl.formatMessage({ id: 'resume_viewer' })}
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
        </div>
    );
};

export default ResumeViewer;
