import React from 'react';
import style from './default-sections.scss';

const References = ({ references }) =>
    references.length > 0 && (
        <div className={style['resume-references']}>
            <h4>References</h4>
            <ul className={style['resume-references']}>
                {references.map((ref) => {
                    if (ref.enabled) {
                        const { name, reference } = ref.value;
                        return (
                            <li>
                                {name && name.enabled && <p>{name.value}</p>}
                                {reference && reference.enabled && <p>{reference.value}</p>}
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );

export default References;
