import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { useIntl } from 'gatsby-plugin-intl';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import DropZone from '../components/DropZone';
import { traverseObject } from '../utils/utils';
import spreadsheetToJsonResume from '../utils/spreadsheet-to-json-resume';
import readSpreadsheet, { parseSpreadsheetUrl } from '../utils/spreadsheet-parser';
import { readJsonFile } from '../utils/json-parser';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

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

const UploadPage = (props) => {
    const classes = useStyles();
    const intl = useIntl();
    const [textInputValue, setTextInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const setResumesAndForward = useCallback((jsonResume) => {
        const { history } = props;
        props.setJsonResume(jsonResume);
        const togglableJsonResume = traverseObject(cloneDeep(jsonResume));
        props.setTogglableJsonResume(togglableJsonResume);

        history.push({
            pathname: 'build',
        });
    }, [props]);

    const readSpreadsheetCallback = useCallback((spreadsheetArray) => {
        if (spreadsheetArray && spreadsheetArray.length) {
            const jsonResume = spreadsheetToJsonResume(spreadsheetArray);
            setResumesAndForward(jsonResume);
        }
    }, [setResumesAndForward]);

    const handleFile = useCallback((file) => {
        const fileExtension = file.path && file.path.split('.').pop();

        if (SHEET_EXTENSIONS.includes(fileExtension)) {
            readSpreadsheet(file, readSpreadsheetCallback);
        } else if (['json'].includes(fileExtension)) {
            readJsonFile(file, (jsonString) => {
                setResumesAndForward(JSON.parse(jsonString));
            });
        }
    }, [readSpreadsheetCallback, setResumesAndForward]);

    const setInputedTextToState = useCallback((e) => {
        if (!textInputValue && !e.target.value) {
            return;
        }

        setTextInputValue(e.target.value);
    }, [textInputValue]);

    const handleButtonClick = useCallback(() => {
        setLoading(true);

        parseSpreadsheetUrl(
            textInputValue,
            readSpreadsheetCallback
        );
    }, [readSpreadsheetCallback, textInputValue]);

    return (
        <Layout>
            <SEO
                title="Home"
            />
            <Typography
                color="textPrimary"
                variant="overline"
            >
                Upload your resume file
            </Typography>
            <DropZone
                maxLength={1}
                handleFile={handleFile}
                disabled={false}
            />
            <TextField
                label="Google Spreadsheet URL"
                placeholder="Put your Google Spreadsheet URL here"
                onChange={setInputedTextToState}
            />
            <Button
                variant="contained"
                color="default"
                type="submit"
            >
                {intl.formatMessage({ id: 'go' })}
            </Button>
        </Layout>
    );
};

export default UploadPage;
