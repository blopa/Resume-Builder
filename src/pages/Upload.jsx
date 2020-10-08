import React, { useCallback, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField } from '@material-ui/core';
import { cloneDeep } from 'lodash';
import { navigate, useIntl } from 'gatsby-plugin-intl';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import DropZone from '../components/DropZone';
import { traverseObject } from '../utils/utils';
import spreadsheetToJsonResume from '../utils/spreadsheet-to-json-resume';
import readSpreadsheet, { parseSpreadsheetUrl } from '../utils/spreadsheet-parser';
import { readJsonFile } from '../utils/json-parser';
import { StoreContext } from '../store/StoreProvider';
import setJsonResume from '../store/actions/setJsonResume';
import setTogglableJsonResume from '../store/actions/setTogglableJsonResume';
import TemplateSelector from '../components/TemplateSelector';
import setResumeTemplate from '../store/actions/setResumeTemplate';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    templateSelector: {
        width: '100%',
        margin: '10px auto',
    },
    sheetsAndOkWrapper: {
        margin: '10px 0',
        display: 'flex',
    },
    googleSpreadsheetInput: {
        width: '100%',
        margin: '10px auto',
    },
    buildButton: {
        marginLeft: '10px',
    },
    pageContent: {
        padding: '5px',
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

const UploadPage = ({ pageContext, location }) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(StoreContext);
    const intl = useIntl();
    const [textInputValue, setTextInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    // console.log(JSON.stringify(state));

    const setResumesAndForward = useCallback((jsonResume) => {
        dispatch(setJsonResume(jsonResume));
        const togglableJsonResume = traverseObject(cloneDeep(jsonResume));
        dispatch(setTogglableJsonResume(togglableJsonResume));

        navigate('/build');
    }, [dispatch]);

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

    const handleTemplateSelected = useCallback((selectedTemplate) => {
        dispatch(setResumeTemplate(selectedTemplate));
    }, [dispatch]);

    return (
        <Layout>
            <SEO
                title={intl.formatMessage({ id: 'upload_resume' })}
            />
            <Typography
                color="textPrimary"
                variant="h4"
            >
                {intl.formatMessage({ id: 'upload_resume' })}
            </Typography>
            <div
                className={classes.pageContent}
            >
                <Typography
                    color="textPrimary"
                    variant="h6"
                >
                    1 - {intl.formatMessage({ id: 'select_your_template' })}
                </Typography>
                <TemplateSelector
                    className={classes.templateSelector}
                    onSelect={handleTemplateSelected}
                />
                <Typography
                    color="textPrimary"
                    variant="h6"
                >
                    2 - {intl.formatMessage({ id: 'upload_or_parse_url' })}
                </Typography>
                <DropZone
                    maxLength={1}
                    handleFile={handleFile}
                    disabled={false}
                />
                <div className={classes.sheetsAndOkWrapper}>
                    <TextField
                        className={classes.googleSpreadsheetInput}
                        label={intl.formatMessage({ id: 'google_sheet_url' })}
                        placeholder={intl.formatMessage({ id: 'google_sheet_url_description' })}
                        onChange={setInputedTextToState}
                    />
                    <Button
                        className={classes.buildButton}
                        onClick={handleButtonClick}
                        disabled={!textInputValue || loading}
                        variant="contained"
                        color="default"
                        type="submit"
                    >
                        {intl.formatMessage({ id: 'go' })}
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default UploadPage;
