import React from 'react';
import style from './default-sections.scss';
import uuid from 'uuid';

const Education = ({ education: educations }) =>
    educations.length > 0 && (
        <div className={style['resume-education']}>
            <h3>Education</h3>
            <ul className={style['resume-education--courses']}>
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
                            <li key={uuid()}>
                                <p className={style['resume-education--type']}>
                                    {area && area.enabled && area.value}{', '}
                                    {studyType && studyType.enabled && studyType.value}
                                </p>
                                <p className={style['resume-education--institution']}>
                                    {institution && institution.enabled && institution.value}{', '}
                                    {startDate && startDate.enabled && startDate.value}
                                    {' - '}
                                    {endDate && endDate.enabled && endDate.value}{', '}
                                    {gpa && gpa.enabled && `GPA: ${gpa.value}`}
                                </p>
                                {courses && courses.enabled && (
                                    <div className={style['resume-education--courses-details']}>
                                        <p>Courses: </p>
                                        <ul>
                                            {courses.value.map((course) => course.enabled && (
                                                <li key={uuid()}>
                                                    {course.value}
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

export default Education;
