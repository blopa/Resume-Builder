import React, { Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Components
import HomePage from './routes/HomePage';
import UploadPage from './routes/UploadPage';
import BuildPage from './routes/BuildPage';
import NavBar from './ui/NavBar/NavBar';

function App() {
    return (
        <Fragment>
            <NavBar />
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/upload" component={UploadPage} />
                    <Route exact path="/build" component={BuildPage} />
                </Switch>
            </HashRouter>
        </Fragment>
    );
}

export default hot(module)(App);
