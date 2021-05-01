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
    positionDate: {
        fontStyle: 'italic',
        fontSize: '0.8rem',
    },
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
    contentWrapper: {
        marginLeft: '4px',
    },
    educationWrapper: {
        pageBreakInside: 'avoid',
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
            <div className={classes.contentWrapper}>
                <ul className={classes.courses}>
                    {educations.map((education) => {
                        if (education?.enabled) {
                            const {
                                institution,
                                url,
                                area,
                                studyType,
                                startDate,
                                endDate,
                                score,
                                courses,
                            } = education?.value || {};

                            return (
                                <li className={classes.educationWrapper} key={uuid()}>
                                    <p className={classes.type}>
                                        {area?.enabled && area?.value}
                                        {(
                                            (area?.enabled && studyType?.enabled)
                                            && (area?.value && studyType?.value)
                                        ) && ', '}
                                        {studyType?.enabled && studyType?.value}
                                        {(startDate?.enabled || endDate?.enabled) && (
                                            <span className={classes.positionDate}>
                                                {' ('}
                                                {startDate?.enabled && startDate?.value}
                                                {(startDate?.enabled && endDate?.enabled) && ' - '}
                                                {endDate?.enabled && endDate?.value}
                                                {')'}
                                            </span>
                                        )}
                                    </p>
                                    <p className={classes.institution}>
                                        {
                                            (url?.enabled && institution?.enabled)
                                            && (url?.value && institution?.value) ?
                                                (
                                                    <a href={url?.value}>
                                                        {institution?.value}
                                                    </a>
                                                )
                                                : institution?.value}
                                        {score && score?.enabled && `, score: ${score?.value}`}
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
        </div>
    );
};

export default Education;
