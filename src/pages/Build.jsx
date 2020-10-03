import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { navigate } from 'gatsby-plugin-intl';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import A4Container from '../components/A4Container';
import { StoreContext } from '../store/StoreProvider';
import { isObjectNotEmpty } from '../utils/utils';
import DefaultTemplate from '../components/ResumeTemplates/Default/Default';

const useStyles = makeStyles((theme) => ({
    resumeWrapper: {
        margin: '10px 0',
    },
}));

const BuildPage = (props) => {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { state, dispatch } = useContext(StoreContext);
    const { jsonResume, togglableJsonResume } = state;
    const hasData = isObjectNotEmpty(togglableJsonResume) && isObjectNotEmpty(jsonResume);
    // console.log(togglableJsonResume);

    useEffect(() => {
        if (!hasData) {
            navigate('/');
        }
    }, [hasData]);

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
                        <DefaultTemplate
                            resume={togglableJsonResume}
                        />
                    </A4Container>
                </div>
            )}
        </Layout>
    );
};

export default BuildPage;
