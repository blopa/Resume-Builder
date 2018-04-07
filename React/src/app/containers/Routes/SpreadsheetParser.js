import React from 'react';
import XLSX from 'xlsx';
import '../../styles/SpreadsheetParser.scss';
import PropTypes from 'prop-types';

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
      loading: false
    };
  }
  parseUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const $this = this;
    reader.onload = function (e) {
      $this.parseSpreadsheetData(e, e.target.result);
    };
    reader.readAsBinaryString(file);
  }
  parseURL(event) {
    event.preventDefault();
    const spreadsheetURL = event.target.spreadsheet.value;
    this.setState({
      template: event.target.template.value
    });

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
    this.setState({
      loading: true
    });
    this.forceUpdate();
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx&gid=${sheetId}`;
    const $this = this;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.overrideMimeType('text/plain; charset=x-user-defined');
    xhr.onload = function () {
      const data = xhr.responseText;
      const f = new File([], 'sample.xlsx', {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      const reader = new FileReader();
      reader.onload = function (e) {
        $this.parseSpreadsheetData(e, data);
      };
      reader.readAsBinaryString(f);
    };
    xhr.send(null);
  }
  parseSpreadsheetData(e, data) {
    // debugger;
    const workbook = XLSX.read(data, {type: 'binary'});
    const sheetName = workbook.SheetNames[0];
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

    const finalObj = {};
    const fathers = [];
    const sons = [];
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
      const id = value[idAttr];
      const tempObj = {};
      tempObj.id = id;
      const childs = sons.filter(function(val) {
        // debugger;
        if (val[dataForAttr] === id) {
          return val;
        }
      });

      if (value[typeAttr] === experienceAttr.toLowerCase()) {
        tempObj.jobTitle = {};
        tempObj.jobTitle.display = value[disabledAttr] !== trueAttr;
        tempObj.jobTitle.content = value[contentAttr];
        const items = [];
        childs.map(function(val) {
          if (val[typeAttr] === companyAttr.toLowerCase()) {
            tempObj.company = {};
            tempObj.company.display = val[disabledAttr] !== trueAttr;
            tempObj.company.content = val[contentAttr];
          } else if (val[typeAttr] === fromAttr.toLowerCase()) {
            tempObj.from = {};
            tempObj.from.display = val[disabledAttr] !== trueAttr;
            tempObj.from.content = val[contentAttr];
          } else if (val[typeAttr] === toAttr.toLowerCase()) {
            tempObj.to = {};
            tempObj.to.display = val[disabledAttr] !== trueAttr;
            tempObj.to.content = val[contentAttr];
          } else if (val[typeAttr] === localAttr.toLowerCase()) {
            tempObj.local = {};
            tempObj.local.display = val[disabledAttr] !== trueAttr;
            tempObj.local.content = val[contentAttr];
          } else if (val[typeAttr] === itemAttr.toLowerCase()) {
            const auxObj = {};
            auxObj.display = val[disabledAttr] !== trueAttr;
            auxObj.content = val[contentAttr];
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
        childs.map(function(val) {
          if (val[typeAttr] === urlAttr.toLowerCase()) {
            tempObj.url = {};
            tempObj.url.display = val[disabledAttr] !== trueAttr;
            tempObj.url.content = val[contentAttr];
          } else if (val[typeAttr] === descriptionAttr.toLowerCase()) {
            tempObj.description = {};
            tempObj.description.display = val[disabledAttr] !== trueAttr;
            tempObj.description.content = val[contentAttr];
          }
          tempObj.display = val[disabledAttr] !== trueAttr;
        });
        finalObj.sideProject.content.push(tempObj);
      } else if (value[typeAttr] === educationAttr.toLowerCase()) {
        tempObj.degree = {};
        tempObj.degree.display = value[disabledAttr] !== trueAttr;
        tempObj.degree.content = value[contentAttr];
        const items = [];
        childs.map(function(val) {
          if (val[typeAttr] === localAttr.toLowerCase()) {
            tempObj.local = {};
            tempObj.local.display = val[disabledAttr] !== trueAttr;
            tempObj.local.content = val[contentAttr];
          } else if (val[typeAttr] === fromAttr.toLowerCase()) {
            tempObj.from = {};
            tempObj.from.display = val[disabledAttr] !== trueAttr;
            tempObj.from.content = val[contentAttr];
          } else if (val[typeAttr] === toAttr.toLowerCase()) {
            tempObj.to = {};
            tempObj.to.display = val[disabledAttr] !== trueAttr;
            tempObj.to.content = val[contentAttr];
          } else if (val[typeAttr] === itemAttr.toLowerCase()) {
            const auxObj = {};
            auxObj.display = val[disabledAttr] !== trueAttr;
            auxObj.content = val[contentAttr];
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
    // debugger;
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
    return (
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
                  );
                })}
              </select>
              <h4>Choose your template: </h4>
              <hr/>
            </div>
          ) : null}
          <h4>Paste your Google Spreadsheet URL...</h4>
          <p>(<a
            href="https://docs.google.com/spreadsheets/d/1Mrgu6dOTyEBkzHtoSSH2BhRNd8n8tuupVlcQUJhUY-0/copy"
            target="_blank" rel="noopener noreferrer">make a copy</a>)
          </p>
          <div className="input-container">
            <div className="data-link-input">
              <input type="text" className="form-control" placeholder="Paste your Google Spreadsheet URL here."
                name="spreadsheet"
              />
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
  history: PropTypes.object
};
