import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        margin: '0 auto 35px',
        width: '80%',
    },
}));

const DynamicForm = ({
    schema,
    formik,
    definitions,
    textAreaNames = [],
}) => {
    const classes = useStyles();
    const [quantitiesObject, setQuantitiesObject] = useState({});

    const getForm = useCallback((jsonSchema, accKey, quantity = 1) =>
        Object.entries(jsonSchema).map(([key, value], index) => {
            const newAccKey = `${accKey}.${key}`;

            switch (value.type) {
                case 'object': {
                    return (
                        <div key={key}>
                            <h1>{key}</h1>
                            {(new Array(quantity).fill(null).map(
                                (v, i) => getForm(value.properties, newAccKey)
                            ))}
                        </div>
                    );
                }

                case 'array': {
                    const currQuantity = quantitiesObject[newAccKey] || 1;
                    return (
                        <div key={key}>
                            {(new Array(quantity).fill(null).map((v, i) => getForm({
                                [key]: value.items,
                            }, newAccKey, currQuantity)))}
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
                            {(new Array(quantity).fill(null).map(
                                (v, i) => {
                                    const newKey = `${key}.${i}`;
                                    const isTextArea = textAreaNames.includes(key);

                                    return (
                                        <TextField
                                            key={newKey}
                                            multiline={isTextArea}
                                            rows={isTextArea ? 3 : 1}
                                            rowsMax={10}
                                            fullWidth
                                            id={newKey}
                                            name={newKey}
                                            label={key}
                                            value={formik.values[newKey]}
                                            onChange={formik.handleChange}
                                            error={formik.touched[newKey] && Boolean(formik.errors[newKey])}
                                            helperText={formik.touched[newKey] && formik.errors[newKey]}
                                        />
                                    );
                                }
                            ))}
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
