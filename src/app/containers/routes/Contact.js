import React from 'react';

import styles from '../../styles/Contact.scss';

export class Contact extends React.Component {
  render() {
    return (
      <div className={styles['main-container']}>
        <section>
          <h2>Contact</h2>
          <p>
            To get in contact please access our GitHub project page <a href="https://github.com/blopa/Resume-Builder">
            here</a>.
          </p>
          <p>And please dont forget to git the project a star, that will help me a lot :D</p>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=blopa&repo=Resume-Builder&type=star&count=true&size=large"
            frameBorder="0" scrolling="0" width="160px" height="30px"
          />
          <iframe
            src="https://ghbtns.com/github-btn.html?user=blopa&repo=Resume-Builder&type=watch&count=true&size=large&v=2"
            frameBorder="0" scrolling="0" width="160px" height="30px"
          />
          <iframe
            src="https://ghbtns.com/github-btn.html?user=blopa&repo=Resume-Builder&type=fork&count=true&size=large"
            frameBorder="0" scrolling="0" width="158px" height="30px"
          />
        </section>
      </div>
    );
  }
}

Contact.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
