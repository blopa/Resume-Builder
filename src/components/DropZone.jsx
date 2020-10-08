import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import classNames from 'classnames';
import { useIntl } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    dropZone: {
        marginTop: '10px',
    },
}));

const DropZone = ({
    handleFile,
    disabled,
    maxLength,
}) => {
    const classes = useStyles();
    const intl = useIntl();
    const handleOnChange = useCallback((files) => {
        if (files.length === 0) {
            return;
        }

        if (files.length > maxLength) {
            // TODO
        } else {
            // do what ever you want
            handleFile(files[0]);
        }
    }, [handleFile, maxLength]);

    return (
        <div
            className={classes.dropZone}
        >
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
