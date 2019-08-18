import React from 'react';
import DropZone from '../ui/DropZone/DropZone';
import readSpreadsheet from '../../utils/spreadsheet-parser';
import spreadsheetToJsonResume from '../../utils/spreadsheet-to-json-resume';

export default function BuildPage() {
    return (
        <div>
            <h1 style={{ fontSize: 50, fontWeigth: 'bold', textAlign: 'center' }}>
                React Pages Boilerplate
            </h1>
            <DropZone
                maxLength={1}
                handleFile={(file) => {
                    readSpreadsheet(file, (jsonSpreadsheet) => {
                        spreadsheetToJsonResume(jsonSpreadsheet);
                    });
                }}
                disabled={false}
            />
        </div>
    );
}
