import React from 'react';
import style from './containers.scss';

const A4Container = (props) => (
    <div
        className={style['a4-container']}
    >
        {props.children}
    </div>
);

export default A4Container;
