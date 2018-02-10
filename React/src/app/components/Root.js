import React from 'react';
import {Route, Switch} from 'react-router-dom'

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
                <Header/>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/parser" component={SpreadsheetParser} />
                    <Route path="/resume" component={Resume} />
                    <Route path="/contact" component={Contact} />
                </Switch>
            </div>
        );
    }
}

Root.propTypes = {
    // https://reactjs.org/docs/typechecking-with-proptypes.html
};