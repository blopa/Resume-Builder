import React from 'react';
import style from './default-sections.scss';
import uuid from 'uuid';

const Awards = ({ awards }) =>
    awards.length > 0 && (
        <div className={style['resume-awards']}>
            <h3>Awards</h3>
            <ul className={style['resume-awards--awards']}>
                {awards.map((award) => {
                    if (award.enabled) {
                        const { title, date, awarder, summary } = award.value;
                        return (
                            <li key={uuid()}>
                                <p className={style['resume-awards--award']}>
                                    {title && title.enabled && title.value}
                                </p>
                                <p>{awarder && awarder.enabled && awarder.value}</p>
                                <p>{date && date.enabled && date.value}</p>
                                <p>{summary && summary.enabled && summary.value}</p>
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );

export default Awards;
