import React from 'react';
import '../styles/Resume.css';

export class Resume extends React.Component {
    constructor() {
        super();
        this.redirect = this.redirect.bind(this);
        this.buildResume = this.buildResume.bind(this);

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

        this.buildResume(sheetObject);
    }
    buildResume(sheetObject) {
        let finalObj = {};
        let fathers = [];
        let sons = [];
        sheetObject.map(function(value) {
            if (value['type'] === 'full-name') {
                finalObj.fullName = value['content'];
            } else if (value['type'] === 'job-title') {
                finalObj.jobTitle = value['content'];
            } else if (value['type'] === 'website') {
                finalObj.website = value['content'];
            } else if (value['type'] === 'github') {
                finalObj.github = value['content'];
            } else if (value['type'] === 'email') {
                finalObj.email = value['content'];
            } else if (value['type'] === 'phone') {
                finalObj.phone = value['content'];
            } else if (value['type'] === 'city') {
                finalObj.city = value['content'];
            } else if (value['type'] === 'country') {
                finalObj.country = value['content'];
            } else if (value['type'] === 'skills') {
                finalObj.skills = value['content'];
            } else if (value['type'] === 'languages') {
                finalObj.languages = value['content'];
            }
            if (value['id']) {
                fathers.push(value);
            } else if(value['data-for']) {
                sons.push(value);
            }
        });

        finalObj.experience = [];
        finalObj.sideProject = [];
        finalObj.education = [];

        fathers.map(function(value) {
            let id = value.id;
            let tempObj = {};
            tempObj.id = id;
            let childs = sons.filter(function(value) {
                // debugger;
                if (value['data-for'] === id) {
                    return value;
                }
            });

            if (value.type === 'experience') {
                tempObj.jobTitle = value.content;
                let items = [];
                childs.map(function(value) {
                    if (value['type'] === 'company') {
                        tempObj.company = value['content'];
                    } else if (value['type'] === 'from') {
                        tempObj.from = value['content'];
                    } else if (value['type'] === 'to') {
                        tempObj.to = value['content'];
                    } else if (value['type'] === 'local') {
                        tempObj.local = value['content'];
                    } else if (value['type'] === 'item') {
                        items.push(value['content']);
                    }
                });
                tempObj.items = items;
                finalObj.experience.push(tempObj);
            } else if (value.type === 'side-project') {
                tempObj.projectName = value.content;
                childs.map(function(value) {
                    if (value['type'] === 'url') {
                        tempObj.url = value['content'];
                    } else if (value['type'] === 'description') {
                        tempObj.description = value['content'];
                    }
                });
                finalObj.sideProject.push(tempObj);
            } else if (value.type === 'education') {
                tempObj.degree = value.content;
                let items = [];
                childs.map(function(value) {
                    if (value['type'] === 'local') {
                        tempObj.local = value['content'];
                    } else if (value['type'] === 'from') {
                        tempObj.from = value['content'];
                    } else if (value['type'] === 'to') {
                        tempObj.to = value['content'];
                    } else if (value['type'] === 'item') {
                        items.push(value['content']);
                    }
                });
                tempObj.items = items;
                finalObj.education.push(tempObj);
            }
        });
        this.state.resume = finalObj;
        // debugger;
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
            <div>
                <p>Your Resume</p>
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