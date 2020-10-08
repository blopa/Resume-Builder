import { createMuiTheme } from '@material-ui/core/styles';
import * as Colors from '@material-ui/core/colors';

const baseTheme = {
    // TODO
};

// A custom theme for this app
export const darkTheme = createMuiTheme({
    ...baseTheme,
    palette: {
        type: 'dark',
        primary: {
            main: '#00695f',
        },
    },
});

export const lightTheme = createMuiTheme({
    ...baseTheme,
    palette: {
        type: 'light',
        common: {
            black: '#000',
            white: '#fff',
        },
        background: {
            paper: '#fff',
            default: '#fafafa',
        },
        primary: {
            light: '#7986cb',
            main: 'rgba(0, 150, 136, 1)',
            dark: '#303f9f',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff4081',
            main: '#f50057',
            dark: '#c51162',
            contrastText: '#fff',
        },
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
        },
    },
});

