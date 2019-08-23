import React, { Fragment } from 'react';
import style from './default-sections.scss';

const Work = ({ work: works }) =>
    works.length > 0 && (
        <Fragment>
            <h4>Experience</h4>
            <ul>
                {works.map((work) => {
                    if (work.enabled) {
                        const {
                            company,
                            position,
                            website,
                            startDate,
                            endDate,
                            summary,
                            highlights,
                        } = work.value;

                        return (
                            <li>
                                <p>
                                    {position && position.enabled && `${position.value}, `}
                                    {company && company.enabled && `${company.value}, `}
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

export default Work;
