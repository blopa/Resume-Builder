import React from 'react';
import {render} from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store.js';
import Root from './containers/Root';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route component={Root} />
      </Router>
    );
  }
}

render(<Provider store={store}><App/></Provider>, window.document.getElementById('app'));
