import React from 'react';
import {render} from 'react-dom';
import {Root} from './components/Root'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Home} from './components/Home';
import {SpreadsheetParser} from './components/SpreadsheetParser';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path={'/'} component={Root}>
                    <Route path={'home'} component={Home}/>
                    <Route path={'spreadsheetparser'} component={SpreadsheetParser}/>
                </Route>
            </Router>
        );
    }
}

render(<App/>, window.document.getElementById('app'));