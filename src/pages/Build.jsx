import React, {useCallback, useContext, useMemo, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Slide } from '@material-ui/core';
import { useIntl } from 'gatsby-plugin-intl';
import { useFormik } from 'formik';

// JSON schema
import schema from '../../schema.json';

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

    const splittedSchema = useMemo(() => {
        const schemaArray = [];
        const propertiesToSkip = ['$schema', 'meta'];
        Object.entries(schema.properties)
            .forEach(([key, value]) => {
                if (propertiesToSkip.includes(key)) {
                    return;
                }

                schemaArray.push({
                    [key]: value,
                });
            });

        return schemaArray;
    }, []);

    const [index, setIndex] = useState(0);
    const [formsData, setFormsData] = useState({});
    const [formikData, setFormikData] = useState(splittedSchema);

    const toggleableJsonResume = useSelector(selectToggleableJsonResume);
    const resumeTemplateName = useSelector(selectResumeTemplate);

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

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

    const handleOnAddFields = useCallback(() => {
        // TODO
    }, []);

    const handleOnRemoveFields = useCallback(() => {
        // TODO
    }, []);

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
                    <DynamicForm
                        schema={formikData[index]}
                        formik={formik}
                        onAddFields={handleOnAddFields}
                        onRemoveFields={handleOnRemoveFields}
                    />
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
