/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

import Section from './Section';

const useStyles = makeStyles(() => ({
    list: {
        margin: 0,
        paddingLeft: '19px',
        '& li': {
            marginBottom: '3px',
        },
    },
    level: {
        fontStyle: 'italic',
    },
}));

const Skills = ({ skills }) => {
    const classes = useStyles();
    const intl = useIntl();
    const items = skills.flatMap(({ name, level, keywords } = {}) => {
        const skillKeywords = keywords?.filter(Boolean) || [];

        if (skillKeywords.length > 0) {
            return skillKeywords;
        }
        if (!name) {
            return [];
        }

        return [
            <span key={name}>
                {name}
                {level && <span className={classes.level}>{` — ${level}`}</span>}
            </span>,
        ];
    });

    return (
        <Section title={intl.formatMessage({ id: 'skills' })}>
            <ul className={classes.list}>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </Section>
    );
};

export default Skills;
