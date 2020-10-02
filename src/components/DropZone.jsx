import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    dropZone: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: '2px',
        borderRadius: '2px',
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
        margin: '0 5%',
        height: '150px',
    },
    dropZoneActive: {
        borderColor: '#2196f3',
    },
}));

const DropZone = ({
    handleFile,
    disabled,
    maxLength,
}) => {
    const classes = useStyles();
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
        <DropzoneArea
            showAlerts={false}
            showPreviewsInDropzone={false}
            onChange={handleOnChange}
            filesLimit={maxLength}
            dropzoneProps={{
                disabled,
            }}
        />
    );
};

export default DropZone;
