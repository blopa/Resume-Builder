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
                finalObj.fullName = value[contentAttr];
            } else if (value[typeAttr] === jobTitleAttr.toLowerCase()) {
                finalObj.jobTitle = value[contentAttr];
            } else if (value[typeAttr] === websiteAttr.toLowerCase()) {
                finalObj.website = value[contentAttr];
            } else if (value[typeAttr] === githubAttr.toLowerCase()) {
                finalObj.github = value[contentAttr];
            } else if (value[typeAttr] === emailAttr.toLowerCase()) {
                finalObj.email = value[contentAttr];
            } else if (value[typeAttr] === phoneAttr.toLowerCase()) {
                finalObj.phone = value[contentAttr];
            } else if (value[typeAttr] === cityAttr.toLowerCase()) {
                finalObj.city = value[contentAttr];
            } else if (value[typeAttr] === countryAttr.toLowerCase()) {
                finalObj.country = value[contentAttr];
            } else if (value[typeAttr] === skillsAttr.toLowerCase()) {
                finalObj.skills = value[contentAttr];
            } else if (value[typeAttr] === languagesAttr.toLowerCase()) {
                finalObj.languages = value[contentAttr];
            }
            if (value[idAttr]) {
                fathers.push(value);
            } else if (value[dataForAttr]) {
                sons.push(value);
            }
        });

        finalObj.experience = [];
        finalObj.sideProject = [];
        finalObj.education = [];

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
                tempObj.jobTitle = value[contentAttr];
                let items = [];
                childs.map(function(value) {
                    if (value[typeAttr] === companyAttr.toLowerCase()) {
                        tempObj.company = value[contentAttr];
                    } else if (value[typeAttr] === fromAttr.toLowerCase()) {
                        tempObj.from = value[contentAttr];
                    } else if (value[typeAttr] === toAttr.toLowerCase()) {
                        tempObj.to = value[contentAttr];
                    } else if (value[typeAttr] === localAttr.toLowerCase()) {
                        tempObj.local = value[contentAttr];
                    } else if (value[typeAttr] === itemAttr.toLowerCase()) {
                        items.push(value[contentAttr]);
                    }
                });
                tempObj.items = items;
                finalObj.experience.push(tempObj);
            } else if (value[typeAttr] === sideProjectAttr.toLowerCase()) {
                tempObj.projectName = value[contentAttr];
                childs.map(function(value) {
                    if (value[typeAttr] === urlAttr.toLowerCase()) {
                        tempObj.url = value[contentAttr];
                    } else if (value[typeAttr] === descriptionAttr.toLowerCase()) {
                        tempObj.description = value[contentAttr];
                    }
                });
                finalObj.sideProject.push(tempObj);
            } else if (value[typeAttr] === educationAttr.toLowerCase()) {
                tempObj.degree = value[contentAttr];
                let items = [];
                childs.map(function(value) {
                    if (value[typeAttr] === localAttr.toLowerCase()) {
                        tempObj.local = value[contentAttr];
                    } else if (value[typeAttr] === fromAttr.toLowerCase()) {
                        tempObj.from = value[contentAttr];
                    } else if (value[typeAttr] === toAttr.toLowerCase()) {
                        tempObj.to = value[contentAttr];
                    } else if (value[typeAttr] === itemAttr.toLowerCase()) {
                        items.push(value[contentAttr]);
                    }
                });
                tempObj.items = items;
                finalObj.education.push(tempObj);
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