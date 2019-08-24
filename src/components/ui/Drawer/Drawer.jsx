import React from 'react';
import MuiDrawer from '@material-ui/core/Drawer';

// Style
import style from './drawer.scss';

const Drawer = (props) => (
    <MuiDrawer
        open={props.open}
        onClose={props.onClose}
        anchor="right"
    >
        {props.children}
    </MuiDrawer>
);

export default Drawer;

