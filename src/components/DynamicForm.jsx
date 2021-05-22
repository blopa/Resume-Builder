import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        margin: '0 auto 35px',
        width: '80%',
    },
}));

const DynamicForm = ({ schema, formik }) => {
    const classes = useStyles();
    const [quantitiesObject, setQuantitiesObject] = useState({});

    const getForm = useCallback((jsonSchema, accKey) => Object.entries(jsonSchema).map(([key, value], index) => {
        const newAccKey = `${accKey}.${key}`;

        switch (value.type) {
            case 'object': {
                return (
                    <div key={key}>
                        <h1>{key}</h1>
                        {getForm(value.properties, newAccKey)}
                    </div>
                );
            }

            case 'array': {
                const currQuantity = quantitiesObject[newAccKey] || 1;
                return (
                    <div key={key}>
                        {(new Array(currQuantity).fill(null).map((v, i) => getForm({
                            [key]: value.items,
                        }, newAccKey)))}
                        <Button
                            onClick={() => {
                                setQuantitiesObject({
                                    ...quantitiesObject,
                                    [newAccKey]: currQuantity + 1,
                                });
                            }}
                            color="primary"
                            variant="contained"
                        >
                            +
                        </Button>
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
    }), [formik.errors, formik.handleChange, formik.touched, formik.values, quantitiesObject]);

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
