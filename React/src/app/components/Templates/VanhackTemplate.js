import React from 'react';

import '../../styles/VanhackTemplate.css'

export class VanhackTemplate extends React.Component {
    componentWillMount() {
        if (!this.props.hasOwnProperty('resume')) {
            this.redirect('/home');
            return;
        }
    }
    render() {
        return(
            <div className="main-container">
                <h1 className="no-print">Your Resume</h1>
                <div id="resume-content">
                    <div id="resume-header">
                        <h2 id="resume-full-name">{this.props.resume.fullName}</h2>
                        <div id="resume-contact">
                            <p id="resume-city-country">{this.props.resume.city}, {this.props.resume.country}</p>
                            <p id="resume-email">{this.props.resume.email}</p>
                            <p id="resume-phone">{this.props.resume.phone}</p>
                        </div>
                        <div id="resume-title">
                            <p id="resume-job-title">{this.props.resume.jobTitle}</p>
                            <p id="resume-website"><a href={this.props.resume.website} target="_blank">{this.props.resume.website}</a></p>
                            <p id="resume-github"><a href={this.props.resume.github} target="_blank">{this.props.resume.github}</a></p>
                        </div>
                    </div>
                    <div id="work-experience">
                        {this.props.resume.experience.length > 0 ? <h4>WORK EXPERIENCE</h4> : null}
                        <ul className="resume-list">
                            {this.props.resume.experience.map(function(value, key){
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
                        {this.props.resume.sideProject.length > 0 ? <h4>SIDE PROJECTS</h4> : null}
                        <ul className="resume-list">
                            {this.props.resume.sideProject.map(function(value, key){
                                return (
                                    <li key={key} className="resume-side-job">
                                        <p><a href={value.url} target="_blank">{value.projectName}</a>: {value.description}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div id="education">
                        {this.props.resume.education.length > 0 ? <h4>EDUCATION</h4> : null}
                        <ul className="resume-list">
                            {this.props.resume.education.map(function(value, key){
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
                        {this.props.resume.skills ? <h4>TECHNICAL SKILLS</h4> : null}
                        <p>{this.props.resume.skills}</p>
                    </div>
                    <div id="languages">
                        {this.props.resume.languages ? <h4>LANGUAGES</h4> : null}
                        <p>{this.props.resume.languages}</p>
                    </div>
                </div>
            </div>
        );
    }
}