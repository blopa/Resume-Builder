import React from 'react';
// import PropTypes from 'prop-types';

// import styles from '../../../styles/WorkExperience.scss';
import styles from '../../../styles/VanhackTemplate.scss';
import PropTypes from 'prop-types';

export class WorkExperience extends React.Component {
  render() {
    const value = this.props.data;
    return (
      <div>
        <p className={styles['resume-job-title-company']}>
          {value.jobTitle.content}, {value.company.content}
        </p>
        <p className={styles['resume-local-time']}>
          {value.from.content} - {value.to.content} - {value.local.content}
        </p>
        {value.items.display ? (
          <div className={styles['resume-list']}>
            <ul>
              {value.items.content.map((o, k) => {
                if (o.display) {
                  return (
                    <li key={k}>
                      <Achievements data={o}/>
                    </li>
                  );
                }
                return null;
              }, this)}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}

class Achievements extends React.Component {
  render() {
    const value = this.props.data;
    return (
      <p className={styles['resume-job-achievements']}>{value.content}</p>
    );
  }
}

WorkExperience.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  data: PropTypes.object
};
Achievements.propTypes = WorkExperience.propTypes;
