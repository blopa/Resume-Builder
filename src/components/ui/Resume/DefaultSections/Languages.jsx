import React, { Fragment } from 'react';
import style from './default-sections.scss';

const Languages = ({ languages }) =>
    languages.length > 0 && (
        <Fragment>
            <h4>Languages</h4>
            <ul>
                {languages.map((lang) => {
                    if (lang.enabled) {
                        const { language, fluency } = lang.value;
                        return (
                            <Fragment>
                                <p>
                                    {language && language.enabled && language.value}{', '}
                                    {fluency && fluency.enabled && fluency.value}
                                </p>
                            </Fragment>
                        );
                    }

                    return null;
                })}
            </ul>
        </Fragment>
    );

export default Languages;
