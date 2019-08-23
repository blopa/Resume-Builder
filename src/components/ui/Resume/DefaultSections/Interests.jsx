import React, { Fragment } from 'react';
import style from './default-sections.scss';

const Interests = ({ interests }) =>
    interests.length > 0 && (
        <Fragment>
            <h4>Interests</h4>
            <ul>
                {interests.map((interest) => {
                    if (interest.enabled) {
                        const { name, keywords } = interest.value;
                        return (
                            <Fragment>
                                {name && name.enabled && <p>{name.value}</p>}
                                {keywords && keywords.enabled && (
                                    <ul>
                                        {keywords.value.map((keyword) =>
                                            keyword && keyword.enabled && (
                                                <li>
                                                    {keyword.value}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </Fragment>
                        );
                    }

                    return null;
                })}
            </ul>
        </Fragment>
    );

export default Interests;
