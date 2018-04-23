import React from 'react';
import styles from '../../styles/Resume.scss';
import {VanhackTemplate} from './../templates/VanhackTemplate';
import {RegularTemplate} from './../templates/RegularTemplate';
import PropTypes from 'prop-types';
import {excerpt} from '../../helper/functions';

export class Resume extends React.Component {
  constructor() {
    super();
    this.redirect = this.redirect.bind(this);
    this.handler = this.handler.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      template: null,
      resume: {
        fullName: {content: '', display: false},
        jobTitle: {content: '', display: false},
        website: {content: '', display: false},
        github: {content: '', display: false},
        city: {content: '', display: false},
        country: {content: '', display: false},
        email: {content: '', display: false},
        phone: {content: '', display: false},
        experience: {content: [], display: false},
        sideProject: {content: [], display: false},
        education: {content: [], display: false},
        skills: {content: '', display: false},
        languages: {content: '', display: false}
      },
      showMenu: true
    };
  }
  componentWillMount() {
    if (this.props.match.params.resume && (this.props.match.params.template !== null)) {
      try {
        this.setState({
          template: this.props.match.params.template,
          resume: JSON.parse(decodeURIComponent(atob(this.props.match.params.resume)))
        });
      } catch (e) {
        this.redirect('/home');
      }
    } else {
      let sheetObject;
      let template;
      try {
        sheetObject = this.props.location.param.sheetObject;
        template = this.props.location.param.template;
        this.setState({
          template: template,
          resume: sheetObject
        });
      } catch (e) {
        this.redirect('/home');
      }
    }
  }
  redirect(path, param) {
    if (param) {
      this.props.history.push({
        pathname: path,
        param: param
      });
    } else {
      this.props.history.push(path);
    }
  }
  renderTemplate() {
    debugger;
    let CustomTemplate;
    if (this.state.template == 0) {
      CustomTemplate = VanhackTemplate;
    } else if (this.state.template == 1) {
      CustomTemplate = RegularTemplate;
    } else {
      CustomTemplate = VanhackTemplate;
    }
    return <CustomTemplate resume={this.state.resume} />;
  }
  preparePrint() {
    window.print();
  }
  handler(model) {
    model.display = !model.display;
    this.forceUpdate();
  }
  toggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    });
    this.forceUpdate();
  }
  render() {
    return (
      <div className={styles['main-container']}>
        <h1>Your Resume</h1>
        <div className={styles['print-button']}>
          <button type="button" className={['btn', 'btn-info', 'btn-menu'].join(' ')} onClick={this.preparePrint}>Print</button>
        </div>
        <div className={styles['toggle-menu-button']}>
          <button type="button" className={['btn', 'btn-info', 'btn-menu'].join(' ')} onClick={this.toggleMenu}>Toggle Menu</button>
        </div>
        {this.state.showMenu ? (
          <div className={styles['toggle-menu']}>
            <div>
              <h2>Toggle Menu</h2>
              <ul className={'list-group'}>
                {Object.keys(this.state.resume).map((key, arrayKey) => {
                  const htmlId = `toggle-${key}`;
                  const elementKey = `${htmlId}-${arrayKey}`;
                  return (
                    <li className={'list-group-item'} key={elementKey}>
                      <div className={[styles.checkbox, 'checkbox-primary'].join(' ')}>
                        <input id={htmlId} type="checkbox" onChange={() => this.handler(this.state.resume[key])}
                          checked={this.state.resume[key].display}
                        />
                        <label htmlFor={htmlId}>{`Display '${key}'?`}</label>
                        {(this.state.resume[key].display && this.state.resume[key].content.constructor === Array) ? (
                          <ul className={'list-group'}>
                            {this.state.resume[key].content.map((value, resKey) => {
                              if (Object.prototype.hasOwnProperty.call(value, 'company')) {
                                return (
                                  <li className={'list-group-item'} key={`${elementKey}-${resKey}`}>
                                    <div className={[styles.checkbox, 'checkbox-primary'].join(' ')}>
                                      <input id={`${htmlId}-${resKey}`} type="checkbox" onChange={() => this.handler(this.state.resume.experience.content[resKey])} checked={this.state.resume.experience.content[resKey].display} />
                                      <label htmlFor={`${htmlId}-${resKey}`}>{`Display '${excerpt(value.jobTitle.content, 20)} @ ${excerpt(value.company.content, 20)}'?`}</label>
                                      {(this.state.resume.experience.content[resKey].display && Object.prototype.hasOwnProperty.call(value, 'items')) ? (
                                        <ul className={'list-group'}>
                                          {value.items.content.map((val, index) => (
                                            <li className={'list-group-item'} key={`${elementKey}-${resKey}-${index}`}>
                                              <div className={[styles.checkbox, 'checkbox-primary'].join(' ')}>
                                                <input id={`${htmlId}-${resKey}-${index}`} type="checkbox" onChange={() => this.handler(this.state.resume.experience.content[resKey].items.content[index])} checked={this.state.resume.experience.content[resKey].items.content[index].display} />
                                                <label htmlFor={`${htmlId}-${resKey}-${index}`}>{`Display '${excerpt(val.content, 25)}'?`}</label>
                                              </div>
                                            </li>
                                          ), this)}
                                        </ul>
                                      ) : null}
                                    </div>
                                  </li>
                                );
                              } else if (Object.prototype.hasOwnProperty.call(value, 'projectName')) {
                                return (
                                  <li className={'list-group-item'} key={`${elementKey}-${resKey}`}>
                                    <div className={[styles.checkbox, 'checkbox-primary'].join(' ')}>
                                      <input id={`${htmlId}-${resKey}`} type="checkbox" onChange={() => this.handler(this.state.resume.sideProject.content[resKey])} checked={this.state.resume.sideProject.content[resKey].display} />
                                      <label htmlFor={`${htmlId}-${resKey}`}>{`Display '${excerpt(value.projectName.content, 25)}'?`}</label>
                                    </div>
                                  </li>
                                );
                              } else if (Object.prototype.hasOwnProperty.call(value, 'degree')) {
                                const educationDescription = `${excerpt(value.degree.content, 20)} @ ${excerpt(value.local.content, 20)}`;
                                return (
                                  <li className={'list-group-item'} key={`${elementKey}-${resKey}`}>
                                    <div className={[styles.checkbox, 'checkbox-primary'].join(' ')}>
                                      <input id={`${htmlId}-${resKey}`} type="checkbox" onChange={() => this.handler(this.state.resume.education.content[resKey])} checked={this.state.resume.education.content[resKey].display} />
                                      <label htmlFor={`${htmlId}-${resKey}`}>{`Display '${educationDescription}'?`}</label>
                                      {(this.state.resume.education.content[resKey].display && Object.prototype.hasOwnProperty.call(value, 'items')) ? (
                                        <ul className={'list-group'}>
                                          {value.items.content.map((val, index) => (
                                            <li className={'list-group-item'} key={`${elementKey}-${resKey}-${index}`}>
                                              <div className={[styles.checkbox, 'checkbox-primary'].join(' ')}>
                                                <input id={`${htmlId}-${resKey}-${index}`} type="checkbox" onChange={() => this.handler(this.state.resume.education.content[resKey].items.content[index])} checked={this.state.resume.education.content[resKey].items.content[index].display} />
                                                <label htmlFor={`${htmlId}-${resKey}-${index}`}>{`Display '${excerpt(val.content, 25)}'?`}</label>
                                              </div>
                                            </li>
                                          ), this)}
                                        </ul>
                                      ) : null}
                                    </div>
                                  </li>
                                );
                              }
                              return null;
                            }, this)}
                          </ul>
                        ) : null}
                      </div>
                    </li>
                  );
                }, this)}
              </ul>
            </div>
          </div>
        ) : null}
        <div className={styles['resume-content-page']}>
          {this.renderTemplate()}
        </div>
      </div>
    );
  }
}

Resume.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
};
