import 'babel-polyfill';
import 'styles';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './components/App';

const store = configureStore();
const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
