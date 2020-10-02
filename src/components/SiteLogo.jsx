import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    logoText: {
        fontFamily: 'Coolvetica',
        color: theme.palette.primary.contrastText,
    },
}));

function SiteLogo() {
    const classes = useStyles();

    return (
        <Typography
            className={classes.logoText}
            variant="h5"
        >
            Resume Builder
        </Typography>
    );
}

export default SiteLogo;
