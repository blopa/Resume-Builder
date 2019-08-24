import React from 'react';
import style from './default-sections.scss';

const Volunteer = ({ volunteer: volunteers }) =>
    volunteers.length > 0 && (
        <div className={style['resume-volunteer']}>
            <h3>Volunteer</h3>
            <ul className={style['resume-volunteer--volunteers']}>
                {volunteers.map((volunteer) => {
                    if (volunteer.enabled) {
                        const {
                            organization,
                            position,
                            website,
                            startDate,
                            endDate,
                            summary,
                            highlights,
                        } = volunteer.value;

                        return (
                            <li>
                                <p className={style['resume-volunteer--position']}>
                                    {position && position.enabled && `${position.value}, `}
                                    {organization && organization.enabled && `${organization.value}, `}
                                    {startDate && startDate.enabled && startDate.value}
                                    {' - '}
                                    {endDate && endDate.enabled && endDate.value}
                                </p>
                                <p className={style['resume-volunteer--website']}>
                                    {website && website.enabled && website.value}
                                </p>
                                <p className={style['resume-volunteer--summary']}>
                                    {summary && summary.enabled && summary.value}
                                </p>
                                {highlights && highlights.enabled && (
                                    <ul className={style['resume-volunteer--highlights']}>
                                        {highlights.value.map((highlight) =>
                                            highlight && highlight.enabled && (
                                                <li>
                                                    {highlight.value}
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
    );

export default Volunteer;
