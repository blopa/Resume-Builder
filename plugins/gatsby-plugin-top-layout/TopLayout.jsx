/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import CustomThemeProvider from '../../src/store/CustomThemeProvider';
import CustomMenuProvider from '../../src/store/CustomMenuProvider';
import StoreProvider from '../../src/store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    siteWrapper: {
        '@media print': {
            visibility: 'hidden',
        },
    },
}));

export default function TopLayout(props) {
    const classes = useStyles();
    return (
        <Fragment>
            <Helmet>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <section className={classes.siteWrapper}>
                <CustomMenuProvider>
                    <CustomThemeProvider>
                        <StoreProvider>
                            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                            <CssBaseline />
                            {props.children}
                        </StoreProvider>
                    </CustomThemeProvider>
                </CustomMenuProvider>
            </section>
        </Fragment>
    );
}

TopLayout.propTypes = {
    children: PropTypes.node,
};
