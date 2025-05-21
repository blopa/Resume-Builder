import { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import { useIntl } from 'gatsby-plugin-react-intl';

const useStyles = makeStyles((theme) => ({
    dropZone: {
        marginTop: '10px',
    },
}));

const DropZone = ({ handleFile, disabled, maxLength }) => {
    const classes = useStyles();
    const intl = useIntl();
    const handleOnChange = useCallback(
        (files) => {
            if (files.length === 0) {
                return;
            }

            if (files.length > maxLength) {
                alert(intl.formatMessage({ id: 'file_limit_exceeded' }));
            } else {
                // do what ever you want
                handleFile(files[0]);
            }
        },
        [handleFile, intl, maxLength] // Added intl to dependency array
    );

    return (
        <div className={classes.dropZone}>
            <DropzoneArea
                showAlerts={false}
                showPreviewsInDropzone={false}
                onChange={handleOnChange}
                filesLimit={maxLength}
                dropzoneText={intl.formatMessage({ id: 'drag_and_drop_or_click' })}
                dropzoneProps={{
                    disabled,
                }}
            />
        </div>
    );
};

export default DropZone;
