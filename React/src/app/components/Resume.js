import React from 'react';
import '../styles/Resume.css';

export class Resume extends React.Component {
    constructor() {
        super();
        this.redirect = this.redirect.bind(this);

        this.state = {
            resume: {
                fullName: '',
                jobTitle: '',
                website: '',
                github: '',
                city: '',
                country: '',
                email: '',
                phone: '',
                experience: [],
                sideProject: [],
                education: []
            }
        };
    }
    componentWillMount() {
        let sheetObject;
        try {
            sheetObject = this.props.location.param.sheetObject;
        } catch (e) {
            this.redirect('/home');
            return;
        }

        this.state.resume = sheetObject;
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
    render() {
        return(
            <div className="main-container">
                <h1 className="no-print">Your Resume</h1>
                <div id="resume-content">
                    <div id="resume-header">
                        <h2 id="resume-full-name">{this.state.resume.fullName}</h2>
                        <div id="resume-contact">
                            <p id="resume-city-country">{this.state.resume.city}, {this.state.resume.country}</p>
                            <p id="resume-email">{this.state.resume.email}</p>
                            <p id="resume-phone">{this.state.resume.phone}</p>
                        </div>
                        <div id="resume-title">
                            <p id="resume-job-title">{this.state.resume.jobTitle}</p>
                            <p id="resume-website"><a href={this.state.resume.website} target="_blank">{this.state.resume.website}</a></p>
                            <p id="resume-github"><a href={this.state.resume.github} target="_blank">{this.state.resume.github}</a></p>
                        </div>
                    </div>
                    <div id="work-experience">
                        {this.state.resume.experience.length > 0 ? <h4>WORK EXPERIENCE</h4> : null}
                        <ul className="resume-list">
                            {this.state.resume.experience.map(function(value, key){
                                return (
                                    <li key={key}>
                                        <p className="resume-job-title-company">{value.jobTitle}, {value.company}</p>
                                        <p className="resume-local-time">{value.from} - {value.to} - {value.local}</p>
                                        <ul className="resume-list">
                                            {value.items.map(function (value, key) {
                                                return <li key={key} className="resume-job-achievements">{value}</li>
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div id="side-projects">
                        {this.state.resume.sideProject.length > 0 ? <h4>SIDE PROJECTS</h4> : null}
                        <ul className="resume-list">
                            {this.state.resume.sideProject.map(function(value, key){
                                return (
                                    <li key={key} className="resume-side-job">
                                        <p><a href={value.url} target="_blank">{value.projectName}</a>: {value.description}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div id="education">
                        {this.state.resume.education.length > 0 ? <h4>EDUCATION</h4> : null}
                        <ul className="resume-list">
                            {this.state.resume.education.map(function(value, key){
                                return (
                                    <li key={key}>
                                        <p>{value.degree}, {value.local}</p>
                                        <ul className="resume-list">
                                            {value.items.map(function (value, key) {
                                                return <li key={key} className="resume-education-achievements">{value}</li>
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div id="skills">
                        {this.state.resume.skills ? <h4>TECHNICAL SKILLS</h4> : null}
                        <p>{this.state.resume.skills}</p>
                    </div>
                    <div id="languages">
                        {this.state.resume.languages ? <h4>LANGUAGES</h4> : null}
                        <p>{this.state.resume.languages}</p>
                    </div>
                </div>
            </div>
        );
    }
}

Resume.propTypes = {
    // https://reactjs.org/docs/typechecking-with-proptypes.html
};