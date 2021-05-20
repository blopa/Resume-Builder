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
}));

const BuildPage = () => {
    const intl = useIntl();
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const [formsData, setFormsData] = useState({
        basics: [{
            name: 'name',
            label: 'Name',
            type: 'string',
        }, {
            name: 'email',
            label: 'Email',
            type: 'string',
        }, {
            name: 'phone',
            label: 'Phone',
            type: 'string',
        }],
        company: [{
            name: 'company',
            label: 'Company',
            type: 'string',
        }, {
            name: 'address',
            label: 'Address',
            type: 'array',
            quantity: 3,
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

    const addExtraField = useCallback((key, name) => () => {
        if (formsData[key]?.length) {
            setFormsData({
                ...formsData,
                [key]: [
                    ...formsData[key].map((data) => {
                        if (data.name === name) {
                            return {
                                ...data,
                                quantity: data.quantity + 1,
                            };
                        }

                        return data;
                    }),
                ],
            });
        }
    }, [formsData, setFormsData]);

    const getFormikData = useCallback((key, data) => {
        const formValues = [];
        data.forEach((formData) => {
            const { name, type, quantity } = formData;
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
                        }

                        formValues.push({
                            name: newName,
                            type,
                            quantity,
                            label: `${formData.label} ${number}`,
                            value: formik.values[newName],
                            handleChange: formik.handleChange,
                            error: formik.touched[newName] && Boolean(formik.errors[newName]),
                            helperText: formik.touched[newName] && formik.errors[newName],
                            ...extraData,
                        });
                    });
            } else {
                formValues.push({
                    name,
                    type,
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
    }, [
        addExtraField,
        formik.errors,
        formik.handleChange,
        formik.touched,
        formik.values,
    ]);

    const formikData = useMemo(
        () => Object.entries(formsData).map(
            ([key, value]) => getFormikData(key, value)
        ),
        [formsData, getFormikData]
    );

    const numSlides = formikData.length;

    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('down');

    const onArrowClick = (direction) => {
        const increment = direction === 'left' ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;

        const oppDirection = direction === 'left' ? 'right' : 'left';
        setSlideDirection(direction);
        setSlideIn(false);

        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 500);
    };

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
            <Button
                onClick={() => onArrowClick('right')}
                color="primary"
                variant="contained"
            >
                Next
            </Button>
            <Button
                onClick={() => onArrowClick('left')}
                color="primary"
                variant="contained"
            >
                Previous
            </Button>
            <Button
                onClick={() => console.log(formik.values)}
                color="primary"
                variant="contained"
            >
                debug
            </Button>
        </Layout>
    );
};

export default BuildPage;
