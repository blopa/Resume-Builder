import React from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';

// Styles
import style from './drop-zone.scss';

const DropZone = ({ handleFile, disabled, maxLength }) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: (files) => {
            if (files.length === 0) {
                return null;
            } else if (files.length > maxLength) {
                // TODO
            } else {
                // do what ever you want
                handleFile(files[0]);
            }

        },
        disabled,
        multiple: false,
    });

    return (
        <div {...getRootProps({
            className: classNames(style['drop-zone'], {
                [style['drop-zone--active']]: !disabled && acceptedFiles.length < 1,
            }),
        })}
        >
            <input {...getInputProps()} />
            <p>Drag 'n' drop your .json or .xls file here.</p>
        </div>
    );
};

export default DropZone;
