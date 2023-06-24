/* globals VERSION */
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    logoText: {
        fontFamily: 'Coolvetica',
        color: theme.palette.primary.contrastText,
    },
    versionText: {
        fontSize: '0.9rem',
    },
}));

function SiteLogo() {
    const classes = useStyles();
    const buildVersion = VERSION;

    return (
        <Typography className={classes.logoText} variant="h5">
            Resume Builder
            <span className={classes.versionText}>{` v ${buildVersion}`}</span>
        </Typography>
    );
}

export default SiteLogo;
