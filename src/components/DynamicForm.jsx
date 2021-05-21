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
    const groupsToSkip = [];

    const fields = [];
    formsData.formValues.forEach((formValue, index) => {
        const { name, showAddMore, onAddMore, group } = formValue;
        if (groupsToSkip.includes(group)) {
            return;
        }

        if (group) {
            groupsToSkip.push(group);
            fields.push(
                <div key={group}>
                    <h2>{group}</h2>
                    {formsData.formValues
                        .filter((groupedFormValue) => groupedFormValue.group === group)
                        .map((groupedFormValue) => (
                            <div key={groupedFormValue.name}>
                                <TextField
                                    fullWidth
                                    id={groupedFormValue.name}
                                    name={groupedFormValue.name}
                                    label={groupedFormValue.label}
                                    value={groupedFormValue.value}
                                    onChange={groupedFormValue.handleChange}
                                    error={groupedFormValue.error}
                                    helperText={groupedFormValue.helperText}
                                />
                                {groupedFormValue.showAddMore && (
                                    <Button
                                        onClick={groupedFormValue.onAddMore}
                                        color="primary"
                                        variant="contained"
                                    >
                                        +
                                    </Button>
                                )}
                            </div>
                        ))}
                </div>
            );

            return;
        }

        fields.push(
            <div key={name}>
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
                {showAddMore && (
                    <Button
                        onClick={onAddMore}
                        color="primary"
                        variant="contained"
                    >
                        +
                    </Button>
                )}
            </div>
        );
    });

    return (
        <div className={classes.formWrapper}>
            <h1>{formsData.key}</h1>
            <div>{fields}</div>
        </div>
    );
};

export default DynamicForm;
