import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';

// Utils
import { mutedColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    // a second, narrower gutter: the group name on the left, its keywords on the right
    skill: {
        display: 'flex',
        alignItems: 'baseline',
        margin: '0 0 2px 0',
        '&:last-child': {
            margin: '0',
        },
    },
    skillName: {
        flex: '0 0 130px',
        paddingRight: '10px',
        fontWeight: 'bold',
    },
    level: {
        fontWeight: 'normal',
        color: mutedColor(theme),
    },
    keywords: {
        flex: '1',
        minWidth: '0',
    },
}));

const Skills = ({ skills }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        skills?.length > 0 && (
            <Section title={intl.formatMessage({ id: 'skills' })}>
                {skills.map((skill) => {
                    if (skill) {
                        const { name, level, keywords } = skill || {};
                        const keywordsText = keywords?.filter(Boolean).join(' · ');

                        if (!name && !keywordsText) {
                            return null;
                        }

                        return (
                            <div className={classes.skill} key={uuid()}>
                                {name && (
                                    <p className={classes.skillName}>
                                        {name}
                                        {level && <span className={classes.level}>{` (${level})`}</span>}
                                    </p>
                                )}
                                {keywordsText && <p className={classes.keywords}>{keywordsText}</p>}
                            </div>
                        );
                    }

                    return null;
                })}
            </Section>
        )
    );
};

export default Skills;
