import { Fragment, useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Slide } from '@material-ui/core';
import { navigate, useIntl } from 'gatsby-plugin-react-intl';
import { useFormik } from 'formik';
import { cloneDeep } from 'lodash';

// JSON schema
import schema from '../../schema.json';

// Components
import DynamicForm from '../components/DynamicForm';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

// Hooks
import { useDispatch } from '../store/StoreProvider';

// Utils
import { downloadJson } from '../utils/json-parser';
import { convertToToggleableObject, generateCoverLetterObject } from '../utils/utils';

// Actions
import setToggleableJsonResume from '../store/actions/setToggleableJsonResume';

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
    previousButton: {
        marginRight: '10px',
    },
    downloadJson: {
        marginRight: '10px',
    },
}));

const convertFormikToJsonArray = (formikValues, stringStart, arrayKeys = []) =>
    Object.entries(formikValues)
        .filter(([k, v]) => k.startsWith(stringStart))
        .reduce((acc, [k, v]) => {
            let value = v;
            const key = k.split('-')[4];
            const idx = parseInt(k.split('-')[3], 10);
            const newAcc = [...acc];
            if (arrayKeys.includes(key)) {
                // const arrayIndex = parseInt(k.split('-')[7], 10);
                value = [...(newAcc?.[idx]?.[key] || []), value];
            }

            if (newAcc.length >= idx + 1) {
                newAcc[idx] = {
                    ...newAcc[idx],
                    [key]: value,
                };
            } else {
                newAcc.push({ [key]: value });
            }

            return newAcc;
        }, []);

const BuildPage = ({ params, uri, location }) => {
    const intl = useIntl();
    const classes = useStyles();
    const dispatch = useDispatch();

    const splittedSchema = useMemo(() => {
        const schemaArray = [];
        const propertiesToSkip = ['$schema', 'meta'];
        Object.entries(schema.properties).forEach(([key, value]) => {
            if (propertiesToSkip.includes(key)) {
                return;
            }

            schemaArray.push({
                [key]: value,
            });
        });

        return schemaArray;
    }, []);

    const paramFormValues = useMemo(() => Object.fromEntries(new URLSearchParams(location.search)), [location.search]);

    const currentIndex = useMemo(() => {
        const key = params['*'] || '';
        const foundIndex = splittedSchema.findIndex((value) =>
            Object.keys(value)
                .map((k) => k.toLowerCase())
                .includes(key.toLowerCase())
        );

        return Math.max(foundIndex, 0);
    }, [params, splittedSchema]);

    const [index, setIndex] = useState(currentIndex);

    const formik = useFormik({
        initialValues: {
            ...paramFormValues,
        },
        onSubmit: (values) => {
            // TODO
        },
        validate: (values, props) => {
            // TODO
        },
    });

    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState('down');

    const onArrowClick = useCallback(
        (direction) => {
            const formsLength = splittedSchema.length;
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
        },
        [splittedSchema.length, index]
    );

    const getResumeJsonFromFormik = useCallback(() => {
        const arrayKeys = ['highlights', 'keywords', 'courses', 'roles'];

        return {
            basics: {
                ...Object.entries(formik.values)
                    .filter(([k, v]) => k.startsWith('basics-0-'))
                    .reduce((acc, [k, v]) => {
                        const key = k.split('-')[2];
                        return {
                            ...acc,
                            [key]: v,
                        };
                    }, {}),
                location: Object.entries(formik.values)
                    .filter(([k, v]) => k.startsWith('basics-0-location'))
                    .reduce((acc, [k, v]) => {
                        const key = k.split('-')[4];
                        return {
                            ...acc,
                            [key]: v,
                        };
                    }, {}),
                profiles: Object.entries(formik.values)
                    .filter(([k, v]) => k.startsWith('basics-0-profiles'))
                    .reduce((acc, [k, v]) => {
                        const key = k.split('-')[6];
                        const idx = parseInt(k.split('-')[5], 10);
                        const newAcc = [...acc];
                        if (newAcc.length >= idx + 1) {
                            newAcc[idx] = {
                                ...newAcc[idx],
                                [key]: v,
                            };
                        } else {
                            newAcc.push({ [key]: v });
                        }

                        return newAcc;
                    }, []),
            },
            work: convertFormikToJsonArray(formik.values, 'work-', arrayKeys),
            volunteer: convertFormikToJsonArray(formik.values, 'volunteer-', arrayKeys),
            education: convertFormikToJsonArray(formik.values, 'education-', arrayKeys),
            awards: convertFormikToJsonArray(formik.values, 'awards-', arrayKeys),
            publications: convertFormikToJsonArray(formik.values, 'publications-', arrayKeys),
            skills: convertFormikToJsonArray(formik.values, 'skills-', arrayKeys),
            languages: convertFormikToJsonArray(formik.values, 'languages-', arrayKeys),
            interests: convertFormikToJsonArray(formik.values, 'interests-', arrayKeys),
            references: convertFormikToJsonArray(formik.values, 'references-', arrayKeys),
            projects: convertFormikToJsonArray(formik.values, 'projects-', arrayKeys),
            certificates: convertFormikToJsonArray(formik.values, 'certificates-', arrayKeys),
            coverLetter: formik.values['coverLetter-0'] || '',
            llmPrompt: formik.values['llmPrompt-0'] || '',
        };
    }, [formik.values]);

    const handleClickDownload = useCallback(() => {
        const resume = getResumeJsonFromFormik();
        downloadJson(resume);
    }, [getResumeJsonFromFormik]);

    const setResumesAndForward = useCallback(
        (toggleableJsonResume) => {
            dispatch(setToggleableJsonResume(toggleableJsonResume));
            navigate('/resume');
        },
        [dispatch]
    );

    const handleClickBuild = useCallback(() => {
        const resume = getResumeJsonFromFormik();
        setResumesAndForward({
            ...convertToToggleableObject(cloneDeep(resume)),
            coverLetter: generateCoverLetterObject(resume.coverLetter),
        });
    }, [getResumeJsonFromFormik, setResumesAndForward]);

    return (
        <Layout>
            <SEO title={intl.formatMessage({ id: 'build_resume' })} robots="noindex, nofollow" />
            <Slide in={slideIn} direction={slideDirection}>
                <div>
                    <DynamicForm
                        schema={splittedSchema[index]}
                        formik={formik}
                        definitions={schema.definitions}
                        textAreaNames={['summary', 'description', 'coverLetter']}
                    />
                </div>
            </Slide>
            <div className={classes.buttonsWrapper}>
                {index > 0 && (
                    <Button
                        className={classes.previousButton}
                        onClick={() => onArrowClick('left')}
                        color="primary"
                        variant="contained"
                    >
                        {intl.formatMessage({ id: 'builder.previous' })}
                    </Button>
                )}
                {index !== splittedSchema.length - 1 && (
                    <Button onClick={() => onArrowClick('right')} color="primary" variant="contained">
                        {intl.formatMessage({ id: 'builder.next' })}
                    </Button>
                )}
                {index === splittedSchema.length - 1 && (
                    <Fragment>
                        <Button
                            className={classes.downloadJson}
                            onClick={handleClickDownload}
                            color="primary"
                            variant="contained"
                        >
                            {intl.formatMessage({ id: 'download_json' })}
                        </Button>
                        <Button onClick={handleClickBuild} color="primary" variant="contained">
                            {intl.formatMessage({ id: 'build_resume' })}
                        </Button>
                    </Fragment>
                )}
            </div>
        </Layout>
    );
};

export default BuildPage;
