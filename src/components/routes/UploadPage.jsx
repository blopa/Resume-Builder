import React, { Component } from 'react';
import DropZone from '../ui/DropZone/DropZone';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

// Utils
import readSpreadsheet, {parseSpreadsheetUrl} from '../../utils/spreadsheet-parser';
import spreadsheetToJsonResume from '../../utils/spreadsheet-to-json-resume';
import { traverseObject } from '../../utils/utils';
import { readJsonFile } from '../../utils/json-parser';

// Actions
import setJsonResume from '../../store/actions/setJsonResume';
import setTogglableJsonResume from '../../store/actions/setTogglableJsonResume';
import TextInput from '../ui/TextInput/TextInput';
import MuiButton from '../ui/MuiButton/MuiButton';

const mapStateToProps = (state) => ({ storeData: state });
const mapDispatchToProps = (dispatch) => ({
    setJsonResume: (resume) => {
        dispatch(setJsonResume(resume));
    },
    setTogglableJsonResume: (resume) => {
        dispatch(setTogglableJsonResume(resume));
    },
});

// permitted spreadsheet extensions
const SHEET_EXTENSIONS = [
    'xlsx',
    'xlsm',
    'csv',
    'xls',
    'xml',
    'xlt',
    'xlsb',
    'ods',
];

class UploadPage extends Component {
    state = {
        textInputValue: '',
        loading: false,
    };

    setResumesAndForward = (jsonResume) => {
        const { history } = this.props;
        this.props.setJsonResume(jsonResume);
        const togglableJsonResume = traverseObject(cloneDeep(jsonResume));
        this.props.setTogglableJsonResume(togglableJsonResume);

        history.push({
            pathname: 'build',
        });
    };

    readSpreadsheetCallback = (spreadsheetArray) => {
        if (spreadsheetArray && spreadsheetArray.length) {
            const jsonResume = spreadsheetToJsonResume(spreadsheetArray);
            this.setResumesAndForward(jsonResume);
        }
    };

    handleFile = (file) => {
        const fileExtension = file.path && file.path.split('.').pop();

        if (SHEET_EXTENSIONS.includes(fileExtension)) {
            readSpreadsheet(file, this.readSpreadsheetCallback);
        } else if (['json'].includes(fileExtension)) {
            readJsonFile(file, (jsonString) => {
                this.setResumesAndForward(JSON.parse(jsonString));
            });
        }
    };

    setInputedTextToState = (e) => {
        if (!this.state.textInputValue && !e.target.value) {
            return;
        }

        this.setState({
            textInputValue: e.target.value,
        });
    };

    handleButtonClick = () => {
        this.setState({
            loading: true,
        });

        parseSpreadsheetUrl(
            this.state.textInputValue,
            this.readSpreadsheetCallback
        );
    };

    render() {
        return (
            <div>
                <h1 style={{ fontSize: 50, fontWeigth: 'bold', textAlign: 'center' }}>
                    Upload your resume file
                </h1>
                <DropZone
                    maxLength={1}
                    handleFile={this.handleFile}
                    disabled={false}
                />
                <h4 style={{ margin: '0', textAlign: 'center' }}>
                    or
                </h4>
                <TextInput
                    label="Google Spreadsheet URL"
                    placeholder="Put your Google Spreadsheet URL here"
                    onKeyUp={this.setInputedTextToState}
                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <MuiButton
                        variant="contained"
                        color="primary"
                        disabled={!this.state.textInputValue || this.state.loading}
                        onClick={this.handleButtonClick}
                    >
                        Go!
                    </MuiButton>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);
