import React from 'react';
import classNames from 'classnames';
import style from './containers.scss';

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
