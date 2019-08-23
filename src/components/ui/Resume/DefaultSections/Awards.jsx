import React, { Fragment } from 'react';
import style from './default-sections.scss';

const Awards = ({ awards }) =>
    awards.length > 0 && (
        <Fragment>
            <h4>Awards</h4>
            <ul>
                {awards.map((award) => {
                    if (award.enabled) {
                        const { title, date, awarder, summary } = award.value;
                        return (
                            <Fragment>
                                <p>{title && title.enabled && title.value}</p>
                                <p>{date && date.enabled && date.value}</p>
                                <p>{awarder && awarder.enabled && awarder.value}</p>
                                <p>{summary && summary.enabled && summary.value}</p>
                            </Fragment>
                        );
                    }

                    return null;
                })}
            </ul>
        </Fragment>
    );

export default Awards;
