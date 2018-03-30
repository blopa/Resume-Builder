import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Main.css';

export class Main extends React.Component {
  render() {
    return (
      <div className="main-container">
        <section>
          {this.props.children}
        </section>
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.element.isRequired
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
