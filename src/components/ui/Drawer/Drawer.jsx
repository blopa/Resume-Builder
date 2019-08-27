import React from 'react';
import MuiDrawer from '@material-ui/core/Drawer';

// Style
import style from './drawer.scss';

const Drawer = (props) => (
    <MuiDrawer
        className={style['drawer']}
        open={props.open}
        onClose={props.onClose}
        anchor="right"
        variant="persistent"
    >
        {props.children}
    </MuiDrawer>
);

export default Drawer;
