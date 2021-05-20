import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField} from '@material-ui/core';

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
                    let addButton;
                    if (formValue.showAddMore) {
                        addButton = (
                            <Button
                                onClick={formValue.onAddMore}
                                color="primary"
                                variant="contained"
                            >
                                +
                            </Button>
                        );
                    }

                    return (
                        <div
                            key={formValue.name}
                        >
                            <TextField
                                id={formValue.name}
                                name={formValue.name}
                                label={formValue.label}
                                value={formValue.value}
                                onChange={formValue.handleChange}
                                error={formValue.error}
                                helperText={formValue.helperText}
                            />
                            {addButton}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DynamicForm;
