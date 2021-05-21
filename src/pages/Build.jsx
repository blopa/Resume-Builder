import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Slide } from '@material-ui/core';
import { useIntl } from 'gatsby-plugin-intl';
import { useFormik } from 'formik';

// Components
import DynamicForm from '../components/DynamicForm';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

// Hooks
import { useSelector } from '../store/StoreProvider';

// Selector
import { selectResumeTemplate, selectToggleableJsonResume } from '../store/selectors';

const useStyles = makeStyles((theme) => ({
    resumeWrapper: {
        margin: '10px 0',
    },
    drawerWrapper: {
        '& .MuiPaper-root': {
            zIndex: 1000,
        },
    },
    buttonsWrapper: {
        textAlign: 'right',
    },
}));

const BuildPage = () => {
    const intl = useIntl();
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const [formsData, setFormsData] = useState({
        basics: [{
            name: 'name',
            label: 'name',
        }, {
            name: 'label',
            label: 'label',
        }, {
            name: 'image',
            label: 'image',
        }, {
            name: 'email',
            label: 'email',
        }, {
            name: 'phone',
            label: 'phone',
        }, {
            name: 'url',
            label: 'url',
        }, {
            name: 'summary',
            label: 'summary',
        }],
        location: [{
            name: 'address',
            label: 'address',
        }, {
            name: 'postalCode',
            label: 'postalCode',
        }, {
            name: 'city',
            label: 'city',
        }, {
            name: 'countryCode',
            label: 'countryCode',
        }, {
            name: 'region',
            label: 'region',
        }],
        profiles: [{
            name: 'profiles',
            isGroup: true,
            quantity: 1,
            forms: [{
                name: 'network',
                label: 'network',
            }, {
                name: 'username',
                label: 'username',
            }, {
                name: 'url',
                label: 'url',
            }],
        }],
        work: [{
            name: 'work',
            isGroup: true,
            quantity: 1,
            forms: [{
                name: 'name',
                label: 'name',
            }, {
                name: 'location',
                label: 'location',
            }, {
                name: 'description',
                label: 'description',
            }, {
                name: 'position',
                label: 'position',
            }, {
                name: 'startDate',
                label: 'startDate',
            }, {
                name: 'endDate',
                label: 'endDate',
            }, {
                name: 'summary',
                label: 'summary',
            }, {
                name: 'highlights',
                label: 'highlights',
                quantity: 1,
            }, {
                name: 'keywords',
                label: 'keywords',
                quantity: 1,
            }, {
                name: 'url',
                label: 'url',
            }],
        }],
    });

    const toggleableJsonResume = useSelector(selectToggleableJsonResume);
    const resumeTemplateName = useSelector(selectResumeTemplate);

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const addExtraField = useCallback((key, name, group = null, add = true) => () => {
        let toAdd = 1;
        if (!add) {
            toAdd = -1;
        }

        if (formsData[key]?.length) {
            setFormsData({
                ...formsData,
                [key]: [
                    ...formsData[key].map((data) => {
                        if (data.name === group && data.isGroup) {
                            return {
                                ...data,
                                forms: data.forms.map((data2) => {
                                    if (data2.name === name) {
                                        return {
                                            ...data2,
                                            quantity: data2.quantity + toAdd,
                                        };
                                    }

                                    return data2;
                                }),
                            };
                        }

                        if (data.name === name) {
                            return {
                                ...data,
                                quantity: data.quantity + toAdd,
                            };
                        }

                        return data;
                    }),
                ],
            });
        }
    }, [formsData, setFormsData]);

    const removeExtraField = useCallback(
        (key, name, group = null) => addExtraField(key, name, group, false),
        [addExtraField]
    );

    const getFormikData = useCallback((key, data) => {
        const formValues = [];
        data.forEach((formData) => {
            const { name, quantity, isGroup } = formData;

            if (quantity) {
                (new Array(quantity))
                    .fill(null)
                    .forEach((v, idx) => {
                        const number = idx + 1;
                        const newName = `${name}_${number}`;
                        let extraData = {};
                        if (quantity === number) {
                            extraData = {
                                showAddMore: true,
                                onAddMore: addExtraField(key, name),
                            };

                            if (quantity > 1) {
                                extraData = {
                                    ...extraData,
                                    onRemove: removeExtraField(key, name),
                                };
                            }
                        }

                        if (isGroup) {
                            formData.forms.forEach((form, formIdx) => {
                                const qty = form.quantity;
                                const newGroupedFormName = `${form.name}_${number}`;
                                let groupedExtraData = {};
                                if (formData.forms.length === formIdx + 1) {
                                    groupedExtraData = extraData;
                                }

                                if (qty) {
                                    (new Array(qty))
                                        .fill(null)
                                        .forEach((v2, formIdx2) => {
                                            const newFormName = `${newGroupedFormName}_${formIdx2 + 1}`;
                                            let groupedExtraData2 = {};
                                            if (qty === formIdx2 + 1) {
                                                groupedExtraData2 = {
                                                    showAddMore: true,
                                                    onAddMore: addExtraField(key, form.name, name),
                                                };

                                                if (qty > 1) {
                                                    groupedExtraData2 = {
                                                        ...groupedExtraData2,
                                                        onRemove: removeExtraField(key, form.name, name),
                                                    };
                                                }
                                            }

                                            formValues.push({
                                                group: name,
                                                name: newFormName,
                                                quantity: qty,
                                                label: `${form.label} ${number}-${formIdx2 + 1}`,
                                                value: formik.values[newFormName],
                                                handleChange: formik.handleChange,
                                                error: formik.touched[newFormName]
                                                    && Boolean(formik.errors[newFormName]),
                                                helperText: formik.touched[newFormName]
                                                    && formik.errors[newFormName],
                                                ...groupedExtraData2,
                                            });
                                        });
                                } else {
                                    formValues.push({
                                        group: name,
                                        name: newGroupedFormName,
                                        quantity: qty,
                                        label: `${form.label} ${number}`,
                                        value: formik.values[newGroupedFormName],
                                        handleChange: formik.handleChange,
                                        error: formik.touched[newGroupedFormName]
                                            && Boolean(formik.errors[newGroupedFormName]),
                                        helperText: formik.touched[newGroupedFormName]
                                            && formik.errors[newGroupedFormName],
                                        ...groupedExtraData,
                                    });
                                }
                            });
                        } else {
                            formValues.push({
                                name: newName,
                                quantity,
                                label: `${formData.label} ${number}`,
                                value: formik.values[newName],
                                handleChange: formik.handleChange,
                                error: formik.touched[newName] && Boolean(formik.errors[newName]),
                                helperText: formik.touched[newName] && formik.errors[newName],
                                ...extraData,
                            });
                        }
                    });
            } else {
                formValues.push({
                    name,
                    quantity,
                    label: formData.label,
                    value: formik.values[name],
                    handleChange: formik.handleChange,
                    error: formik.touched[name] && Boolean(formik.errors[name]),
                    helperText: formik.touched[name] && formik.errors[name],
                });
            }
        });

        return {
            key,
            formValues,
        };
    }, [addExtraField, formik.errors, formik.handleChange, formik.touched, formik.values, removeExtraField]);

    const formikData = useMemo(
        () => Object.entries(formsData).map(
            ([key, value]) => getFormikData(key, value)
        ),
        [formsData, getFormikData]
    );

    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('down');

    const onArrowClick = useCallback((direction) => {
        const formsLength = formikData.length;
        const increment = direction === 'left' ? -1 : 1;
        const newIndex = (index + increment + formsLength) % formsLength;

        const oppDirection = direction === 'left' ? 'right' : 'left';
        setSlideDirection(direction);
        setSlideIn(false);

        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 500);
    }, [formikData.length, index]);

    return (
        <Layout>
            <SEO
                title={intl.formatMessage({ id: 'build_resume' })}
                robots="noindex, nofollow"
            />
            <Slide
                in={slideIn}
                direction={slideDirection}
            >
                <div>
                    <DynamicForm formsData={formikData[index]} />
                </div>
            </Slide>
            <div className={classes.buttonsWrapper}>
                {index > 0 && (
                    <Button
                        onClick={() => onArrowClick('left')}
                        color="primary"
                        variant="contained"
                    >
                        Previous
                    </Button>
                )}
                {(index !== formikData.length - 1) && (
                    <Button
                        onClick={() => onArrowClick('right')}
                        color="primary"
                        variant="contained"
                    >
                        Next
                    </Button>
                )}
            </div>
        </Layout>
    );
};

export default BuildPage;
