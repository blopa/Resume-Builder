/* eslint-disable react/prop-types, gatsby/purify-html */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

import Section from './Section';

const useStyles = makeStyles(() => ({
    summary: {
        '& p': {
            margin: 0,
        },
        '& ul': {
            margin: '3px 0 0',
            paddingLeft: '20px',
        },
    },
}));

const Summary = ({ summary }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'summary' })}>
            <div className={classes.summary} dangerouslySetInnerHTML={{ __html: summary }} />
        </Section>
    );
};

export default Summary;
