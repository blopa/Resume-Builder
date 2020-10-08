import React, { createContext, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme, lightTheme } from '../themes/theme';
import { LOCALSTORAGE_THEME_KEY } from '../utils/constants';

export const light = 'light';

export const dark = 'dark';

const getTheme = (themeName) => themeName === dark ? darkTheme : lightTheme;

export const CustomThemeContext = createContext(
    {
        currentTheme: light,
        setTheme: null,
    }
);

const CustomThemeProvider = (props) => {
    // eslint-disable-next-line react/prop-types
    const { children } = props;
    const isWeb = typeof window !== 'undefined';

    // Read current theme from localStorage or maybe from an api
    const currentTheme = (isWeb && localStorage.getItem(LOCALSTORAGE_THEME_KEY)) || 'light';

    // State to hold the selected theme name
    const [themeName, setThemeName] = useState(currentTheme);

    // Retrieve the theme object by theme name
    const theme = getTheme(themeName);

    // Wrap setThemeName to store new theme names in localStorage
    const setTheme = (name) => {
        localStorage.setItem(LOCALSTORAGE_THEME_KEY, name);
        setThemeName(name);
    };

    const contextValue = {
        currentTheme: themeName,
        setTheme,
    };

    return (
        <CustomThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

export default CustomThemeProvider;
