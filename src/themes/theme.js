import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#26292C',
            light: 'rgb(81, 91, 95)',
            dark: 'rgb(26, 35, 39)',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#FFB74D',
            light: 'rgb(255, 197, 112)',
            dark: 'rgb(200, 147, 89)',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        titleBar: {
            main: '#555555',
            contrastText: '#ffffff',
        },
        error: {
            main: red.A400,
        },
    },
});

export const lightTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#cc4444',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#f5f5f5',
        },
        titleBar: {
            main: '#eeeeee',
            contrastText: '#222222',
        },
    },
});

