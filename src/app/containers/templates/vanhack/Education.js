import React from 'react';
// import PropTypes from 'prop-types';

// import styles from '../../../styles/Education.scss';
import styles from '../../../styles/VanhackTemplate.scss';
import PropTypes from 'prop-types';

export class Education extends React.Component {
  render() {
    const value = this.props.data;
    return (
      <div className={styles['resume-list']}>
        <p className={styles['education-title']}>{value.degree.content}, {value.local.content}</p>
        <ul>
          {value.items.content.map((o, k) => {
            if (o.display) {
              return (
                <li key={k} className={styles['resume-education-achievements']}>
                  {o.content}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    );
  }
}

Education.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  data: PropTypes.object
};
