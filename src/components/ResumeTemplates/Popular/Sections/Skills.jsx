/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

import Section from './Section';

const useStyles = makeStyles(() => ({
    list: { margin: 0, paddingLeft: '21px' },
    name: { fontWeight: 700 },
    level: { fontStyle: 'italic' },
}));

const Skills = ({ skills, languages, interests }) => {
    const classes = useStyles();
    const intl = useIntl();
    const languageText = languages
        ?.map(({ language, fluency } = {}) => [language, fluency].filter(Boolean).join(' – '))
        .filter(Boolean)
        .join(', ');
    const interestText = interests
        ?.map(({ name, keywords } = {}) => [name, keywords?.filter(Boolean).join(', ')].filter(Boolean).join(': '))
        .filter(Boolean)
        .join('; ');

    return (
        <Section title={intl.formatMessage({ id: 'skills' })}>
            <ul className={classes.list}>
                {skills.map(({ name, level, keywords } = {}, index) => {
                    const details = keywords?.filter(Boolean).join(', ');
                    return (
                        (name || details || level) && (
                            <li key={index}>
                                <span className={classes.name}>
                                    {name}
                                    {name && ':'}
                                </span>{' '}
                                {details}
                                {details && level && ' · '}
                                <span className={classes.level}>{level}</span>
                            </li>
                        )
                    );
                })}
                {languageText && (
                    <li>
                        <span className={classes.name}>{intl.formatMessage({ id: 'languages' })}:</span> {languageText}
                    </li>
                )}
                {interestText && (
                    <li>
                        <span className={classes.name}>{intl.formatMessage({ id: 'interests' })}:</span> {interestText}
                    </li>
                )}
            </ul>
        </Section>
    );
};

export default Skills;
