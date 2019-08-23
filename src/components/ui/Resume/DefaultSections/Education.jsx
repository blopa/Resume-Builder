import React, { Fragment } from 'react';
import style from './default-sections.scss';

const Education = ({ education: educations }) =>
    educations.length > 0 && (
        <Fragment>
            <h4>Education</h4>
            <ul>
                {educations.map((education) => {
                    if (education.enabled) {
                        const {
                            institution,
                            area,
                            studyType,
                            startDate,
                            endDate,
                            gpa,
                            courses,
                        } = education.value;
                        return (
                            <Fragment>
                                <p>
                                    {area && area.enabled && area.value}{', '}
                                    {studyType && studyType.enabled && studyType.value}
                                </p>
                                <p>
                                    {institution && institution.enabled && institution.value}{', '}
                                    {startDate && startDate.enabled && startDate.value}
                                    {' - '}
                                    {endDate && endDate.enabled && endDate.value}{', '}
                                    {gpa && gpa.enabled && `GPA: ${gpa.value}`}
                                </p>
                                {courses && courses.enabled && (
                                    <Fragment>
                                        <p>Courses: </p>
                                        <ul>
                                            {courses.value.map((course) => course.enabled && (
                                                <li>
                                                    {course.value}
                                                </li>
                                            ))}
                                        </ul>
                                    </Fragment>
                                )}
                            </Fragment>
                        );
                    }

                    return null;
                })}
            </ul>
        </Fragment>
    );

export default Education;
