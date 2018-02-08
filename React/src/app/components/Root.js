import React from 'react';
import { Header } from './Header'
import {Home} from "./Home";
import {SpreadsheetParser} from "./SpreadsheetParser";
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

export class Root extends React.Component {
    render() {
        return(
            <Router>
                <Switch>
                    <div className="container">
                        <div className="row">
                            <Header/>
                        </div>
                        <div className="row">
                            <Route path={'home'} component={Home}/>
                            <Route path={'spreadsheetparser'} component={SpreadsheetParser}/>
                        </div>
                    </div>
                </Switch>
            </Router>
        );
    }
}

Root.propTypes = {
    // https://reactjs.org/docs/typechecking-with-proptypes.html
};