import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeSkills: {
        pageBreakInside: 'avoid',
        padding: '15px 0',
    },
    skills: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 4px 0',
            '&:last-child': {
                margin: '0',
            },
        },
    },
    skillTitle: {
        fontWeight: 'bold',
    },
    level: {
        color: theme.palette.type === 'dark' ? '#b0b0b0' : '#7d7d7d',
    },
    contentWrapper: {
        marginTop: '8px',
    },
}));

const Skills = ({ skills }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return (
        skills?.length > 0 && (
            <div className={classes.resumeSkills}>
                <SectionTitle ref={sectionTitle} style={titleStyle}>
                    {intl.formatMessage({ id: 'skills' })}
                </SectionTitle>
                <div className={classes.contentWrapper}>
                    <ul className={classes.skills}>
                        {skills.map((skill) => {
                            if (skill) {
                                const { name, level, keywords } = skill || {};

                                let refProps = {};
                                if (!firstItem.current) {
                                    refProps = {
                                        ref: firstItem,
                                    };
                                }

                                // an unnamed group renders as the plain comma separated list the design shows
                                const keywordsText = keywords?.filter(Boolean).join(', ');

                                return (
                                    <li
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        <p>
                                            {name && <span className={classes.skillTitle}>{name}</span>}
                                            {name && level && <span className={classes.level}>{` (${level})`}</span>}
                                            {name && keywordsText && ': '}
                                            {keywordsText}
                                        </p>
                                    </li>
                                );
                            }

                            return null;
                        })}
                    </ul>
                </div>
            </div>
        )
    );
};

export default Skills;
