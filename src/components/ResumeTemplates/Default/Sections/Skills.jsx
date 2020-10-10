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
            display: 'inline-flex',
            margin: '0 0 10px 0',
            '&:last-child': {
                margin: '0',
            },
        },
    },
    title: { fontWeight: 'bold' },
    keywords: {
        margin: '0',
        padding: '0',
        display: 'flex',
        listStyle: 'none',
        '& li': {
            margin: '0 5px 0 0',
            '&:after': { content: '","' },
            '&:last-child': { '&:after': { content: '""' } },
        },
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
            <ul className={classes.skills}>
                {skills.map((skill) => {
                    if (skill?.enabled) {
                        const { name, level, keywords } = skill?.value || {};
                        return (
                            <li key={uuid()}>
                                <p className={classes.title}>
                                    {name?.enabled && name?.value}{', '}
                                    {level?.enabled && level?.value}
                                </p>
                                {keywords?.enabled && (
                                    <ul className={classes.keywords}>
                                        {keywords?.value.map((keyword) =>
                                            keywords?.enabled && <li key={uuid()}>{keyword?.value}</li>)}
                                    </ul>
                                )}
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );
};

export default Skills;
