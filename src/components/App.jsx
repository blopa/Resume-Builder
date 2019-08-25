import React, { Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Components
import NavBar from './ui/NavBar/NavBar';
import HomePage from './routes/HomePage';
import UploadPage from './routes/UploadPage';
import BuildPage from './routes/BuildPage';
import ContactPage from './routes/ContactPage';

function App() {
    return (
        <Fragment>
            <NavBar />
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/upload" component={UploadPage} />
                    <Route exact path="/build" component={BuildPage} />
                    <Route exact path="/contact" component={ContactPage} />
                </Switch>
            </HashRouter>
        </Fragment>
    );
}

export default hot(module)(App);
