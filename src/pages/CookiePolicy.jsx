import React from 'react';
import { useIntl } from 'gatsby-plugin-intl';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

// Components
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const useStyles = makeStyles((theme) => ({
    cookiePolicyWrapper: {
        padding: '0 5px',
        marginBottom: '15px',
        '& a': {
            color: '#8da4f7',
        },
        '& a:visited': {
            color: '#48578a',
        },
    },
    cookiePolicyText: {
        margin: '10px 0',
    },
    cookiePolicySectionText: {
        margin: '10px 0',
    },
    cookiePolicyThirdPartySubtitle: {
        marginTop: '10px',
    },
}));

const CookiePolicy = () => {
    const intl = useIntl();
    const classes = useStyles();

    return (
        <Layout>
            <SEO
                lang={intl.locale}
                title={intl.formatMessage({ id: 'cookie_law.title' })}
                keywords={[
                    intl.formatMessage({ id: 'cookie_law.title' }),
                ]}
            />
            <Typography
                className={classes.cookiePolicyText}
                color="textPrimary"
                variant="h4"
            >
                {intl.formatMessage({ id: 'cookie_law.title' })}
            </Typography>
            <div className={classes.cookiePolicyWrapper}>
                <Typography
                    className={classes.cookiePolicySectionText}
                    color="textPrimary"
                    variant="h6"
                >
                    {intl.formatMessage({ id: 'cookie_law.what_are_cookies' })}
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="body2"
                >
                    {intl.formatMessage({ id: 'cookie_law.what_are_cookies_text' })}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={intl.formatMessage({ id: 'cookie_law.what_are_cookies_more_info_url' })}
                    >
                        {intl.formatMessage({ id: 'cookie_law.what_are_cookies_more_info_url' })}
                    </a>
                </Typography>

                <Typography
                    className={classes.cookiePolicySectionText}
                    color="textPrimary"
                    variant="h6"
                >
                    {intl.formatMessage({ id: 'cookie_law.how_we_use_cookies' })}
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="body2"
                >
                    {intl.formatMessage({ id: 'cookie_law.how_we_use_cookies_text' })}
                </Typography>

                <Typography
                    className={classes.cookiePolicySectionText}
                    color="textPrimary"
                    variant="h6"
                >
                    {intl.formatMessage({ id: 'cookie_law.disabling_cookies' })}
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="body2"
                >
                    {intl.formatMessage({ id: 'cookie_law.disabling_cookies_text' })}
                </Typography>

                <Typography
                    className={classes.cookiePolicySectionText}
                    color="textPrimary"
                    variant="h6"
                >
                    {intl.formatMessage({ id: 'cookie_law.the_cookies_we_set' })}
                </Typography>

                <Typography
                    color="textPrimary"
                    variant="subtitle1"
                >
                    {intl.formatMessage({ id: 'cookie_law.site_preferences_cookie' })}
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="body2"
                >
                    {intl.formatMessage({ id: 'cookie_law.site_preferences_cookie_text' })}
                </Typography>

                <Typography
                    className={classes.cookiePolicyThirdPartySubtitle}
                    color="textPrimary"
                    variant="subtitle1"
                >
                    {intl.formatMessage({ id: 'cookie_law.third_party_cookies' })}
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="body2"
                >
                    {intl.formatMessage({ id: 'cookie_law.third_party_cookies_text' })}
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary={intl.formatMessage({ id: 'cookie_law.third_party_cookies_item_1' })}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={intl.formatMessage({ id: 'cookie_law.third_party_cookies_item_2' })}
                        />
                    </ListItem>
                </List>

                <Typography
                    className={classes.cookiePolicySectionText}
                    color="textPrimary"
                    variant="h6"
                >
                    {intl.formatMessage({ id: 'cookie_law.more_information' })}
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="body2"
                >
                    {intl.formatMessage({ id: 'cookie_law.more_information_text' })}
                </Typography>
            </div>
        </Layout>
    );
};

export default CookiePolicy;
