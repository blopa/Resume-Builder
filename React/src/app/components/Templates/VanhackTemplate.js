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
        let resume = this.props.resume;
        return(
            <div>
                <div id="resume-header">
                    <h2 id="resume-full-name">{resume.fullName}</h2>
                    <div id="resume-contact">
                        <p id="resume-city-country">{resume.city}, {resume.country}</p>
                        <p id="resume-email">{resume.email}</p>
                        <p id="resume-phone">{resume.phone}</p>
                    </div>
                    <div id="resume-title">
                        <p id="resume-job-title">{resume.jobTitle}</p>
                        <p id="resume-website"><a href={resume.website} target="_blank">{resume.website}</a></p>
                        <p id="resume-github"><a href={resume.github} target="_blank">{resume.github}</a></p>
                    </div>
                </div>
                <div id="work-experience">
                    {resume.experience.length > 0 ? <h4>WORK EXPERIENCE</h4> : null}
                    <ul className="resume-list">
                        {resume.experience.map(function(value, key){
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
                    {resume.sideProject.length > 0 ? <h4>SIDE PROJECTS</h4> : null}
                    <ul className="resume-list">
                        {resume.sideProject.map(function(value, key){
                            return (
                                <li key={key} className="resume-side-job">
                                    <p><a href={value.url} target="_blank">{value.projectName}</a>: {value.description}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div id="education">
                    {resume.education.length > 0 ? <h4>EDUCATION</h4> : null}
                    <ul className="resume-list">
                        {resume.education.map(function(value, key){
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
                    {resume.skills ? <h4>TECHNICAL SKILLS</h4> : null}
                    <p>{resume.skills}</p>
                </div>
                <div id="languages">
                    {resume.languages ? <h4>LANGUAGES</h4> : null}
                    <p>{resume.languages}</p>
                </div>
            </div>
        );
    }
}