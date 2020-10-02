import React, { useCallback, useContext } from 'react';
import { Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CustomThemeContext, dark, light } from '../store/CustomThemeProvider';

const useStyles = makeStyles({
    togglerWrapper: {
        // marginLeft: 'auto',
    },
    themeTogglerButton: {
        marginLEft: '5px',
        cursor: 'pointer',
        height: '32px',
        width: '40px',
        border: 'none',
        fontSize: '1.2rem',
        backgroundColor: 'transparent',
        outline: 'none',
        boxShadow: 'none',
    },
});

const ThemeToggler = ({ showSwitcher = false }) => {
    const classes = useStyles();
    const { currentTheme, setTheme } = useContext(CustomThemeContext);
    const handleThemeChange = useCallback(() => {
        if (currentTheme === dark) {
            setTheme(light);
        } else {
            setTheme(dark);
        }
    }, [currentTheme, setTheme]);

    return (
        <div className={classes.togglerWrapper}>
            <button
                type="button"
                onClick={handleThemeChange}
                className={classes.themeTogglerButton}
            >
                {currentTheme === dark ? '🌛' : '🌞'}
            </button>
            {showSwitcher && (
                <Switch
                    checked={Boolean(currentTheme === dark)}
                    onChange={handleThemeChange}
                />
            )}
        </div>
    );
};

export default ThemeToggler;
