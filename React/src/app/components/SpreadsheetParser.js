import React from 'react';
import XLSX from 'xlsx';

import '../styles/SpreadsheetParser.css'

export class SpreadsheetParser extends React.Component {
    constructor() {
        super();
        this.parseURL = this.parseURL.bind(this);
        this.parseDataFromURL = this.parseDataFromURL.bind(this);
        this.parseSpreadsheetData = this.parseSpreadsheetData.bind(this);
    }
    parseUpload(event) {
        console.log(event.target);
        window.alert('something 1');
    }
    parseURL(event) {
        event.preventDefault();
        let spreadsheetURL = event.target.spreadsheet.value;
        debugger;
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
        debugger;
    }
    render() {
        return(
            <div id="data-input">
                <h4>Paste your Google Spreadsheet URL...</h4>
                <p>(<a href="https://docs.google.com/spreadsheets/d/1Mrgu6dOTyEBkzHtoSSH2BhRNd8n8tuupVlcQUJhUY-0/copy" target="_blank">make a copy</a>)</p>
                <div className="input-container">
                    <div className="data-link-input">
                        <form onSubmit={this.parseURL}>
                            <input type="text" className="form-control" placeholder="Paste your Google Spreadsheet URL here." name="spreadsheet"/>
                        </form>
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
            </div>
        );
    }
}

SpreadsheetParser.propTypes = {
    // https://reactjs.org/docs/typechecking-with-proptypes.html
};