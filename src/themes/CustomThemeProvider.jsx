import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { darkTheme, lightTheme } from './theme';

const getTheme = (themeName) => themeName === 'dark' ? darkTheme : lightTheme;

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext(
    {
        currentTheme: 'light',
        setTheme: null,
    }
);

const CustomThemeProvider = (props) => {
    // eslint-disable-next-line react/prop-types
    const { children } = props;
    const isWeb = typeof window !== 'undefined';

    // Read current theme from localStorage or maybe from an api
    const currentTheme = (isWeb && window.localStorage.getItem('appTheme')) || 'light';

    // State to hold the selected theme name
    const [themeName, _setThemeName] = useState(currentTheme);

    // Retrieve the theme object by theme name
    const theme = getTheme(themeName);

    // Wrap _setThemeName to store new theme names in localStorage
    const setThemeName = (name) => {
        window.localStorage.setItem('appTheme', name);
        _setThemeName(name);
    };

    const contextValue = {
        currentTheme: themeName,
        setTheme: setThemeName,
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
