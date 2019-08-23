import React, { Fragment } from 'react';
import style from './default-sections.scss';

const Publications = ({ publications }) =>
    publications.length > 0 && (
        <Fragment>
            <h4>Publications</h4>
            <ul>
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
                            <Fragment>
                                {name && name.enabled && <p>{name.value}</p>}
                                {summary && summary.enabled && <p>{summary.value}</p>}
                                {publisher && publisher.enabled && <p>{publisher.value}</p>}
                                {website && website.enabled && <p>{website.value}</p>}
                                {releaseDate && releaseDate.enabled && <p>{releaseDate.value}</p>}
                            </Fragment>
                        );
                    }

                    return null;
                })}
            </ul>
        </Fragment>
    );

export default Publications;
