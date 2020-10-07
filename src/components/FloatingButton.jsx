import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    floatingButton: {
        margin: '10px 10px 0 0 !important',
        position: 'fixed !important',
        right: 0,
    },
}));
const FloatingButton = ({ onClick }) => {
    const classes = useStyles();
    return (
        <Fab
            color="primary"
            aria-label="add"
            onClick={onClick}
            className={classes.floatingButton}
        >
            <MenuIcon />
        </Fab>
    );
};

export default FloatingButton;
