import React from 'react';
import styles from '../../styles/VanhackTemplate.scss';
import PropTypes from 'prop-types';

export class VanhackTemplate extends React.Component {
  componentWillMount() {
    if (!Object.prototype.hasOwnProperty.call(this.props, 'resume')) {
      this.redirect('/home');
      return;
    }
  }
  render() {
    const resume = this.props.resume;
    return (
      <div className={styles['resume-content']}>
        <div className={styles['resume-header']}>
          {resume.fullName.display ? (
            <h2 className={styles['resume-full-name']}>{resume.fullName.content}</h2>
          ) : null}
          <div className={styles['resume-contact']}>
            {(resume.city.display && resume.country.display) ? (
              <p className={styles['resume-city-country']}>{resume.city.content}, {resume.country.content}</p>
            ) : (resume.city.display ? (
              <p className={styles['resume-city-country']}>{resume.city.content}</p>
            ) : (resume.country.display ? (
              <p className={styles['resume-city-country']}>{resume.country.content}</p>
            ) : null))}
            {resume.email.display ? (
              <p className={styles['resume-email']}>{resume.email.content}</p>
            ) : null}
            {resume.phone.display ? (
              <p className={styles['resume-phone']}>{resume.phone.content}</p>
            ) : null}
          </div>
          <div className={styles['resume-title']}>
            {resume.jobTitle.display ? (
              <p className={styles['resume-job-title']}>{resume.jobTitle.content}</p>
            ) : null}
            {resume.website.display ? (
              <p className={styles['resume-website']}><a href={resume.website.content} target="_blank">{resume.website.content}</a></p>
            ) : null}
            {resume.github.display ? (
              <p className={styles['resume-github']}><a href={resume.github.content} target="_blank">{resume.github.content}</a></p>
            ) : null}
          </div>
        </div>
        {resume.experience.display ? (
          <div className={styles['work-experience']}>
            {resume.experience.content.length > 0 ? <h4>WORK EXPERIENCE</h4> : null}
            <ul className={styles['resume-list']}>
              {resume.experience.content.map(function(value, key) {
                if (value.display) {
                  return (
                    <li key={key}>
                      <p className={styles['resume-job-title-company']}>{value.jobTitle.content}, {value.company.content}</p>
                      <p className={styles['resume-local-time']}>
                        {value.from.content} - {value.to.content} - {value.local.content}
                      </p>
                      <ul className={styles['resume-list']}>
                        {value.items.display ? (
                          value.items.content.map(function (value, key) {
                            if (value.display) {
                              return (
                                <li key={key} className={styles['resume-job-achievements']}>{value.content}</li>
                              );
                            }
                          })
                        ) : null}
                      </ul>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        ) : null}
        {resume.sideProject.display ? (
          <div className={styles['side-projects']}>
            {resume.sideProject.content.length > 0 ? <h4>SIDE PROJECTS</h4> : null}
            <ul className={styles['resume-list']}>
              {resume.sideProject.content.map(function(value, key) {
                if (value.display) {
                  return (
                    <li key={key} className={styles['resume-side-job']}>
                      <p>
                        <a href={value.url.content} target="_blank">
                          {value.projectName.content}
                        </a>: {value.description.content}
                      </p>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        ) : null}
        {resume.education.display ? (
          <div className={styles.education}>
            {resume.education.content.length > 0 ? <h4>EDUCATION</h4> : null}
            <ul className={styles['resume-list']}>
              {resume.education.content.map(function(value, key) {
                if (value.display) {
                  return (
                    <li key={key}>
                      <p>{value.degree.content}, {value.local.content}</p>
                      <ul className={styles['resume-list']}>
                        {value.items.content.map(function (value, key) {
                          if (value.display) {
                            return <li key={key} className={styles['resume-education-achievements']}>{value.content}</li>
                          }
                        })}
                      </ul>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        ) : null}
        {resume.skills.display ? (
          <div className={styles.skills}>
            {resume.skills.content ? <h4>TECHNICAL SKILLS</h4> : null}
            <p>{resume.skills.content}</p>
          </div>
        ) : null}
        {resume.languages.display ? (
          <div className={styles.languages}>
            {resume.languages.content ? <h4>LANGUAGES</h4> : null}
            <p>{resume.languages.content}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

VanhackTemplate.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  resume: PropTypes.object
};
