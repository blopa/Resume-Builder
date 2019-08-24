import React from 'react';
import style from './default-sections.scss';

const Interests = ({ interests }) =>
    interests.length > 0 && (
        <div className={style['resume-interests']}>
            <h4>Interests</h4>
            <ul className={style['resume-interests--interests']}>
                {interests.map((interest) => {
                    if (interest.enabled) {
                        const { name, keywords } = interest.value;
                        return (
                            <li>
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
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );

export default Interests;
