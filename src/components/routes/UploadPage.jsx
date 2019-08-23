import React from 'react';
import DropZone from '../ui/DropZone/DropZone';
import readSpreadsheet from '../../utils/spreadsheet-parser';
import spreadsheetToJsonResume from '../../utils/spreadsheet-to-json-resume';
import { traverseObject } from '../../utils/utils';

export default function UploadPage({ history }) {
    const handleFile = (file) => {
        readSpreadsheet(file, (spreadsheetArray) => {
            if (spreadsheetArray && spreadsheetArray.length) {
                let jsonResume = spreadsheetToJsonResume(spreadsheetArray);
                jsonResume = traverseObject(jsonResume);

                history.push({
                    pathname: 'build',
                    props: { jsonResume },
                });
            }
        });
    };

    return (
        <div>
            <h1 style={{ fontSize: 50, fontWeigth: 'bold', textAlign: 'center' }}>
                Upload your resume file
            </h1>
            <DropZone
                maxLength={1}
                handleFile={handleFile}
                disabled={false}
            />
        </div>
    );
}
