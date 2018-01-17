import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    Hello World from Resume Builder!
                </h1>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById('app'));