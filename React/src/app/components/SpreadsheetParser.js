import React from 'react';
import XLSX from 'xlsx';

import '../styles/SpreadsheetParser.css'

export class SpreadsheetParser extends React.Component {
    constructor() {
        super();
        this.parseURL = this.parseURL.bind(this);
        this.parseUpload = this.parseUpload.bind(this);
        this.parseDataFromURL = this.parseDataFromURL.bind(this);
        this.parseSpreadsheetData = this.parseSpreadsheetData.bind(this);
        this.buildResumeObject = this.buildResumeObject.bind(this);
        this.redirect = this.redirect.bind(this);

        this.state = {
            template: null,
            templateList: ['VanHack'],
            loading: false,
        };
    }
    parseUpload(event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        let $this = this;
        reader.onload = function (e) {
            $this.parseSpreadsheetData(e, e.target.result);
        };
        reader.readAsBinaryString(file);
    }
    parseURL(event) {
        event.preventDefault();
        let spreadsheetURL = event.target.spreadsheet.value;
        this.state.template = event.target.template.value;

        let spreadsheetId = new RegExp('/spreadsheets/d/([a-zA-Z0-9-_]+)').exec(spreadsheetURL);
        if ((spreadsheetId !== null) && (spreadsheetId !== undefined)) {
            spreadsheetId = spreadsheetId[1];
        } else {
            return;
        }
        let sheetId = new RegExp('[#&]gid=([0-9]+)').exec(spreadsheetURL);
        if (sheetId) {
            sheetId = sheetId[1];
        } else {
            sheetId = '0';
        }

        this.parseDataFromURL(spreadsheetId, sheetId);
    }
    parseDataFromURL(spreadsheetId, sheetId) {
        this.state.loading = true;
        this.forceUpdate();
        let url = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/export?format=xlsx&gid=' + sheetId;
        let $this = this;

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.overrideMimeType('text/plain; charset=x-user-defined');
        xhr.onload = function (e) {
            let data = xhr.responseText;
            let f = new File([], 'sample.xlsx', {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            let reader = new FileReader();
            reader.onload = function (e) {
                $this.parseSpreadsheetData(e, data);
            };
            reader.readAsBinaryString(f);
        };
        xhr.send(null);
    }
    parseSpreadsheetData(e, data) {
        // debugger;
        let workbook = XLSX.read(data, {type: 'binary'});
        let sheetName = workbook.SheetNames[0];
        let jsonObject = workbook.Sheets[sheetName];
        jsonObject = XLSX.utils.sheet_to_row_object_array(jsonObject);
        this.buildResumeObject(jsonObject);
    }
    buildResumeObject(sheetObject) {
        const idAttr = 'id'.toUpperCase();
        const typeAttr = 'type'.toUpperCase();
        const contentAttr = 'content'.toUpperCase();
        const dataForAttr = 'data-for'.toUpperCase();
        const disabledAttr = 'disabled'.toUpperCase();

        const trueAttr = 'true'.toUpperCase();
        const fromAttr = 'from';
        const toAttr = 'to';
        const localAttr = 'local';
        const itemAttr = 'item';
        const fullNameAttr = 'full-name';
        const jobTitleAttr = 'job-title';
        const websiteAttr = 'website';
        const githubAttr = 'github';
        const emailAttr = 'email';
        const phoneAttr = 'phone';
        const cityAttr = 'city';
        const countryAttr = 'country';
        const skillsAttr = 'skills';
        const languagesAttr = 'languages';
        const experienceAttr = 'experience';
        const companyAttr = 'company';
        const sideProjectAttr = 'side-project';
        const descriptionAttr = 'description';
        const urlAttr = 'url';
        const educationAttr = 'education';

        let finalObj = {};
        let fathers = [];
        let sons = [];
        sheetObject.map(function(value) {
            if (value[typeAttr] === fullNameAttr.toLowerCase()) {
                finalObj.fullName = {};
                finalObj.fullName.display = value[disabledAttr] !== trueAttr;
                finalObj.fullName.content = value[contentAttr];
            } else if (value[typeAttr] === jobTitleAttr.toLowerCase()) {
                finalObj.jobTitle = {};
                finalObj.jobTitle.display = value[disabledAttr] !== trueAttr;
                finalObj.jobTitle.content = value[contentAttr];
            } else if (value[typeAttr] === websiteAttr.toLowerCase()) {
                finalObj.website = {};
                finalObj.website.display = value[disabledAttr] !== trueAttr;
                finalObj.website.content = value[contentAttr];
            } else if (value[typeAttr] === githubAttr.toLowerCase()) {
                finalObj.github = {};
                finalObj.github.display = value[disabledAttr] !== trueAttr;
                finalObj.github.content = value[contentAttr];
            } else if (value[typeAttr] === emailAttr.toLowerCase()) {
                finalObj.email = {};
                finalObj.email.display = value[disabledAttr] !== trueAttr;
                finalObj.email.content = value[contentAttr];
            } else if (value[typeAttr] === phoneAttr.toLowerCase()) {
                finalObj.phone = {};
                finalObj.phone.display = value[disabledAttr] !== trueAttr;
                finalObj.phone.content = value[contentAttr];
            } else if (value[typeAttr] === cityAttr.toLowerCase()) {
                finalObj.city = {};
                finalObj.city.display = value[disabledAttr] !== trueAttr;
                finalObj.city.content = value[contentAttr];
            } else if (value[typeAttr] === countryAttr.toLowerCase()) {
                finalObj.country = {};
                finalObj.country.display = value[disabledAttr] !== trueAttr;
                finalObj.country.content = value[contentAttr];
            } else if (value[typeAttr] === skillsAttr.toLowerCase()) {
                finalObj.skills = {};
                finalObj.skills.display = value[disabledAttr] !== trueAttr;
                finalObj.skills.content = value[contentAttr];
            } else if (value[typeAttr] === languagesAttr.toLowerCase()) {
                finalObj.languages = {};
                finalObj.languages.display = value[disabledAttr] !== trueAttr;
                finalObj.languages.content = value[contentAttr];
            }
            if (value[idAttr]) {
                fathers.push(value);
            } else if (value[dataForAttr]) {
                sons.push(value);
            }
        });

        finalObj.experience = {};
        finalObj.experience.display = true;
        finalObj.experience.content = [];
        finalObj.sideProject = {};
        finalObj.sideProject.display = true;
        finalObj.sideProject.content = [];
        finalObj.education = {};
        finalObj.education.display = true;
        finalObj.education.content = [];

        fathers.map(function(value) {
            let id = value[idAttr];
            let tempObj = {};
            tempObj.id = id;
            let childs = sons.filter(function(value) {
                // debugger;
                if (value[dataForAttr] === id) {
                    return value;
                }
            });

            if (value[typeAttr] === experienceAttr.toLowerCase()) {
                tempObj.jobTitle = {};
                tempObj.jobTitle.display = value[disabledAttr] !== trueAttr;
                tempObj.jobTitle.content = value[contentAttr];
                let items = [];
                childs.map(function(value) {
                    if (value[typeAttr] === companyAttr.toLowerCase()) {
                        tempObj.company = {};
                        tempObj.company.display = value[disabledAttr] !== trueAttr;
                        tempObj.company.content = value[contentAttr];
                    } else if (value[typeAttr] === fromAttr.toLowerCase()) {
                        tempObj.from = {};
                        tempObj.from.display = value[disabledAttr] !== trueAttr;
                        tempObj.from.content = value[contentAttr];
                    } else if (value[typeAttr] === toAttr.toLowerCase()) {
                        tempObj.to = {};
                        tempObj.to.display = value[disabledAttr] !== trueAttr;
                        tempObj.to.content = value[contentAttr];
                    } else if (value[typeAttr] === localAttr.toLowerCase()) {
                        tempObj.local = {};
                        tempObj.local.display = value[disabledAttr] !== trueAttr;
                        tempObj.local.content = value[contentAttr];
                    } else if (value[typeAttr] === itemAttr.toLowerCase()) {
                        let auxObj = {};
                        auxObj.display = value[disabledAttr] !== trueAttr;
                        auxObj.content = value[contentAttr];
                        items.push(auxObj);
                    }
                    tempObj.display = true;
                });
                tempObj.items = {};
                tempObj.display = value[disabledAttr] !== trueAttr;
                tempObj.items.display = true;
                tempObj.items.content = items;
                finalObj.experience.content.push(tempObj);
            } else if (value[typeAttr] === sideProjectAttr.toLowerCase()) {
                tempObj.projectName = {};
                tempObj.projectName.display = value[disabledAttr] !== trueAttr;
                tempObj.projectName.content = value[contentAttr];
                childs.map(function(value) {
                    if (value[typeAttr] === urlAttr.toLowerCase()) {
                        tempObj.url = {};
                        tempObj.url.display = value[disabledAttr] !== trueAttr;
                        tempObj.url.content = value[contentAttr];
                    } else if (value[typeAttr] === descriptionAttr.toLowerCase()) {
                        tempObj.description = {};
                        tempObj.description.display = value[disabledAttr] !== trueAttr;
                        tempObj.description.content = value[contentAttr];
                    }
                    tempObj.display = value[disabledAttr] !== trueAttr;
                });
                finalObj.sideProject.content.push(tempObj);
            } else if (value[typeAttr] === educationAttr.toLowerCase()) {
                tempObj.degree = {};
                tempObj.degree.display = value[disabledAttr] !== trueAttr;
                tempObj.degree.content = value[contentAttr];
                let items = [];
                childs.map(function(value) {
                    if (value[typeAttr] === localAttr.toLowerCase()) {
                        tempObj.local = {};
                        tempObj.local.display = value[disabledAttr] !== trueAttr;
                        tempObj.local.content = value[contentAttr];
                    } else if (value[typeAttr] === fromAttr.toLowerCase()) {
                        tempObj.from = {};
                        tempObj.from.display = value[disabledAttr] !== trueAttr;
                        tempObj.from.content = value[contentAttr];
                    } else if (value[typeAttr] === toAttr.toLowerCase()) {
                        tempObj.to = {};
                        tempObj.to.display = value[disabledAttr] !== trueAttr;
                        tempObj.to.content = value[contentAttr];
                    } else if (value[typeAttr] === itemAttr.toLowerCase()) {
                        let auxObj = {};
                        auxObj.display = value[disabledAttr] !== trueAttr;
                        auxObj.content = value[contentAttr];
                        items.push(auxObj);
                    }
                    tempObj.display = true;
                });
                tempObj.items = {};
                tempObj.display = value[disabledAttr] !== trueAttr;
                tempObj.items.display = true;
                tempObj.items.content = items;
                finalObj.education.content.push(tempObj);
            }
        });
        this.redirect('/resume', {sheetObject: finalObj, template: this.state.template});
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
            <div id="data-input">
                {this.state.loading ? (
                    <div id="loading">
                        <h2>Loading...</h2>
                    </div>
                ) : null}
                <form onSubmit={this.parseURL}>
                    {this.state.templateList.length > 0 ? (
                        <div id="choose-template">
                            <select className="selectpicker form-control" name="template">
                                {this.state.templateList.map(function (value, key) {
                                    return (
                                        <option key={key} value={key}>{value}</option>
                                    )
                                })}
                            </select>
                            <h4>Choose your template: </h4>
                            <hr/>
                        </div>
                        ) : null}
                    <h4>Paste your Google Spreadsheet URL...</h4>
                    <p>(<a href="https://docs.google.com/spreadsheets/d/1Mrgu6dOTyEBkzHtoSSH2BhRNd8n8tuupVlcQUJhUY-0/copy" target="_blank">make a copy</a>)</p>
                    <div className="input-container">
                        <div className="data-link-input">
                            <input type="text" className="form-control" placeholder="Paste your Google Spreadsheet URL here." name="spreadsheet"/>
                        </div>
                        <h4>... or choose a file from your computer</h4>
                        <p>(<a href="https://docs.google.com/spreadsheets/d/1Mrgu6dOTyEBkzHtoSSH2BhRNd8n8tuupVlcQUJhUY-0/export?format=xlsx&gid=0">download sample</a>)</p>
                        <div id="button-go">
                            <button type="submit" className="btn btn-primary btn-menu">Go!</button>
                        </div>
                        <div className="data-upload-input">
                            <label className="custom-file">
                                <input type="file" className="custom-file-input" onChange={this.parseUpload} />
                                    <span className="custom-file-control">Choose file...</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

SpreadsheetParser.propTypes = {
    // https://reactjs.org/docs/typechecking-with-proptypes.html
};