import { Fragment, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import style from '../resumeDrawerStyles';
import setResumeSkills from '../../../store/actions/setResumeSkills';
import { varNameToString } from '../../../utils/utils';
import { useDispatch } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Skills({ skills }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const setResumeSkillsState = useCallback(
        (newSkills) => {
            dispatch(setResumeSkills(newSkills));
        },
        [dispatch]
    );

    const toggleSkills = useCallback(() => {
        const currentState = skills?.enabled;
        setResumeSkillsState({
            ...skills,
            enabled: !currentState,
        });
    }, [setResumeSkillsState, skills]);

    const toggleSkill = useCallback(
        (skill, index) => () => {
            const newSkills = { ...skills };
            newSkills.value[index] = {
                ...newSkills.value[index],
                enabled: !newSkills.value[index].enabled,
            };
            setResumeSkillsState(newSkills);
        },
        [setResumeSkillsState, skills]
    );

    const toggleSkillsDetail = useCallback(
        (skill, index, propName) => () => {
            const newSkills = { ...skills };
            newSkills.value[index] = {
                ...newSkills.value[index],
                value: {
                    ...newSkills.value[index].value,
                    [propName]: {
                        ...newSkills.value[index].value[propName],
                        enabled: !newSkills.value[index].value[propName].enabled,
                    },
                },
            };

            if (newSkills.value[index].enabled) {
                newSkills.value[index].enabled = Object.entries(newSkills.value[index].value).some(
                    (entry) => entry[1].enabled
                );
            }
            setResumeSkillsState(newSkills);
        },
        [setResumeSkillsState, skills]
    );

    const toggleSkillKeywords = useCallback(
        (skill, skillIndex, keyword, keywordIndex) => () => {
            const newSkills = { ...skills };
            newSkills.value[skillIndex].value.keywords.value[keywordIndex] = {
                ...newSkills.value[skillIndex].value.keywords.value[keywordIndex],
                enabled: !newSkills.value[skillIndex].value.keywords.value[keywordIndex].enabled,
            };
            setResumeSkillsState(newSkills);
        },
        [setResumeSkillsState, skills]
    );

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput label={varNameToString({ skills })} onChange={toggleSkills} checked={skills?.enabled} />
            {skills?.enabled && (
                <ul>
                    {skills?.value.map((skill, index) => {
                        const { name, level, keywords } = skill?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                {skill && (
                                    <ItemsList
                                        label={name?.value}
                                        checked={skill?.enabled}
                                        onClick={toggleSkill(skill, index)}
                                    />
                                )}
                                {skill?.enabled && (
                                    <ul>
                                        {level && (
                                            <ItemsList
                                                label={varNameToString({ level })}
                                                checked={level?.enabled}
                                                onClick={toggleSkillsDetail(skill, index, varNameToString({ level }))}
                                            />
                                        )}
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={toggleSkillsDetail(skill, index, varNameToString({ name }))}
                                            />
                                        )}
                                        {keywords && (
                                            <ItemsList
                                                label={varNameToString({ keywords })}
                                                checked={keywords?.enabled}
                                                onClick={toggleSkillsDetail(
                                                    skill,
                                                    index,
                                                    varNameToString({ keywords })
                                                )}
                                            />
                                        )}
                                        {keywords?.enabled && (
                                            <ul>
                                                {keywords?.value.map((keyword, idx) => (
                                                    <ItemsList
                                                        label={keyword?.value}
                                                        key={uuid()}
                                                        checked={keyword?.enabled}
                                                        onClick={toggleSkillKeywords(skill, index, keyword, idx)}
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

export default memo(Skills);
