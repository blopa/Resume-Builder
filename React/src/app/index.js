import React from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom'

import {Root} from './components/Root'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route component={Root} />
            </Router>
        );
    }
}

render(<App/>, window.document.getElementById('app'));