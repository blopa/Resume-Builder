import React from 'react';
import styles from '../../styles/Home.scss';

export class Home extends React.Component {
  render() {
    return (
      <div className={styles['main-container']}>
        <section>
          <h2>What is Resume Builder?</h2>
          <p>
            Resume Builder is a free open-source project that allows anyone to easily maintain and build any kind of
            resume using Google Spreadsheets. This was develop as a personal project to help a friend who was struggling
            spending up to an hour to make a custom resumes.
          </p>
        </section>
      </div>
    );
  }
}

Home.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
