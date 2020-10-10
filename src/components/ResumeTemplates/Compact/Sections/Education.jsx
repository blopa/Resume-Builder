import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    subtitle: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
}));

const Education = ({
    education: educations,
    className = null,
}) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return educations.length > 0 && (
        <div
            className={classNames(className, classes.resumeEducation)}
        >
            <Typography
                className={classes.subtitle}
                color="textPrimary"
                variant="body1"
            >
                {intl.formatMessage({ id: 'education' })}
            </Typography>
            <ul className={classes.courses}>
                {educations.map((education) => {
                    if (education?.enabled) {
                        const {
                            institution,
                            area,
                            studyType,
                            startDate,
                            endDate,
                            // gpa,
                            courses,
                        } = education?.value || {};

                        const date = new Date(endDate?.value);
                        const diffTime = Math.abs(date - new Date(startDate?.value));
                        const diffDays = diffTime / 86400000;

                        return (
                            <li key={uuid()}>
                                <Typography
                                    color="textPrimary"
                                    variant="body1"
                                >
                                    {endDate?.enabled && (
                                        <span>
                                            {date.getFullYear()}
                                        </span>
                                    )}
                                    {area?.enabled && (
                                        <span>
                                            {area?.value}
                                        </span>
                                    )}
                                    {institution?.enabled && (
                                        <span>
                                            {institution?.value}
                                        </span>
                                    )}
                                </Typography>
                                <Typography
                                    color="textPrimary"
                                    variant="body1"
                                >
                                    {studyType?.enabled && (
                                        <span>
                                            {studyType?.value}
                                        </span>
                                    )}
                                    {endDate?.enabled && startDate?.enabled && (
                                        <span>
                                            (
                                            {Math.floor(diffDays / 30)}
                                            {' '}
                                            {intl.formatMessage({ id: 'months' })}
                                            )
                                        </span>
                                    )}
                                    {courses?.enabled && courses?.value?.[0]?.enabled && (
                                        <span>
                                            {courses?.value?.[0]?.value}
                                        </span>
                                    )}
                                </Typography>
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );
};

export default Education;
