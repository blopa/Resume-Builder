/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';

const useStyles = makeStyles(() => ({
    list: {
        margin: 0,
        paddingLeft: '22px',
    },
    name: {
        fontWeight: 700,
    },
}));

const Interests = ({ interests }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'interests' })}>
            <ul className={classes.list}>
                {interests.map((item, index) => {
                    if (!item) {
                        return null;
                    }

                    const { name, keywords } = item;
                    const keywordsText = keywords?.filter(Boolean).join(', ');

                    return (
                        (name || keywordsText) && (
                            <li key={index}>
                                {name && <span className={classes.name}>{name}</span>}
                                {name && keywordsText && ' - '}
                                {keywordsText}
                            </li>
                        )
                    );
                })}
            </ul>
        </Section>
    );
};

export default Interests;
