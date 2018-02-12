import React from 'react';
import '../styles/Resume.css';
import {VanhackTemplate} from "./Templates/VanhackTemplate";

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
                languages: {content: '', display: false},
            },
            showMenu: true,
        };
    }
    componentWillMount() {
        let sheetObject;
        let template;
        try {
            sheetObject = this.props.location.param.sheetObject;
            template = this.props.location.param.template;
        } catch (e) {
            this.redirect('/home');
            return;
        }

        this.state.template = template;
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
    renderTemplate() {
        let CustomTemplate;
        if (this.state.template == 0) {
            CustomTemplate = VanhackTemplate;
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
        this.state.showMenu = !this.state.showMenu;
        this.forceUpdate();
    }
    render() {
        return(
            <div className="main-container">
                <h1 className="no-print">Your Resume</h1>
                <div id="print-button" className="no-print">
                    <button type="button" className="btn btn-info btn-menu" onClick={this.preparePrint}>Print</button>
                </div>
                <div id="toggle-menu-button">
                    <button type="button" className="btn btn-info btn-menu" onClick={this.toggleMenu}>Toggle Menu</button>
                </div>
                {this.state.showMenu ? (
                    <div id="toggle-menu" className="no-print">
                        <div>
                            <h2>Toggle Menu</h2>
                            <ul className="list-group">
                                {Object.keys(this.state.resume).map(function (key, arrayKey) {
                                    let htmlId = `toggle-${key}`;
                                    let elementKey = htmlId + '-' + arrayKey;
                                    return (
                                        <li className="list-group-item" key={elementKey}>
                                            <div className="checkbox checkbox-primary">
                                                <input id={htmlId} type="checkbox" onChange={() => this.handler(this.state.resume[key])} checked={this.state.resume[key].display} />
                                                <label htmlFor={htmlId}>Display '{key}'?</label>
                                                {this.state.resume[key].display ? (
                                                    this.state.resume[key].content.constructor === Array ? (
                                                        <ul className="list-group">
                                                            {this.state.resume[key].content.map(function (value, key) {
                                                                if (value.hasOwnProperty('company')) {
                                                                    return (
                                                                        <li className="list-group-item" key={elementKey + '-' + key}>
                                                                            <div className="checkbox checkbox-primary">
                                                                                <input id={htmlId + '-' + key} type="checkbox" onChange={() => this.handler(this.state.resume.experience.content[key])} checked={this.state.resume.experience.content[key].display} />
                                                                                <label htmlFor={htmlId + '-' + key}>Display '{value.jobTitle.content} @ {value.company.content}'?</label>
                                                                                {this.state.resume.experience.content[key].display ? (
                                                                                    value.hasOwnProperty('items') ? (
                                                                                        <ul className="list-group">
                                                                                            {value.items.content.map(function (value, index) {
                                                                                                return (
                                                                                                    <li className="list-group-item" key={elementKey + '-' + key + '-' + index}>
                                                                                                        <div className="checkbox checkbox-primary">
                                                                                                            <input id={htmlId + '-' + key + '-' + index} type="checkbox" onChange={() => this.handler(this.state.resume.experience.content[key].items.content[index])} checked={this.state.resume.experience.content[key].items.content[index].display} />
                                                                                                            <label htmlFor={htmlId + '-' + key + '-' + index}>Display '{value.content.substr(0, 25)} (...)'?</label>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                );
                                                                                            }.bind(this))}
                                                                                        </ul>
                                                                                    ) : null
                                                                                ) : null}
                                                                            </div>
                                                                        </li>
                                                                    );
                                                                } else if (value.hasOwnProperty('projectName')) {
                                                                    return (
                                                                        <li className="list-group-item" key={elementKey + '-' + key}>
                                                                            <div className="checkbox checkbox-primary">
                                                                                <input id={htmlId + '-' + key} type="checkbox" onChange={() => this.handler(this.state.resume.sideProject.content[key])} checked={this.state.resume.sideProject.content[key].display} />
                                                                                <label htmlFor={htmlId + '-' + key}>Display '{value.projectName.content}'?</label>
                                                                            </div>
                                                                        </li>
                                                                    );
                                                                } else if (value.hasOwnProperty('degree')) {
                                                                    let educationDescription = value.degree.content + ' @ ' + value.local.content;
                                                                    return (
                                                                        <li className="list-group-item" key={elementKey + '-' + key}>
                                                                            <div className="checkbox checkbox-primary">
                                                                                <input id={htmlId + '-' + key} type="checkbox" onChange={() => this.handler(this.state.resume.education.content[key])} checked={this.state.resume.education.content[key].display} />
                                                                                <label htmlFor={htmlId + '-' + key}>Display '{educationDescription.substr(0, 25)}'?</label>
                                                                                {this.state.resume.education.content[key].display ? (
                                                                                    value.hasOwnProperty('items') ? (
                                                                                        <ul className="list-group">
                                                                                            {value.items.content.map(function (value, index) {
                                                                                                return (
                                                                                                    <li className="list-group-item" key={elementKey + '-' + key + '-' + index}>
                                                                                                        <div className="checkbox checkbox-primary">
                                                                                                            <input id={htmlId + '-' + key + '-' + index} type="checkbox" onChange={() => this.handler(this.state.resume.education.content[key].items.content[index])} checked={this.state.resume.education.content[key].items.content[index].display} />
                                                                                                            <label htmlFor={htmlId + '-' + key + '-' + index}>Display '{value.content.substr(0, 25)} (...)'?</label>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                );
                                                                                            }.bind(this))}
                                                                                        </ul>
                                                                                    ) : null
                                                                                ) : null}
                                                                            </div>
                                                                        </li>
                                                                    );
                                                                }
                                                                // if (Object.keys(value).length > 1) {
                                                                //     return Object.keys(value).map(function (value, key) {
                                                                //         debugger;
                                                                //         // TODO
                                                                //     });
                                                                // }
                                                            }.bind(this))}
                                                        </ul>
                                                    ) : null
                                                ) : null}
                                            </div>
                                        </li>
                                    );
                                }.bind(this))}
                            </ul>
                        </div>
                    </div>
                ) : null}
                <div id="resume-content">
                    {this.renderTemplate()}
                </div>
            </div>
        );
    }
}

Resume.propTypes = {
    // https://reactjs.org/docs/typechecking-with-proptypes.html
};