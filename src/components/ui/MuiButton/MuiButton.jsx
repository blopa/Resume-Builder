import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const MuiButton = (props) => (
    <Button
        className={useStyles().button}
        color={props.color}
        variant={props.variant}
        onClick={props.onClick}
        disabled={props.disabled}
    >
        {props.children}
    </Button>
);

export default MuiButton;
