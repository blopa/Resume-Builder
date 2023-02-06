import { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { cloneDeep } from 'lodash';
import { navigate, useIntl } from 'gatsby-plugin-react-intl';

import SEO from '../components/SEO';
import Layout from '../components/Layout';
import DropZone from '../components/DropZone';
import TemplateSelector from '../components/TemplateSelector';

// Utils
import { convertToToggleableObject, generateCoverLetterObject } from '../utils/utils';
import spreadsheetToJsonResume from '../utils/spreadsheet-to-json-resume';
import { readSpreadsheet, parseSpreadsheetUrl } from '../utils/spreadsheet-parser';
import { readJsonFile } from '../utils/json-parser';

// Hooks
import { useDispatch } from '../store/StoreProvider';

// Actions
import setToggleableJsonResume from '../store/actions/setToggleableJsonResume';
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
const SHEET_EXTENSIONS = ['xlsx', 'xlsm', 'csv', 'xls', 'xml', 'xlt', 'xlsb', 'ods'];

const UploadPage = ({ pageContext, location }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const intl = useIntl();
    const [textInputValue, setTextInputValue] = useState('');
    const [errorMessageId, setErrorMessageId] = useState('');
    const [loading, setLoading] = useState(false);
    const [isShowingErrorSnackbar, setIsShowingErrorSnackbar] = useState(false);

    const setResumesAndForward = useCallback(
        (toggleableJsonResume) => {
            dispatch(setToggleableJsonResume(cloneDeep(toggleableJsonResume)));

            navigate('/resume');
        },
        [dispatch]
    );

    const readSpreadsheetCallback = useCallback(
        (spreadsheetArray) => {
            if (spreadsheetArray && spreadsheetArray.length) {
                const jsonResume = spreadsheetToJsonResume(spreadsheetArray);
                setResumesAndForward(jsonResume);
            } else {
                setErrorMessageId('error.something_went_wrong_loading');
                setIsShowingErrorSnackbar(true);
            }
        },
        [setResumesAndForward]
    );

    const readSpreadsheetErrorCallback = useCallback((downloadUrl) => {
        if (downloadUrl) {
            setTimeout(() => {
                const handler = window.open(downloadUrl);
                handler.blur();
                window.focus();
            }, 1500);
        }

        setErrorMessageId('error.something_went_wrong_parsing');
        setIsShowingErrorSnackbar(true);
        setLoading(false);
    }, []);

    const handleCloseErrorSnackbar = useCallback(() => {
        setIsShowingErrorSnackbar(false);
    }, []);

    const handleFile = useCallback(
        (file) => {
            const fileExtension = file.path && file.path.split('.').pop();

            if (SHEET_EXTENSIONS.includes(fileExtension)) {
                readSpreadsheet(file, readSpreadsheetCallback);
            } else if (['json'].includes(fileExtension)) {
                readJsonFile(file, (jsonString) => {
                    const jsonResume = JSON.parse(jsonString);
                    setResumesAndForward({
                        ...convertToToggleableObject(cloneDeep(jsonResume)),
                        enableSourceDataDownload: jsonResume.enableSourceDataDownload,
                        coverLetter: generateCoverLetterObject(jsonResume.coverLetter),
                        // eslint-disable-next-line no-underscore-dangle
                        __translation__: jsonResume.__translation__,
                    });
                });
            } else {
                setErrorMessageId('error.something_went_wrong_loading');
                setIsShowingErrorSnackbar(true);
            }
        },
        [readSpreadsheetCallback, setResumesAndForward]
    );

    const setInputedTextToState = useCallback(
        (e) => {
            if (!textInputValue && !e.target.value) {
                return;
            }

            setTextInputValue(e.target.value);
        },
        [textInputValue]
    );

    const handleButtonClick = useCallback(() => {
        setLoading(true);

        parseSpreadsheetUrl(textInputValue, readSpreadsheetCallback, readSpreadsheetErrorCallback);
    }, [readSpreadsheetCallback, readSpreadsheetErrorCallback, textInputValue]);

    const handleTemplateSelected = useCallback(
        (selectedTemplate) => {
            dispatch(setResumeTemplate(selectedTemplate));
        },
        [dispatch]
    );

    return (
        <Layout>
            <SEO title={intl.formatMessage({ id: 'upload_resume_file' })} />
            <Typography color="textPrimary" variant="h4">
                {intl.formatMessage({ id: 'upload_resume_file' })}
            </Typography>
            <div className={classes.pageContent}>
                <Typography color="textPrimary" variant="h6">
                    1 - {intl.formatMessage({ id: 'select_your_template' })}
                </Typography>
                <TemplateSelector className={classes.templateSelector} onSelect={handleTemplateSelected} />
                <Typography color="textPrimary" variant="h6">
                    2 - {intl.formatMessage({ id: 'upload_or_parse_url' })}
                </Typography>
                <DropZone maxLength={1} handleFile={handleFile} disabled={false} />
                <div className={classes.sheetsAndOkWrapper}>
                    <TextField
                        className={classes.googleSpreadsheetInput}
                        label={intl.formatMessage({ id: 'google_sheet_url' })}
                        placeholder={intl.formatMessage({
                            id: 'google_sheet_url_description',
                        })}
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
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                autoHideDuration={12000}
                open={isShowingErrorSnackbar}
                onClose={handleCloseErrorSnackbar}
            >
                <Alert severity="error" onClose={handleCloseErrorSnackbar}>
                    {isShowingErrorSnackbar && intl.formatMessage({ id: errorMessageId })}
                </Alert>
            </Snackbar>
        </Layout>
    );
};

export default UploadPage;
