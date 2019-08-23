import React, { Fragment } from 'react';
import style from './default-sections.scss';

const References = ({ references }) =>
    references.length > 0 && (
        <Fragment>
            <h4>References</h4>
            <ul>
                {references.map((ref) => {
                    if (ref.enabled) {
                        const { name, reference } = ref.value;
                        return (
                            <Fragment>
                                {name && name.enabled && <p>{name.value}</p>}
                                {reference && reference.enabled && <p>{reference.value}</p>}
                            </Fragment>
                        );
                    }

                    return null;
                })}
            </ul>
        </Fragment>
    );

export default References;
