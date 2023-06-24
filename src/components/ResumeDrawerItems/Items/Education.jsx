import { Fragment, useCallback, memo } from 'react';
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

    const setResumeEducationState = useCallback(
        (education) => {
            dispatch(setResumeEducation(education));
        },
        [dispatch]
    );

    const toggleEducations = useCallback(() => {
        const currentState = educations?.enabled;
        setResumeEducationState({
            ...educations,
            enabled: !currentState,
        });
    }, [educations, setResumeEducationState]);

    const toggleEducation = useCallback(
        (education, index) => () => {
            const newEducation = { ...educations };
            newEducation.value[index] = {
                ...newEducation.value[index],
                enabled: !newEducation.value[index].enabled,
            };
            setResumeEducationState(newEducation);
        },
        [educations, setResumeEducationState]
    );

    const toggleEducationDetail = useCallback(
        (education, index, propName) => () => {
            const newEducation = { ...educations };
            newEducation.value[index] = {
                ...newEducation.value[index],
                value: {
                    ...newEducation.value[index].value,
                    [propName]: {
                        ...newEducation.value[index].value[propName],
                        enabled: !newEducation.value[index].value[propName].enabled,
                    },
                },
            };

            if (newEducation.value[index].enabled) {
                newEducation.value[index].enabled = Object.entries(newEducation.value[index].value).some(
                    (entry) => entry[1].enabled
                );
            }
            setResumeEducationState(newEducation);
        },
        [educations, setResumeEducationState]
    );

    const toggleEducationCourses = useCallback(
        (education, educationIndex, course, courseIndex) => () => {
            const newEducation = { ...educations };
            newEducation.value[educationIndex].value.courses.value[courseIndex] = {
                ...newEducation.value[educationIndex].value.courses.value[courseIndex],
                enabled: !newEducation.value[educationIndex].value.courses.value[courseIndex].enabled,
            };
            setResumeEducationState(newEducation);
        },
        [educations, setResumeEducationState]
    );

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                // TODO varNameToString({ education })
                label="education"
                checked={educations?.enabled}
                onChange={toggleEducations}
            />
            {educations?.enabled && (
                <ul>
                    {educations?.value.map((education, index) => {
                        const { institution, url, area, studyType, startDate, endDate, score, courses } =
                            education?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                {educations?.value && (
                                    <ItemsList
                                        label={institution?.value}
                                        checked={education?.enabled}
                                        onClick={toggleEducation(education, index)}
                                    />
                                )}
                                {education?.enabled && educations?.enabled && (
                                    <ul>
                                        {institution?.value && (
                                            <ItemsList
                                                label={varNameToString({ institution })}
                                                checked={institution?.enabled}
                                                onClick={toggleEducationDetail(
                                                    education,
                                                    index,
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
                                                    index,
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
                                                    index,
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
                                                    index,
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
                                                    index,
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
                                                    index,
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
                                                    index,
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
                                                    index,
                                                    varNameToString({ courses })
                                                )}
                                            />
                                        )}
                                        {courses?.enabled && (
                                            <ul>
                                                {courses?.value.map((course, idx) => (
                                                    <ItemsList
                                                        label={course?.value}
                                                        key={uuid()}
                                                        checked={course?.enabled}
                                                        onClick={toggleEducationCourses(education, index, course, idx)}
                                                    />
                                                ))}
                                            </ul>
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
