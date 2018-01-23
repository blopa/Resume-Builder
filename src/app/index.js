import React from 'react';
import {render} from 'react-dom';
import {Root} from './components/Root'

class App extends React.Component {
    render() {
        return (
            <Root/>
        );
    }
}

render(<App/>, window.document.getElementById('app'));