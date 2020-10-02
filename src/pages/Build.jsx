import React, { Fragment, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { navigate } from 'gatsby-plugin-intl';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import A4Container from '../components/A4Container';
import { StoreContext } from '../store/StoreProvider';
import { isObjectNotEmpty } from '../utils/utils';

const useStyles = makeStyles((theme) => ({
    // TODO
}));

const BuildPage = (props) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(StoreContext);
    const { jsonResume, togglableJsonResume } = state;
    const hasData = isObjectNotEmpty(togglableJsonResume) && isObjectNotEmpty(jsonResume);

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
                <Fragment>
                    <Typography
                        color="textPrimary"
                        variant="overline"
                    >
                        Hello World
                    </Typography>
                    <A4Container>
                        Some text@!
                    </A4Container>
                </Fragment>
            )}
        </Layout>
    );
};

export default BuildPage;
