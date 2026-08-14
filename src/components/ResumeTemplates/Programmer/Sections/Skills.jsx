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
    name: {
        fontWeight: 600,
    },
}));

const Skills = ({ skills }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'skills' })}>
            <ul className={classes.list}>
                {skills.map((item, index) => {
                    if (!item) {
                        return null;
                    }

                    const { name, level, keywords } = item;
                    const keywordsText = keywords?.filter(Boolean).join(', ');

                    return (
                        (name || level || keywordsText) && (
                            <li key={index}>
                                {name && <span className={classes.name}>{name}</span>}
                                {name && (level || keywordsText) && ': '}
                                {keywordsText}
                                {keywordsText && level && ' — '}
                                {level && <span className={classes.level}>{level}</span>}
                            </li>
                        )
                    );
                })}
            </ul>
        </Section>
    );
};

export default Skills;
