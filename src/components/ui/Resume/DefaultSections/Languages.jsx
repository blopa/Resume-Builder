import React from 'react';
import style from './default-sections.scss';

const Languages = ({ languages }) =>
    languages.length > 0 && (
        <div className={style['resume-languages']}>
            <h4>Languages</h4>
            <ul className={style['resume-languages-languages']}>
                {languages.map((lang) => {
                    if (lang.enabled) {
                        const { language, fluency } = lang.value;
                        return (
                            <li>
                                <p>
                                    {language && language.enabled && language.value}{', '}
                                    {fluency && fluency.enabled && fluency.value}
                                </p>
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );

export default Languages;
