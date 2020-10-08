import React, { Fragment, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { Button, Container, Divider, Snackbar, Typography } from '@material-ui/core';
import { useIntl } from 'gatsby-plugin-intl';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

// Components
import Topbar from './Topbar';
import SiteDrawer from './Drawer';
import Link from './Link';

// Utils
import {
    clearSnackbarMessage,
    getCookieConsent,
    getSnackbarMessage,
    setCookieConsentSeen,
} from '../utils/gatsby-frontend-helpers';

const useStyles = makeStyles((theme) => ({
    siteContainer: {
        // ...theme?.palette?.type === 'light' && { background: '#fafafaa1' },
        // ...theme?.palette?.type === 'dark' && { background: '#303030ba' },
    },
    contentContainer: {
        // ...theme?.palette?.type === 'light' && { background: '#fafafaa1' },
        // ...theme?.palette?.type === 'dark' && { background: '#303030ba' },
    },
    footerContainer: {
        padding: '20px 0',
        '& a': {
            textDecoration: 'none',
            color: '#8da4f7',
        },
        '& a:visited': {
            textDecoration: 'none',
            color: '#48578a',
        },
        '& a:hover': {
            textDecoration: 'underline',
        },
    },
    topDivider: {
        marginBottom: '10px',
    },
    bottomDivider: {
        marginTop: '10px',
    },
}));

const Layout = ({
    children,
    hideTopbar = false,
    showLanguageSelector = true,
    onLanguageChange,
}) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);
    const classes = useStyles();
    const intl = useIntl();
    const [message, severity] = getSnackbarMessage();
    const [isShowingSnackbar, setIsShowingSnackbar] = useState(Boolean(message && severity));

    const cookieConsent = getCookieConsent();
    const [isShowingCookieConsent, setIsShowingCookieConsent] = useState(!cookieConsent);

    const handleCloseSnackbar = useCallback((event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        clearSnackbarMessage();
        setIsShowingSnackbar(false);
    }, []);

    const handleCloseCookieConsent = useCallback((event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setCookieConsentSeen();
        setIsShowingCookieConsent(false);
    }, []);

    return (
        <div>
            {!hideTopbar && (
                <Topbar
                    showLanguageSelector={showLanguageSelector}
                    onLanguageChange={onLanguageChange}
                />
            )}
            <SiteDrawer />
            <Container className={classes.siteContainer}>
                <Divider
                    className={classes.topDivider}
                />
                <main
                    className={classes.contentContainer}
                >
                    {children}
                </main>
                <Divider
                    className={classes.bottomDivider}
                />
                <footer className={classes.footerContainer}>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        {/* {new Date().getFullYear()} */}
                        {intl.formatMessage({ id: 'built_with' })}
                        <a
                            href="https://www.gatsbyjs.com/"
                            rel="noreferrer"
                            target="_blank"
                        >
                            Gatsby
                        </a>
                        {' | '}
                        <Link to="/cookie-policy">{intl.formatMessage({ id: 'cookie_law.title' })}</Link>
                    </Typography>
                </footer>
            </Container>
            <Snackbar
                open={isShowingSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={severity}
                >
                    {isShowingSnackbar && intl.formatMessage({ id: message })}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isShowingCookieConsent}
                onClose={handleCloseCookieConsent}
                // onEntered={setCookieConsentSeen}
                message={(
                    <Fragment>
                        {intl.formatMessage({ id: 'cookie_law.we_use_cookies' })}
                        <Link to="/cookie-policy">
                            {intl.formatMessage({ id: 'cookie_law.title' })}
                        </Link>
                    </Fragment>
                )}
                action={(
                    <Button
                        color="secondary"
                        size="small"
                        onClick={handleCloseCookieConsent}
                    >
                        {intl.formatMessage({ id: 'got_it' })}
                    </Button>
                )}
            />
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    hideTopbar: PropTypes.bool,
    showLanguageSelector: PropTypes.bool,
};

export default Layout;
