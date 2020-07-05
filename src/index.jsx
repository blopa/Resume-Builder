import 'babel-polyfill';
import 'styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import theme from './styles/theme';
import initialState from './store/initialState';

import configureStore from './store/configureStore';
import App from './components/App';

const store = configureStore(initialState);
const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    rootElement
);
