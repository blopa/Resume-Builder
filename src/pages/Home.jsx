import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useIntl } from 'gatsby-plugin-intl';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Link from '../components/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    subtitle: {
        marginTop: '2px',
    },
    paragraph: {
        marginBottom: '10px',
    },
    pageContent: {
        padding: '5px',
        '& a': {
            color: '#8da4f7',
        },
        '& a:visited': {
            color: '#48578a',
        },
    },
}));

const HomePage = () => {
    const intl = useIntl();
    const classes = useStyles();

    return (
        <Layout>
            <SEO
                title={intl.formatMessage({ id: 'home' })}
            />
            <Typography
                color="textPrimary"
                variant="h4"
            >
                {intl.formatMessage({ id: 'title' })}
            </Typography>
            <div
                className={classes.pageContent}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"
                >
                    {intl.formatMessage({ id: 'what_is_resume_builder' })}
                </Typography>
                <Typography
                    className={classes.paragraph}
                    color="textPrimary"
                    variant="body1"
                >
                    {intl.formatMessage({
                        id: 'what_is_resume_builder_description',
                    },
                    {
                        // eslint-disable-next-line react/display-name
                        a: (msg) => (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://${msg}`}
                            >
                                {msg}
                            </a>
                        ),
                    })}
                </Typography>
                <Typography
                    className={classes.subtitle}
                    color="textPrimary"
                    variant="h6"
                >
                    {intl.formatMessage({ id: 'how_question' })}
                </Typography>
                <Typography
                    className={classes.paragraph}
                    color="textPrimary"
                    variant="body1"
                >
                    {intl.formatMessage({
                        id: 'how_question_description',
                    },
                    {
                        // eslint-disable-next-line react/display-name
                        a: (msg) => (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://${msg}`}
                            >
                                {msg}
                            </a>
                        ),
                        // eslint-disable-next-line react/display-name
                        spreadsheet: (msg) => (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://docs.google.com/spreadsheets/d/1UCdsEiyO68IEdfVhW-Gfrg7FfI4pLaij37D5Eh-v8hQ/copy"
                            >
                                {msg}
                            </a>
                        ),
                        // eslint-disable-next-line react/display-name
                        upload: (msg) => (
                            <Link
                                to="/upload"
                            >
                                {msg}
                            </Link>
                        ),
                    })}
                </Typography>
                <Typography
                    className={classes.subtitle}
                    color="textPrimary"
                    variant="h6"
                >
                    {intl.formatMessage({ id: 'why_question' })}
                </Typography>
                <Typography
                    className={classes.paragraph}
                    color="textPrimary"
                    variant="body1"
                >
                    {intl.formatMessage({ id: 'why_question_description_1' })}
                </Typography>
                <Typography
                    className={classes.paragraph}
                    color="textPrimary"
                    variant="body1"
                >
                    {intl.formatMessage({ id: 'why_question_description_2' })}
                </Typography>
                <Typography
                    className={classes.paragraph}
                    color="textPrimary"
                    variant="body1"
                >
                    {intl.formatMessage({ id: 'why_question_description_3' })}
                </Typography>
                <Typography
                    className={classes.paragraph}
                    color="textPrimary"
                    variant="body1"
                >
                    {intl.formatMessage({ id: 'why_question_description_4' })}
                </Typography>
                <Typography
                    className={classes.subtitle}
                    color="textPrimary"
                    variant="h6"
                >
                    {intl.formatMessage({ id: 'resume_builder_rescue' })}
                </Typography>
                <Typography
                    className={classes.paragraph}
                    color="textPrimary"
                    variant="body1"
                >
                    {intl.formatMessage({ id: 'resume_builder_rescue_description' })}
                </Typography>
            </div>
        </Layout>
    );
};

export default HomePage;
