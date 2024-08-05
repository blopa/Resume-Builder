import { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, FormHelperText } from '@material-ui/core';
import classNames from 'classnames';
import { useIntl } from 'gatsby-plugin-react-intl';

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        minHeight: '400px',
        margin: '0 auto 35px',
        width: '80%',
    },
    section: {
        marginLeft: '0px',
    },
    arraySection: {
        display: 'block',
        marginTop: '10px',
    },
    groupedFieldWrapper: {
        display: 'inline',
    },
    field: {
        width: '48%',
        marginRight: '2%',
    },
    textArea: {
        width: '98%',
    },
    buttonWrapper: {
        marginTop: '15px',
    },
    removeButton: {
        marginLeft: '10px',
    },
    description: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const DynamicForm = ({ schema, formik, definitions, textAreaNames = [], quantitiesObject = {} }) => {
    const classes = useStyles();
    const intl = useIntl();
    const [quantitiesHashMap, setQuantitiesHashMap] = useState(quantitiesObject);

    const getForm = useCallback(
        (jsonSchema, accKey = '', quantity = 1) =>
            Object.entries(jsonSchema).map(([key, value], index) => {
                let newAccKey = key;
                if (accKey) {
                    newAccKey = `${accKey}-${key}`;
                }

                switch (value.type) {
                    case 'object': {
                        return (
                            <div key={key} className={classes.section}>
                                <h1>{intl.formatMessage({ id: `builder.${key}` })}</h1>
                                {new Array(quantity).fill(null).map((v, i) => (
                                    <div
                                        className={classes.arraySection}
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={i}
                                    >
                                        {getForm(value.properties, `${newAccKey}-${i}`)}
                                    </div>
                                ))}
                            </div>
                        );
                    }

                    case 'array': {
                        const currQuantity = quantitiesHashMap[newAccKey] || 1;
                        return (
                            <div key={key} className={classes.section}>
                                {new Array(quantity).fill(null).map((v, i) => (
                                    <div
                                        className={classes.arraySection}
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={i}
                                    >
                                        {getForm(
                                            {
                                                [key]: value.items,
                                            },
                                            `${newAccKey}-${i}`,
                                            currQuantity
                                        )}
                                    </div>
                                ))}
                                <div className={classes.buttonWrapper}>
                                    <Button
                                        onClick={() => {
                                            setQuantitiesHashMap({
                                                ...quantitiesHashMap,
                                                [newAccKey]: currQuantity + 1,
                                            });
                                        }}
                                        color="primary"
                                        variant="contained"
                                    >
                                        {`+ ${intl.formatMessage({ id: `builder.${key}` })}`}
                                    </Button>
                                    {currQuantity > 1 && (
                                        <Button
                                            onClick={() => {
                                                setQuantitiesHashMap({
                                                    ...quantitiesHashMap,
                                                    [newAccKey]: currQuantity - 1,
                                                });
                                            }}
                                            color="secondary"
                                            variant="contained"
                                            className={classes.removeButton}
                                        >
                                            {`- ${intl.formatMessage({ id: `builder.${key}` })}`}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    }

                    case 'string':
                    default: {
                        if (!key) {
                            return null;
                        }

                        let inputProps = {};
                        // Handle $ref patterns and other inputProps if necessary
                        if (!value.type && value.$ref) {
                            let ref = definitions;
                            value.$ref.split('/').forEach((k) => {
                                if (ref[k]) {
                                    ref = ref[k];
                                }
                            });

                            if (ref.pattern) {
                                inputProps = {
                                    pattern: ref.pattern,
                                };
                            }
                        }

                        return (
                            <div key={key} className={classes.groupedFieldWrapper}>
                                {new Array(quantity).fill(null).map((v, i) => {
                                    const newKey = `${newAccKey}-${i}`;
                                    const isTextArea = textAreaNames.includes(key);
                                    let lines = 4;
                                    if (key === 'coverLetter') {
                                        lines = 15;
                                    }

                                    return (
                                        <div key={newKey}>
                                            <TextField
                                                className={classNames(classes.field, {
                                                    [classes.textArea]: isTextArea,
                                                })}
                                                multiline={isTextArea}
                                                rows={isTextArea ? lines : 1}
                                                rowsMax={10}
                                                fullWidth
                                                id={newKey}
                                                name={newKey}
                                                label={intl.formatMessage({ id: `builder.${key}` })}
                                                value={formik.values[newKey]}
                                                onChange={formik.handleChange}
                                                error={formik.touched[newKey] && Boolean(formik.errors[newKey])}
                                                helperText={formik.touched[newKey] && formik.errors[newKey]}
                                                inputProps={inputProps}
                                            />
                                            {value.description && (
                                                <FormHelperText className={classes.description}>
                                                    {intl.formatMessage({ id: `description.${key}` })}
                                                </FormHelperText>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }
                }
            }),
        [
            classes.section,
            classes.arraySection,
            classes.buttonWrapper,
            classes.removeButton,
            classes.groupedFieldWrapper,
            classes.field,
            classes.textArea,
            classes.description,
            intl,
            quantitiesHashMap,
            definitions,
            textAreaNames,
            formik.values,
            formik.handleChange,
            formik.touched,
            formik.errors,
        ]
    );

    const form = useMemo(
        () =>
            Object.entries(schema).map(([key, value]) => {
                if (!key) {
                    return null;
                }

                return getForm({
                    [key]: value,
                });
            }),
        [getForm, schema]
    );

    return <div className={classes.formWrapper}>{form}</div>;
};

export default DynamicForm;
