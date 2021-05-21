import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        margin: '0 auto 35px',
        width: '80%',
    },
}));

const DynamicForm = ({ formsData }) => {
    const classes = useStyles();

    return (
        <div className={classes.formWrapper}>
            <h1>{formsData.key}</h1>
            <div>
                {formsData.formValues.map((formValue, index) => {
                    const { name, showAddMore, onAddMore, group } = formValue;
                    let addButton;
                    if (showAddMore) {
                        addButton = (
                            <Button
                                onClick={onAddMore}
                                color="primary"
                                variant="contained"
                            >
                                +
                            </Button>
                        );
                    }

                    return (
                        <div
                            key={name}
                        >
                            <TextField
                                fullWidth
                                id={name}
                                name={name}
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
