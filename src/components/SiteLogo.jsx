import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    logoText: {
        fontFamily: 'Coolvetica',
    },
});

function SiteLogo() {
    const classes = useStyles();

    return (
        <Typography
            className={classes.logoText}
            color="textPrimary"
            variant="h5"
        >
            Resume Builder
        </Typography>
    );
}

export default SiteLogo;
