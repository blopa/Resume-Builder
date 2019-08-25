import React from 'react';
import Close from '@material-ui/icons/Close';
import style from './icons.scss';

const CloseIcon = (props) => (
    <button
        type="button"
        onClick={props.onClick}
        className={style['close-icon']}
    >
        <Close />
    </button>
);

export default CloseIcon;
