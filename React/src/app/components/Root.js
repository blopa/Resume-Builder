import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'

import {Header} from './Header'
import {Home} from "./Home";
import {SpreadsheetParser} from "./SpreadsheetParser";
import {Contact} from "./Contact";
import {Resume} from "./Resume";
import "../styles/Root.css";

export class Root extends React.Component {
    render() {
        return(
            <div>
                <Header className="no-print"/>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/parser" component={SpreadsheetParser} />
                    <Route exact path="/resume" component={Resume} />
                    <Route exact path="/contact" component={Contact} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

Root.propTypes = {
    // https://reactjs.org/docs/typechecking-with-proptypes.html
};