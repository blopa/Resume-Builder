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
    // This regular expression is designed to extract the Google Spreadsheet ID from a URL.
    // It looks for a pattern that typically appears in Google Sheets URLs:
    // - `/spreadsheets/d/`: This is a literal string that precedes the spreadsheet ID.
    // - `([a-zA-Z0-9-_]+)`: This is the capturing group.
    //   - `[a-zA-Z0-9-_]`: This character set matches any uppercase or lowercase letter, any digit, a hyphen, or an underscore. These are the characters typically found in a spreadsheet ID.
    //   - `+`: This quantifier means "one or more" of the preceding characters.
    // The entire regex captures the sequence of characters that constitutes the spreadsheet ID.
    // For example, in 'https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit#gid=0',
    // it would capture 'SPREADSHEET_ID_HERE'.
    //
    // Potential limitations:
    // - This regex assumes the spreadsheet ID is directly after '/spreadsheets/d/'. If there are other URL parameters
    //   or path segments between '/spreadsheets/d/' and the ID, it might not capture correctly.
    // - It assumes the standard 'docs.google.com' domain. While the regex itself doesn't check the domain,
    //   its typical application context implies this.
    // eslint-disable-next-line prefer-regex-literals
    const spreadsheetIdResult = new RegExp('/spreadsheets/d/([a-zA-Z0-9-_]+)').exec(spreadsheetUrl);
    if (!spreadsheetIdResult) {
        return;
    }

    let sheetId = 0;
    // This regular expression is designed to extract the Google Sheet ID (gid) from a URL.
    // It looks for a pattern that typically appears in Google Sheets URLs:
    // - `[#&]`: This character set matches either a `#` (hash) or an `&` (ampersand).
    //   This allows the `gid` parameter to be found either in the URL's hash fragment (e.g., `#gid=123`)
    //   or as a query parameter (e.g., `&gid=123`).
    // - `gid=`: This is a literal string that precedes the sheet ID.
    // - `([0-9]+)`: This is the capturing group.
    //   - `[0-9]`: This character set matches any digit.
    //   - `+`: This quantifier means "one or more" of the preceding digits.
    // The entire regex captures the sequence of digits that constitutes the sheet ID.
    // For example, in 'https://docs.google.com/spreadsheets/d/ID/edit#gid=0' or '.../edit?param=val&gid=123',
    // it would capture '0' or '123' respectively.
    //
    // Potential limitations:
    // - If 'gid=' appears elsewhere in the URL with a numeric value for a different purpose, this regex might
    //   incorrectly capture it, though this is unlikely for standard Google Sheets URLs.
    // - It assumes the gid is always numeric.
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
