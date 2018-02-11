import React from 'react';
import XLSX from 'xlsx';

import '../styles/SpreadsheetParser.css'

export class SpreadsheetParser extends React.Component {
    constructor() {
        super();
        this.parseURL = this.parseURL.bind(this);
        this.parseDataFromURL = this.parseDataFromURL.bind(this);
        this.parseSpreadsheetData = this.parseSpreadsheetData.bind(this);
        this.buildResumeObject = this.buildResumeObject.bind(this);
        this.redirect = this.redirect.bind(this);

        this.state = {
            template: null,
            templateList: ['VanHack'],
        };
    }
    parseUpload(event) {
        console.log(event.target);
        window.alert('something 1');
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
                <form onSubmit={this.parseURL}>
                    {this.state.templateList.length > 0 ? (
                        <div>
                            <h4>Choose your template: </h4>
                            <select className="selectpicker form-control" name="template">
                                {this.state.templateList.map(function (value, key) {
                                    return (
                                        <option key={key} value={key}>{value}</option>
                                    )
                                })}
                            </select>
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