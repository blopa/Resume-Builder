import { read as xlsxRead, utils as xlsxUtils } from 'xlsx';

export const readSpreadsheetData = (data, callback) => {
    const workbook = xlsxRead(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const jsonObject = xlsxUtils.sheet_to_json(workbook.Sheets[sheetName], {
        raw: false,
    });

    callback(jsonObject);
};

export const readSpreadsheetFile = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => readSpreadsheetData(e.target.result, callback);
    // eslint-disable-next-line
    reader.onerror = () => callback([]);
    reader.readAsBinaryString(file);
};

export const downloadSpreadsheetFile = (spreadsheetId, sheetId, callback, errorCallback, forceCors = true) => {
    const downloadUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx&gid=${sheetId}`;
    let url = downloadUrl;
    if (forceCors) {
        url = `https://cors-anywhere.herokuapp.com/${downloadUrl}`;
    }

    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.overrideMimeType('text/plain; charset=x-user-defined');
    xhr.onload = (event) => {
        if (event.currentTarget.status === 200) {
            if (xhr.responseText.startsWith('PK')) {
                return readSpreadsheetData(xhr.responseText, callback);
            }

            return errorCallback(downloadUrl);
        }

        return errorCallback(downloadUrl);
    };
    xhr.onerror = (event) => errorCallback(event);
    xhr.send(null);
};

export const parseSpreadsheetUrl = (spreadsheetUrl, callback, errorCallback) => {
    // TODO
    // eslint-disable-next-line prefer-regex-literals
    const spreadsheetIdResult = new RegExp('/spreadsheets/d/([a-zA-Z0-9-_]+)').exec(spreadsheetUrl);
    if (!spreadsheetIdResult) {
        return;
    }

    let sheetId = 0;
    // TODO
    // eslint-disable-next-line prefer-regex-literals
    const sheetIdResult = new RegExp('[#&]gid=([0-9]+)').exec(spreadsheetUrl);
    if (sheetIdResult) {
        sheetId = sheetIdResult[1];
    }
    const spreadsheetId = spreadsheetIdResult[1];

    downloadSpreadsheetFile(spreadsheetId, sheetId, callback, errorCallback, false);
};

export const readSpreadsheet = (file, callback) => {
    readSpreadsheetFile(file, callback);
};
