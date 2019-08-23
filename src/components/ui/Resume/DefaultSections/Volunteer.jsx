import React, { Fragment } from 'react';
import style from './default-sections.scss';

const Volunteer = ({ volunteer: volunteers }) =>
    volunteers.length > 0 && (
        <Fragment>
            <h4>Volunteer</h4>
            <ul>
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
                                <p>
                                    {position && position.enabled && `${position.value}, `}
                                    {organization && organization.enabled && `${organization.value}, `}
                                    {startDate && startDate.enabled && startDate.value}
                                    {' - '}
                                    {endDate && endDate.enabled && endDate.value}
                                </p>
                                <p>
                                    {website && website.enabled && website.value}
                                </p>
                                <p>
                                    {summary && summary.enabled && summary.value}
                                </p>
                                {highlights && highlights.enabled && (
                                    <ul>
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
        </Fragment>
    );

export default Volunteer;
