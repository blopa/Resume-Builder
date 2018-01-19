import React from 'react';
import {render} from 'react-dom';
import {Root} from './components/Root'
import {Router, Route} from 'react-router'
import {Home} from './components/Home';
import {SpreadsheetParser} from './components/SpreadsheetParser';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route psth={'/#/'} component={Root}>
                    <Route psth={'home'} component={Home}/>
                    <Route psth={'spreadsheetparser'} component={SpreadsheetParser}/>
                </Route>
            </Router>
        );
    }
}

render(<App/>, window.document.getElementById('app'));