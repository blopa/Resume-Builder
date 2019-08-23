import React from 'react';
import style from './default-sections.scss';

const References = ({ references }) => (
    <p>
        {JSON.stringify(references)}
    </p>
);

export default References;
