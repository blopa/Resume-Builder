/* eslint template-curly-spacing: 0, indent: 0 */
import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { navigate } from 'gatsby-plugin-intl';
import { v4 as uuid } from 'uuid';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import A4Container from '../components/A4Container';
import { StoreContext } from '../store/StoreProvider';
import { isObjectNotEmpty } from '../utils/utils';
// import DefaultTemplate from '../components/ResumeTemplates/Default/Index';

const useStyles = makeStyles((theme) => ({
    resumeWrapper: {
        margin: '10px 0',
    },
}));

const importTemplate = (template) => lazy(() =>
    import(`../components/ResumeTemplates/${template}`).catch(() =>
        import('../components/ResumeTemplates/Default')));

const BuildPage = (props) => {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [resumeTemplate, setResumeTemplate] = useState([]);
    const { state, dispatch } = useContext(StoreContext);
    const {
        jsonResume,
        togglableJsonResume,
        resumeTemplate: resumeTemplateName,
    } = state;
    const hasData = isObjectNotEmpty(togglableJsonResume) && isObjectNotEmpty(jsonResume);
    // console.log(togglableJsonResume);

    useEffect(() => {
        if (!hasData) {
            navigate('/');
        }
    }, [hasData]);

    useEffect(() => {
        async function loadTemplate() {
            const Template = await importTemplate(resumeTemplateName);
            setResumeTemplate([
                <Template
                    key={uuid()}
                    resume={togglableJsonResume}
                />,
            ]);
        }
        loadTemplate();
    }, [resumeTemplateName, togglableJsonResume]);

    return (
        <Layout>
            <SEO
                title="Build"
            />
            {hasData && (
                <div className={classes.resumeWrapper}>
                    <A4Container
                        alignCenter={!isDrawerOpen}
                    >
                        <Suspense
                            fallback="Loading..."
                        >
                            {resumeTemplate}
                        </Suspense>
                    </A4Container>
                </div>
            )}
        </Layout>
    );
};

export default BuildPage;
