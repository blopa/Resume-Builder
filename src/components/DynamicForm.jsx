import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {},
}));

const DynamicForm = ({ formsData }) => {
    const classes = useStyles();

    return (
        <div className={classes.card}>
            <h1>{formsData.key}</h1>
            <div>
                {formsData.formValues.map((formValue) => (
                    <TextField
                        key={formValue.name}
                        id={formValue.name}
                        name={formValue.name}
                        label={formValue.label}
                        value={formValue.value}
                        onChange={formValue.handleChange}
                        error={formValue.error}
                        helperText={formValue.helperText}
                    />
                ))}
            </div>
        </div>
    );
};

export default DynamicForm;
