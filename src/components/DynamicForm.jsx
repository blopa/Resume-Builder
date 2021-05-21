import React, { useCallback, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        margin: '0 auto 35px',
        width: '80%',
    },
}));

const DynamicForm = ({ schema, formik }) => {
    const classes = useStyles();

    const getForm = useCallback((jsonSchema) => {
        return Object.entries(jsonSchema).map(([key, value], index) => {
            switch (value.type) {
                case 'object': {
                    return (
                        <div key={key}>
                            <h1>{key}</h1>
                            {getForm(value.properties)}
                        </div>
                    );
                }

                case 'array': {
                    return (
                        <div key={key}>
                            <h1>{key}</h1>
                            {getForm({
                                [key]: value.items,
                            })}
                        </div>
                    );
                }

                case 'string':
                default: {
                    if (!key) {
                        return null;
                    }

                    return (
                        <div key={key}>
                            <TextField
                                fullWidth
                                id={key}
                                name={key}
                                label={key}
                                value={formik.values[key]}
                                onChange={formik.handleChange}
                                error={formik.touched[key] && Boolean(formik.errors[key])}
                                helperText={formik.touched[key] && formik.errors[key]}
                            />
                        </div>
                    );
                }
            }
        });
    }, [formik.errors, formik.handleChange, formik.touched, formik.values]);

    const form = useMemo(
        () => Object.entries(schema)
            .map(([key, value]) => {
                if (!key) {
                    return null;
                }

                return getForm({
                    [key]: value,
                });
            }),
        [getForm, schema]
    );

    return (
        <div className={classes.formWrapper}>
            {form}
            <pre>
                {JSON.stringify(schema, undefined, 2)}
            </pre>
        </div>
    );
};

export default DynamicForm;
