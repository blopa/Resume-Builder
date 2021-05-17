/* eslint template-curly-spacing: 0, indent: 0 */
import React, { useState, Fragment, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-intl';
import { useFormik } from 'formik';
import { Slide, TextField, Button } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

// Components
import SEO from '../components/SEO';
import Layout from '../components/Layout';

// Hooks
import { useSelector } from '../store/StoreProvider';

// Utils

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
    const toggleableJsonResume = useSelector(selectToggleableJsonResume);
    const resumeTemplateName = useSelector(selectResumeTemplate);

    const formik = useFormik({
        initialValues: {},
        validationSchema: () => {
            // TODO
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const [formValues, setFormValues] = useState([
        { name: 'name', show: true },
        { name: 'email', show: false },
        { name: 'website', show: false },
    ]);

    // this is not working
    const setShowForm = useCallback(() => {
        const index = formValues.findIndex((data) => data.show === true);

        formValues[index] = {
            ...formValues[index],
            show: false,
        };
        formValues[index + 1] = {
            ...formValues[index + 1],
            show: true,
        };
        setFormValues(formValues);
    }, [setFormValues, formValues]);

    return (
        <Layout>
            <SEO
                title={intl.formatMessage({ id: 'build_resume' })}
                robots="noindex, nofollow"
            />
            <Button
                onClick={setShowForm}
                color="primary"
                variant="contained"
            >
                Clicky
            </Button>
            {formValues.map((formValue) => {
                console.log(formValue);

                return (
                    <Fragment
                        key={uuid()}
                    >
                        <Slide
                            direction="right"
                            in={formValue.show}
                        >
                            <div>
                                <TextField
                                    id={formValue.name}
                                    name={formValue.name}
                                    label={formValue.name}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched[formValue.name] && Boolean(formik.errors[formValue.name])}
                                    helperText={formik.touched[formValue.name] && formik.errors[formValue.name]}
                                />
                            </div>
                        </Slide>
                    </Fragment>
                );
            })}
        </Layout>
    );
};

export default BuildPage;
