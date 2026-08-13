/* eslint-disable react/prop-types, gatsby/purify-html */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';

const useStyles = makeStyles(() => ({
    reference: {
        pageBreakInside: 'avoid',
        marginBottom: '8px',
        '&:last-child': {
            marginBottom: 0,
        },
    },
    name: {
        fontWeight: 700,
    },
    quote: {
        '& p': {
            margin: 0,
        },
    },
}));

const References = ({ references }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'references' })}>
            {references.map((item, index) => {
                if (!item) {
                    return null;
                }

                return (
                    <article className={classes.reference} key={index}>
                        {item.name && <p className={classes.name}>{item.name}</p>}
                        {item.reference && (
                            <div className={classes.quote} dangerouslySetInnerHTML={{ __html: item.reference }} />
                        )}
                    </article>
                );
            })}
        </Section>
    );
};

export default References;
