import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';

// Utils
import { mutedColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    reference: {
        pageBreakInside: 'avoid',
        margin: '0 0 6px 0',
        '&:last-child': {
            margin: '0',
        },
    },
    name: {
        fontWeight: 'bold',
    },
    quote: {
        fontStyle: 'italic',
        color: mutedColor(theme),
        '& p': {
            margin: '0',
        },
    },
}));

const References = ({ references }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        references?.length > 0 && (
            <Section title={intl.formatMessage({ id: 'references' })}>
                {references.map((ref, index) => {
                    if (ref) {
                        const { name, reference } = ref || {};

                        return (
                            <div className={classes.reference} key={index}>
                                {name && <p className={classes.name}>{name}</p>}
                                {reference && (
                                    <div className={classes.quote} dangerouslySetInnerHTML={{ __html: reference }} />
                                )}
                            </div>
                        );
                    }

                    return null;
                })}
            </Section>
        )
    );
};

export default References;
