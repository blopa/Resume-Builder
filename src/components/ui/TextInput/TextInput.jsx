import React from 'react';
import TextField from '@material-ui/core/TextField';

// Styles
import style from './text-input.scss';

const TextInput = ({ label, placeholder, disabled, onKeyUp }) => (
    <div className={style['text-input']}>
        <TextField
            label={label}
            placeholder={placeholder}
            margin="normal"
            variant="outlined"
            className={style['text-input--input']}
            disabled={disabled}
            onKeyUp={onKeyUp}
        />
    </div>
);

export default TextInput;
