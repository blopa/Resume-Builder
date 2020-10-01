import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Typography } from '@material-ui/core';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import { CustomThemeContext } from '../themes/CustomThemeProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const HomePage = (props) => {
    const classes = useStyles();
    const { currentTheme, setTheme } = useContext(CustomThemeContext);
    const handleThemeChange = (event) => {
        const { checked } = event.target;
        if (checked) {
            setTheme('dark');
        } else {
            setTheme('normal');
        }
    };

    return (
        <Layout>
            <SEO title="Home" />
            <Switch
                checked={Boolean(currentTheme === 'dark')}
                onChange={handleThemeChange}
            />
            <Typography
                color="textPrimary"
                variant="overline"
            >
                Hello World
            </Typography>
        </Layout>
    );
};

export default HomePage;
