import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Header} from './Header';
import {Home} from './routes/Home';
import {SpreadsheetParser} from './routes/SpreadsheetParser';
import {Contact} from './routes/Contact';
import {Resume} from './routes/Resume';
import '../styles/Root.scss';

export class Root extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/parser" component={SpreadsheetParser} />
          <Route exact path="/resume" component={Resume} />
          <Route path="/resume/:template/:resume" component={Resume} />
          <Route exact path="/contact" component={Contact} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({storeData: state});
const mapDispatchToProps = dispatch => (
  {
    addNewList: list => (
      dispatch(
        {
          type: 'ADD',
          payload: {
            list: list
          }
        }
      )
    ),
    updateList: list => (
      dispatch(
        {
          type: 'UPDATE',
          payload: {
            list: list
          }
        }
      )
    ),
    loadList: lists => (
      dispatch(
        {
          type: 'LOAD',
          payload: {
            lists: lists
          }
        }
      )
    ),
    removeList: list => (
      dispatch(
        {
          type: 'REMOVE',
          payload: {
            list: list
          }
        }
      )
    )
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Root);

Root.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
