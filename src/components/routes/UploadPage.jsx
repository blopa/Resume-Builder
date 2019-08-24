import React, { Component } from 'react';
import DropZone from '../ui/DropZone/DropZone';
import { connect } from 'react-redux';

// Utils
import readSpreadsheet from '../../utils/spreadsheet-parser';
import spreadsheetToJsonResume from '../../utils/spreadsheet-to-json-resume';
import { traverseObject } from '../../utils/utils';

// Actions
import setJsonResume from '../../store/actions/setJsonResume';
import setTogglableJsonResume from '../../store/actions/setTogglableJsonResume';

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
    readSpreadsheetCallback = (spreadsheetArray) => {
        const { history } = this.props;
        if (spreadsheetArray && spreadsheetArray.length) {
            let jsonResume = spreadsheetToJsonResume(spreadsheetArray);
            this.props.setJsonResume(jsonResume);
            const togglableJsonResume = traverseObject({ ...jsonResume });
            this.props.setTogglableJsonResume(togglableJsonResume);

            history.push({
                pathname: 'build',
            });
        }
    };

    handleFile = (file) => {
        const fileExtension = file.path && file.path.split('.').pop();
        if (SHEET_EXTENSIONS.includes(fileExtension)) {
            readSpreadsheet(file, this.readSpreadsheetCallback);
        }
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
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);
