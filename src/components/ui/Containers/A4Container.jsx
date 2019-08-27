import React from 'react';
import style from './containers.scss';
import classNames from 'classnames';

const A4Container = (props) => (
    <div
        className={classNames(
            style['a4-container'],
            props.className
        )}
    >
        {props.children}
    </div>
);

export default A4Container;
