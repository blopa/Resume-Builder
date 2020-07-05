import React from 'react';
import uuid from 'uuid';
import style from './default-sections.scss';

const Publications = ({ publications }) =>
    publications.length > 0 && (
        <div className={style['resume-publications']}>
            <h3>Publications</h3>
            <ul className={style['resume-publications--publications']}>
                {publications.map((publication) => {
                    if (publication.enabled) {
                        const {
                            name,
                            publisher,
                            releaseDate,
                            website,
                            summary,
                        } = publication.value;
                        return (
                            <li key={uuid()}>
                                {name && name.enabled && (
                                    <p className={style['resume-publications--publication']}>
                                        {name.value}
                                    </p>
                                )}
                                {publisher && publisher.enabled && <p>{publisher.value}</p>}
                                {website && website.enabled && <p>{website.value}</p>}
                                {releaseDate && releaseDate.enabled && <p>{releaseDate.value}</p>}
                                {summary && summary.enabled && <p>{summary.value}</p>}
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );

export default Publications;
