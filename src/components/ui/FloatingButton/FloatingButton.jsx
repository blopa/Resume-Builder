import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';

// Style
import style from './floating-button.scss';

const FloatingButton = (props) => (
    <Fab
        color="primary"
        aria-label="add"
        onClick={props.onClick}
        className={style['floating-button']}
    >
        <MenuIcon />
    </Fab>
);

export default FloatingButton;
