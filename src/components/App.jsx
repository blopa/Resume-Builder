import React, { Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Components
import HomePage from 'components/routes/home/HomePage';
import NavBar from './ui/NavBar/NavBar';

function App() {
    return (
        <Fragment>
            <NavBar />
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                </Switch>
            </HashRouter>
        </Fragment>
    );
}

export default hot(module)(App);
