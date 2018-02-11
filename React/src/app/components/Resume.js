import React from 'react';
import '../styles/Resume.css';
import {VanhackTemplate} from "./Templates/VanhackTemplate";

export class Resume extends React.Component {
    constructor() {
        super();
        this.redirect = this.redirect.bind(this);

        this.state = {
            template: null,
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
    render() {
        return(
            <div className="main-container">
                <h1 className="no-print">Your Resume</h1>
                <div id="print-button" className="no-print">
                    <button type="button" className="btn btn-info btn-menu" onClick={this.preparePrint}>Print</button>
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