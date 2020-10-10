import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    subtitle: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
}));

const Skills = ({ skills }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return skills.length > 0 && (
        <div className={classes.resumeSkills}>
            <Typography
                className={classes.subtitle}
                color="textPrimary"
                variant="body1"
            >
                {intl.formatMessage({ id: 'skills' })}
            </Typography>
            <ul className={classes.skills}>
                {skills.map((skill) => {
                    if (skill?.enabled) {
                        const {
                            name,
                            level,
                            keywords,
                        } = skill?.value || {};
                        return (
                            <li key={uuid()}>
                                lala
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
