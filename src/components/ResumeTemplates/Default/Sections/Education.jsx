import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    resumeEducation: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    type: { fontWeight: 'bold' },
    institution: {},
    courses: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': { margin: '0 0 10px 0', '&:last-child': { margin: '0' } },
    },
    coursesDetails: {
        display: 'flex',
        '& ul': {
            margin: '0 0 0 5px',
            padding: '0',
            display: 'flex',
            listStyle: 'none',
            '& li': {
                margin: '0 5px 0 0',
                '&:after': { content: '","' },
                '&:last-child': { '&:after': { content: '""' } },
            },
        },
    },
}));

const Education = ({ education: educations }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return educations.length > 0 && (
        <div className={classes.resumeEducation}>
            <h3>
                {intl.formatMessage({ id: 'education' })}
            </h3>
            <ul className={classes.courses}>
                {educations.map((education) => {
                    if (education?.enabled) {
                        const {
                            institution,
                            area,
                            studyType,
                            startDate,
                            endDate,
                            gpa,
                            courses,
                        } = education?.value || {};

                        return (
                            <li key={uuid()}>
                                <p className={classes.type}>
                                    {area?.enabled && area?.value}{', '}
                                    {studyType?.enabled && studyType?.value}
                                </p>
                                <p className={classes.institution}>
                                    {institution && institution?.enabled && institution?.value}{', '}
                                    {startDate && startDate?.enabled && startDate?.value}
                                    {' - '}
                                    {endDate && endDate?.enabled && endDate?.value}{', '}
                                    {gpa && gpa?.enabled && `GPA: ${gpa?.value}`}
                                </p>
                                {courses && courses?.enabled && (
                                    <div className={classes.coursesDetails}>
                                        <p>Courses: </p>
                                        <ul>
                                            {courses?.value.map((course) => course?.enabled && (
                                                <li key={uuid()}>
                                                    {course?.value}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
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

export default Education;
