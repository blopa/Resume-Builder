import React, { useContext, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

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
    const intl = useContext(IntlContext);
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return skills.length > 0 && (
        <div className={classes.resumeSkills}>
            <h3
                ref={sectionTitle}
                className={classes.title}
                style={titleStyle}
            >
                {intl.formatMessage({ id: 'skills' })}
            </h3>
            <div className={classes.contentWrapper}>
                <ul className={classes.skills}>
                    {skills.map((skill) => {
                        if (skill?.enabled) {
                            const {
                                name,
                                level,
                                keywords,
                            } = skill?.value || {};

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
                                    {(name?.enabled || level?.enabled) && (
                                        <p className={classes.skillTitle}>
                                            {name?.enabled && name?.value}
                                            {(name?.enabled && level?.enabled) && ', '}
                                            {level?.enabled && level?.value}
                                        </p>
                                    )}
                                    {keywords?.enabled && (
                                        <ul className={classes.keywords}>
                                            {keywords?.value.map((keyword) =>
                                                keyword?.enabled && (
                                                    <li key={uuid()}>
                                                        {keyword?.value}
                                                    </li>
                                                ))}
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
    );
};

export default Skills;
