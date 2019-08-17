import React from 'react';
import styles from '../../styles/VanhackTemplate.scss';
import PropTypes from 'prop-types';
import {WorkExperience} from './vanhack/WorkExperience';
import {Education} from './vanhack/Education';

export class VanhackTemplate extends React.Component {
  componentWillMount() {
    if (!Object.prototype.hasOwnProperty.call(this.props, 'resume')) {
      this.redirect('/home');
      return;
    }
  }
  render() {
    const resume = this.props.resume;
    const resumeLocation = function (r) {
      if (r.city.display && r.country.display) {
        return (<p className={styles['resume-city-country']}>{r.city.content}, {r.country.content}</p>);
      } else if (r.city.display) {
        return (<p className={styles['resume-city-country']}>{r.city.content}</p>);
      } else if (r.country.display) {
        return (<p className={styles['resume-city-country']}>{r.country.content}</p>);
      }
      return null;
    };
    const resumeEmail = function (r) {
      return (
        r.email.display ? (
          <p className={styles['resume-email']}>{r.email.content}</p>
        ) : null
      );
    };
    const resumePhone = function (r) {
      return (
        r.phone.display ? (
          <p className={styles['resume-phone']}>{r.phone.content}</p>
        ) : null
      );
    };
    const resumeJobTitle = function (r) {
      return (
        r.jobTitle.display ? (
          <p className={styles['resume-job-title']}>{r.jobTitle.content}</p>
        ) : null
      );
    };
    const resumeWebsite = function (r) {
      return (
        r.website.display ? (
          <p className={styles['resume-website']}><a href={r.website.content} target="_blank">{r.website.content}</a></p>
        ) : null
      );
    };
    const resumeGithub = function (r) {
      return (
        r.github.display ? (
          <p className={styles['resume-github']}><a href={r.github.content} target="_blank">{r.github.content}</a></p>
        ) : null
      );
    };
    const resumeWorkExperience = function (r) {
      if (r.experience.display && r.experience.content.length > 0) {
        return (
          <div className={styles['work-experience']}>
            <h4>WORK EXPERIENCE</h4>
            <div className={styles['resume-list']}>
              <ul>
                {r.experience.content.map((o, k) => {
                  if (o.display) {
                    return (
                      <li key={k}>
                        <WorkExperience data={o}/>
                      </li>
                    );
                  }
                  return null;
                }, this)}
              </ul>
            </div>
          </div>
        );
      }
      return null;
    };
    const resumeSideProjects = function (r) {
      if (r.sideProject.display && r.sideProject.content.length > 0) {
        return (
          <div className={styles['side-projects']}>
            <h4>SIDE PROJECTS</h4>
            <div className={styles['resume-list']}>
              <ul>
                {r.sideProject.content.map((o, k) => {
                  if (o.display) {
                    return (
                      <li key={k} className={styles['resume-side-job']}>
                        <p>
                          <a href={o.url.content} target="_blank">
                            {o.projectName.content}
                          </a>: {o.description.content}
                        </p>
                      </li>
                    );
                  }
                  return null;
                }, this)}
              </ul>
            </div>
          </div>
        );
      }
      return null;
    };
    const resumeEducation = function (r) {
      if (r.education.display && r.education.content.length > 0) {
        return (
          <div className={styles.education}>
            <h4>EDUCATION</h4>
            <div className={styles['resume-list']}>
              <ul>
                {r.education.content.map((o, k) => {
                  if (o.display) {
                    return (
                      <li key={k}>
                        <Education data={o} />
                      </li>
                    );
                  }
                  return null;
                }, this)}
              </ul>
            </div>
          </div>
        );
      }
      return null;
    };
    const resumeSkills = function (r) {
      if (r.skills.display && r.skills.content) {
        return (
          <div className={styles.skills}>
            <h4>TECHNICAL SKILLS</h4>
            <p>{r.skills.content}</p>
          </div>
        );
      }
      return null;
    };
    const resumeLanguages = function (r) {
      if (r.languages.display && r.languages.content) {
        return (
          <div className={styles.languages}>
            <h4>LANGUAGES</h4>
            <p>{r.languages.content}</p>
          </div>
        );
      }
      return null;
    };
    return (
      <div className={styles['resume-content']}>
        <div className={styles['resume-header']}>
          {resume.fullName.display ? (
            <h2 className={styles['resume-full-name']}>{resume.fullName.content}</h2>
          ) : null}
          <div className={styles['resume-contact']}>
            {resumeLocation(resume)}
            {resumeEmail(resume)}
            {resumePhone(resume)}
          </div>
          <div className={styles['resume-title']}>
            {resumeJobTitle(resume)}
            {resumeWebsite(resume)}
            {resumeGithub(resume)}
          </div>
        </div>
        {resumeWorkExperience(resume)}
        {resumeSideProjects(resume)}
        {resumeEducation(resume)}
        {resumeSkills(resume)}
        {resumeLanguages(resume)}
      </div>
    );
  }
}

VanhackTemplate.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  resume: PropTypes.object
};
