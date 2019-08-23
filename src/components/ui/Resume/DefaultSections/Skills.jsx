import React, { Fragment } from 'react';
import style from './default-sections.scss';

const Skills = ({ skills }) =>
    skills.length > 0 && (
        <Fragment>
            <h4>Skills</h4>
            <ul>
                {skills.map((skill) => {
                    if (skill.enabled) {
                        const { name, level, keywords } = skill.value;
                        return (
                            <Fragment>
                                <p>
                                    {name && name.enabled && name.value}{', '}
                                    {level && level.enabled && level.value}
                                </p>
                                {keywords && keywords.enabled && (
                                    <ul>
                                        {keywords.value.map((keyword) =>
                                            keywords.enabled && <li>{keyword.value}</li>)
                                        }
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

export default Skills;
