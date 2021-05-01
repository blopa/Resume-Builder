import React, { Fragment, useCallback, memo } from 'react';
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

    const setResumeSkillsState = useCallback((newSkills) => {
        dispatch(setResumeSkills(newSkills));
    }, [dispatch]);

    const toggleSkills = () => {
        const currentState = skills?.enabled;
        setResumeSkillsState({
            ...skills,
            enabled: !currentState,
        });
    };

    const toggleSkill = useCallback((skill) => () => {
        const newSkills = { ...skills };
        newSkills.value =
            newSkills?.value.map((skl) => {
                if (JSON.stringify(skl?.value) === JSON.stringify(skill?.value)) {
                    return {
                        ...skl,
                        enabled: !skl?.enabled,
                    };
                }
                return skl;
            });
        setResumeSkillsState(newSkills);
    }, [setResumeSkillsState, skills]);

    const toggleSkillsDetail = useCallback((skill, propName) => () => {
        const newSkills = { ...skills };
        newSkills.value =
            newSkills?.value.map((skl) => {
                if (JSON.stringify(skl?.value) === JSON.stringify(skill?.value)) {
                    return {
                        ...skl,
                        value: {
                            ...skl?.value,
                            [propName]: {
                                ...skl?.value[propName],
                                enabled: !skl?.value[propName]?.enabled,
                            },
                        },
                    };
                }
                return skl;
            });
        setResumeSkillsState(newSkills);
    }, [setResumeSkillsState, skills]);

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="skills"
                onChange={toggleSkills}
                checked={skills?.enabled}
            />
            {skills?.enabled && (
                <ul>
                    {skills?.value.map((skill) => {
                        const {
                            name,
                            level,
                            keywords,
                        } = skill?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                {skill && (
                                    <ItemsList
                                        label={name?.value}
                                        checked={skill?.enabled}
                                        onClick={toggleSkill(skill)}
                                    />
                                )}
                                {skill?.enabled && (
                                    <ul>
                                        {keywords && (
                                            <ItemsList
                                                label={varNameToString({ keywords })}
                                                checked={keywords?.enabled}
                                                onClick={toggleSkillsDetail(
                                                    skill,
                                                    varNameToString({ keywords })
                                                )}
                                            />
                                        )}
                                        {level && (
                                            <ItemsList
                                                label={varNameToString({ level })}
                                                checked={level?.enabled}
                                                onClick={toggleSkillsDetail(
                                                    skill,
                                                    varNameToString({ level })
                                                )}
                                            />
                                        )}
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={toggleSkillsDetail(
                                                    skill,
                                                    varNameToString({ name })
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

export default memo(Skills);
