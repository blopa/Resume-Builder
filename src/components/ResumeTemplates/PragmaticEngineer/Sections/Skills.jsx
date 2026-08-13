/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';

// Utils
import { secondaryTextColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    list: {
        margin: 0,
        paddingLeft: '22px',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '100px 1fr',
        paddingLeft: '1px',
    },
    name: {
        color: secondaryTextColor(theme),
    },
    level: {
        color: secondaryTextColor(theme),
    },
}));

const Skills = ({ skills = [], languages = [] }) => {
    const classes = useStyles();
    const intl = useIntl();
    const hasSkills = skills?.length > 0;
    const hasLanguages = languages?.length > 0;
    const languagesText = languages
        .filter((item) => item?.language || item?.fluency)
        .map((item) => {
            if (item.language && item.fluency) {
                return `${item.language} (${item.fluency})`;
            }

            return item.language || item.fluency;
        })
        .join(', ');
    const title =
        hasSkills && hasLanguages
            ? intl.formatMessage({ id: 'technologies_and_languages' })
            : intl.formatMessage({ id: hasSkills ? 'skills' : 'languages' });

    return (
        <Section title={title}>
            <ul className={classes.list}>
                {languagesText && (
                    <li>
                        <div className={classes.row}>
                            <span className={classes.name}>{intl.formatMessage({ id: 'languages' })}:</span>
                            <span>{languagesText}</span>
                        </div>
                    </li>
                )}
                {skills.map((item, index) => {
                    if (!item) {
                        return null;
                    }

                    const { name, level, keywords } = item;
                    const keywordsText = keywords?.filter(Boolean).join(', ');

                    if (!name && !keywordsText && !level) {
                        return null;
                    }

                    return (
                        <li key={`skill-${index}`}>
                            <div className={classes.row}>
                                <span className={classes.name}>{name && `${name}:`}</span>
                                <span>
                                    {keywordsText}
                                    {keywordsText && level && ', '}
                                    {level && <span className={classes.level}>{level}</span>}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
};

export default Skills;
