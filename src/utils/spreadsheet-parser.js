import { read as xlsxRead, utils as xlsxUtils } from 'xlsx';

export const readSpreadsheetData = (data, callback) => {
    const workbook = xlsxRead(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const jsonObject = xlsxUtils.sheet_to_json(workbook.Sheets[sheetName]);

    callback(jsonObject);
};

export const readSpreadsheetFile = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => readSpreadsheetData(e.target.result, callback);
    reader.readAsBinaryString(file);
};

export default function readSpreadsheet(file, callback) {
    readSpreadsheetFile(file, callback);
}
