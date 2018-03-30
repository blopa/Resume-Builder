import React from 'react';
// import PropTypes from 'prop-types';
import loader from '../loader.gif';

import '../styles/Loading.css';

export class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <div className="loading-content">
          <img src={loader} title="Loading..."/>
          <h2>Loading</h2>
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
