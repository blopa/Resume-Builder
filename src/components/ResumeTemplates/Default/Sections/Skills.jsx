import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeSkills: {
        pageBreakInside: 'avoid',
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    skills: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 10px 0',
            '&:last-child': {
                margin: '3px 0 0',
            },
        },
    },
    skillTitle: {
        fontWeight: 'bold',
    },
    keywords: {
        flexWrap: 'wrap',
        listStyle: 'none',
        paddingLeft: 0,
        display: 'inline-flex',
        '& li': {
            fontStyle: 'italic',
            margin: '3px 3px 0 0',
            backgroundColor: theme.palette.type === 'dark' ? '#28407b' : '#dae4f4',
            borderRadius: '3px',
            padding: '1px 3px',
        },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    title: {
        pageBreakInside: 'avoid',
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
                <h3 ref={sectionTitle} className={classes.title} style={titleStyle}>
                    {intl.formatMessage({ id: 'skills' })}
                </h3>
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

                                return (
                                    <li
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        {(name || level) && (
                                            <p className={classes.skillTitle}>
                                                {name}
                                                {name && level && ', '}
                                                {level}
                                            </p>
                                        )}
                                        {keywords?.length > 0 && (
                                            <ul className={classes.keywords}>
                                                {keywords?.map((keyword) => keyword && <li key={uuid()}>{keyword}</li>)}
                                            </ul>
                                        )}
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
