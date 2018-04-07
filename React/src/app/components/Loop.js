import React from 'react';
import PropTypes from 'prop-types';

// import styles from '../styles/Loop.scss';

export class Loop extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((o, k) => {
          const child = React.cloneElement(this.props.children, {data: o});
          return (
            <li key={k} className={this.props.className}>
              {child}
            </li>
          );
        }, this)}
      </ul>
    );
  }
}

Loop.propTypes = {
  children: PropTypes.element.isRequired,
  items: PropTypes.array,
  className: PropTypes.string
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
