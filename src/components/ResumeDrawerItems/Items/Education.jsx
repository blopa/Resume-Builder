import React, { Fragment, useContext, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';

// Components
import { makeStyles } from '@material-ui/styles';
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import style from '../resumeDrawerStyles';
import setResumeEducation from '../../../store/actions/setResumeEducation';
import { varNameToString } from '../../../utils/utils';
import { StoreContext } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Education({ education: educations }) {
    const classes = useStyles();
    const { state, dispatch } = useContext(StoreContext);

    const setResumeEducationState = useCallback((education) => {
        dispatch(setResumeEducation(education));
    }, []);

    const toggleEducations = () => {
        const currentState = educations?.enabled;
        setResumeEducationState({
            ...educations,
            enabled: !currentState,
        });
    };

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
                            area,
                            studyType,
                            startDate,
                            endDate,
                            gpa,
                            courses,
                        } = education?.value || {};
                        return (
                            <Fragment key={uuid()}>
                                {educations && (
                                    <ItemsList
                                        label={institution?.value}
                                        checked={education?.enabled}
                                        onClick={toggleEducation(
                                            education
                                        )}
                                    />
                                )}
                                {educations?.enabled && (
                                    <ul>
                                        {institution && (
                                            <ItemsList
                                                label={varNameToString({ institution })}
                                                checked={institution?.enabled}
                                                onClick={toggleEducationDetail(
                                                    education,
                                                    varNameToString({ institution })
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
                                        {gpa && (
                                            <ItemsList
                                                label={varNameToString({ gpa })}
                                                checked={gpa?.enabled}
                                                onClick={toggleEducationDetail(
                                                    education,
                                                    varNameToString({ gpa })
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
