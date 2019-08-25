import React from 'react';
import style from './default-sections.scss';
import uuid from 'uuid';

const Work = ({ work: works }) =>
    works.length > 0 && (
        <div className={style['resume-work']}>
            <h3>Experience</h3>
            <ul className={style['resume-work--works']}>
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
                            <li key={uuid()}>
                                <p className={style['resume-work--position']}>
                                    {position && position.enabled && `${position.value}, `}
                                    {company && company.enabled && `${company.value}, `}
                                    {startDate && startDate.enabled && startDate.value}
                                    {' - '}
                                    {endDate && endDate.enabled && endDate.value}
                                </p>
                                <p className={style['resume-work--website']}>
                                    {website && website.enabled && website.value}
                                </p>
                                <p className={style['resume-work--summary']}>
                                    {summary && summary.enabled && summary.value}
                                </p>
                                {highlights && highlights.enabled && (
                                    <ul className={style['resume-work--highlights']}>
                                        {highlights.value.map((highlight) =>
                                            highlight && highlight.enabled && (
                                                <li key={uuid()}>
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

export default Work;
