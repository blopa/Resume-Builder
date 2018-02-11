import React from 'react';
import '../styles/Resume.css';
import {VanhackTemplate} from "./Templates/VanhackTemplate";

export class Resume extends React.Component {
    constructor() {
        super();
        this.redirect = this.redirect.bind(this);
        this.handler = this.handler.bind(this);

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
            }
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
    render() {
        return(
            <div className="main-container">
                <h1 className="no-print">Your Resume</h1>
                <div id="print-button" className="no-print">
                    <button type="button" className="btn btn-info btn-menu" onClick={this.preparePrint}>Print</button>
                </div>
                <div id="toggle-menu" className="no-print">
                    <div>
                        <h2>Toggle Menu</h2>
                        <ul>
                            {Object.keys(this.state.resume).map(function (key, arrayKey) {
                                let htmlId = `toggle-${key}`;
                                return (
                                    <li key={htmlId + '-' + arrayKey}>
                                        <input id={htmlId} type="checkbox" onChange={() => this.handler(this.state.resume[key])} checked={this.state.resume[key].display} />
                                        <label htmlFor={htmlId}>Display {key}?</label>
                                    </li>
                                );
                            }.bind(this))}
                        </ul>
                    </div>
                </div>
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