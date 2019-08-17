import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import HomePage from 'components/routes/home/HomePage';

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
            </Switch>
        </HashRouter>
    );
}

export default hot(module)(App);
