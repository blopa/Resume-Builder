import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    resumeSkills: {
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
                margin: '0',
            },
        },
    },
    title: { fontWeight: 'bold' },
    keywords: {
        marginTop: '3px',
        listStyle: 'none',
        paddingLeft: 0,
        display: 'inline-flex',
        '& li': {
            fontStyle: 'italic',
            margin: '0 3px 0 0',
            backgroundColor: theme.palette.type === 'dark' ? '#28407b' : '#dae4f4',
            borderRadius: '3px',
            padding: '1px 3px',
        },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
}));

const Skills = ({ skills }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return skills.length > 0 && (
        <div className={classes.resumeSkills}>
            <h3>
                {intl.formatMessage({ id: 'skills' })}
            </h3>
            <div className={classes.contentWrapper}>
                <ul className={classes.skills}>
                    {skills.map((skill) => {
                        if (skill?.enabled) {
                            const { name, level, keywords } = skill?.value || {};
                            return (
                                <li key={uuid()}>
                                    {(name?.enabled || level?.enabled) && (
                                        <p className={classes.title}>
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
