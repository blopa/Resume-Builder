import React, { Fragment } from 'react';
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
                {formsData.formValues.map((formValue, index) => {
                    const isArray = formValue.type === 'array';
                    if (isArray) {
                        return (new Array(formValue.quantity || 1)).fill(null).map((v, idx) => (
                            <Fragment
                                // eslint-disable-next-line react/no-array-index-key
                                key={`${formValue.name}_${idx}`}
                            >
                                <TextField
                                    id={`${formValue.name}_${idx}`}
                                    name={`${formValue.name}_${idx}`}
                                    label={`${formValue.label}_${idx}`}
                                    value={`${formValue.value}_${idx}`}
                                    onChange={formValue.handleChange}
                                    error={formValue.error}
                                    helperText={formValue.helperText}
                                />
                                {isArray && (
                                    <p>BLOOOOOOOOOOOPA</p>
                                )}
                            </Fragment>
                        ));
                    }

                    return (
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
                    );
                })}
            </div>
        </div>
    );
};

export default DynamicForm;
