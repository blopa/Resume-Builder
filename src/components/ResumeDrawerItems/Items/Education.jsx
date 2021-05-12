import React, { Fragment, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumeEducation from '../../../store/actions/setResumeEducation';

// Utils
import { varNameToString } from '../../../utils/utils';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Education({ education: educations }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const setResumeEducationState = useCallback((education) => {
        dispatch(setResumeEducation(education));
    }, [dispatch]);

    const toggleEducations = useCallback(() => {
        const currentState = educations?.enabled;
        setResumeEducationState({
            ...educations,
            enabled: !currentState,
        });
    }, [educations, setResumeEducationState]);

    const toggleEducation = useCallback((education) => () => {
        const newEducation = { ...educations };
        newEducation.value =
            newEducation?.value.map((edu) => {
                if (JSON.stringify(edu?.value) === JSON.stringify(education?.value)) {
                    return {
                        ...edu,
                        enabled: !edu?.enabled,
                    };
                }
                return edu;
            });
        setResumeEducationState(newEducation);
    }, [educations, setResumeEducationState]);

    const toggleEducationDetail = useCallback((education, propName) => () => {
        const newEducation = { ...educations };
        newEducation.value =
            newEducation?.value.map((edu) => {
                if (JSON.stringify(edu?.value) === JSON.stringify(education?.value)) {
                    return {
                        ...edu,
                        value: {
                            ...edu?.value,
                            [propName]: {
                                ...edu?.value[propName],
                                enabled: !edu?.value[propName]?.enabled,
                            },
                        },
                    };
                }
                return edu;
            });
        setResumeEducationState(newEducation);
    }, [educations, setResumeEducationState]);

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="education"
                checked={educations?.enabled}
                onChange={toggleEducations}
            />
            {educations?.enabled && (
                <ul>
                    {educations?.value.map((education) => {
                        const {
                            institution,
                            url,
                            area,
                            studyType,
                            startDate,
                            endDate,
                            score,
                            courses,
                        } = education?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                {educations?.value && (
                                    <ItemsList
                                        label={institution?.value}
                                        checked={education?.enabled}
                                        onClick={toggleEducation(
                                            education
                                        )}
                                    />
                                )}
                                {(education?.enabled && educations?.enabled) && (
                                    <ul>
                                        {institution?.value && (
                                            <ItemsList
                                                label={varNameToString({ institution })}
                                                checked={institution?.enabled}
                                                onClick={toggleEducationDetail(
                                                    education,
                                                    varNameToString({ institution })
                                                )}
                                            />
                                        )}
                                        {url && (
                                            <ItemsList
                                                label={varNameToString({ url })}
                                                checked={url?.enabled}
                                                onClick={toggleEducationDetail(
                                                    education,
                                                    varNameToString({ url })
                                                )}
                                            />
                                        )}
                                        {area && (
                                            <ItemsList
                                                label={varNameToString({ area })}
                                                checked={area?.enabled}
                                                onClick={toggleEducationDetail(
                                                    education,
                                                    varNameToString({ area })
                                                )}
                                            />
                                        )}
                                        {studyType && (
                                            <ItemsList
                                                label={varNameToString({ studyType })}
                                                checked={studyType?.enabled}
                                                onClick={toggleEducationDetail(
                                                    education,
                                                    varNameToString({ studyType })
                                                )}
                                            />
                                        )}
                                        {startDate && (
                                            <ItemsList
                                                label={varNameToString({ startDate })}
                                                checked={startDate?.enabled}
                                                onClick={toggleEducationDetail(
                                                    education,
                                                    varNameToString({ startDate })
                                                )}
                                            />
                                        )}
                                        {endDate && (
                                            <ItemsList
                                                label={varNameToString({ endDate })}
                                                checked={endDate?.enabled}
                                                onClick={toggleEducationDetail(
                                                    education,
                                                    varNameToString({ endDate })
                                                )}
                                            />
                                        )}
                                        {score && (
                                            <ItemsList
                                                label={varNameToString({ score })}
                                                checked={score?.enabled}
                                                onClick={toggleEducationDetail(
                                                    education,
                                                    varNameToString({ score })
                                                )}
                                            />
                                        )}
                                        {courses && (
                                            <ItemsList
                                                label={varNameToString({ courses })}
                                                checked={courses?.enabled}
                                                onClick={toggleEducationDetail(
                                                    education,
                                                    varNameToString({ courses })
                                                )}
                                            />
                                        )}
                                    </ul>
                                )}
                            </Fragment>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default memo(Education);
