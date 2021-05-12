import React, { Fragment, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumeProjects from '../../../store/actions/setResumeProjects';

// Utils
import { varNameToString } from '../../../utils/utils';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Projects({ projects }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const setResumeProjectsState = useCallback((newProjects) => {
        dispatch(setResumeProjects(newProjects));
    }, [dispatch]);

    const toggleProjects = useCallback(() => {
        const currentState = projects?.enabled;
        setResumeProjectsState({
            ...projects,
            enabled: !currentState,
        });
    }, [projects, setResumeProjectsState]);

    const toggleProject = useCallback((project) => () => {
        const newProjects = { ...projects };
        newProjects.value =
            newProjects?.value.map((proj) => {
                if (JSON.stringify(proj?.value) === JSON.stringify(project?.value)) {
                    return {
                        ...proj,
                        enabled: !proj?.enabled,
                    };
                }
                return proj;
            });
        setResumeProjectsState(newProjects);
    }, [projects, setResumeProjectsState]);

    const toggleProjectsDetail = useCallback((project, propName) => () => {
        const newProjects = { ...projects };
        newProjects.value =
            newProjects?.value.map((proj) => {
                if (JSON.stringify(proj?.value) === JSON.stringify(project?.value)) {
                    return {
                        ...proj,
                        value: {
                            ...proj?.value,
                            [propName]: {
                                ...proj?.value[propName],
                                enabled: !proj?.value[propName]?.enabled,
                            },
                        },
                    };
                }
                return proj;
            });
        setResumeProjectsState(newProjects);
    }, [projects, setResumeProjectsState]);

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="projects"
                onChange={toggleProjects}
                checked={projects?.enabled}
            />
            {projects?.enabled && (
                <ul>
                    {projects?.value.map((project) => {
                        const {
                            name,
                            description,
                            highlights,
                            keywords,
                            startDate,
                            endDate,
                            url,
                            roles,
                            entity,
                            type,
                        } = project?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                <ItemsList
                                    label={name?.value}
                                    checked={project?.enabled}
                                    onClick={toggleProject(project)}
                                />
                                {project?.enabled && (
                                    <ul>
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={toggleProjectsDetail(
                                                    project,
                                                    varNameToString({ name })
                                                )}
                                            />
                                        )}
                                        {entity && (
                                            <ItemsList
                                                label={varNameToString({ entity })}
                                                checked={entity?.enabled}
                                                onClick={toggleProjectsDetail(
                                                    project,
                                                    varNameToString({ entity })
                                                )}
                                            />
                                        )}
                                        {startDate && (
                                            <ItemsList
                                                label={varNameToString({ startDate })}
                                                checked={startDate?.enabled}
                                                onClick={toggleProjectsDetail(
                                                    project,
                                                    varNameToString({ startDate })
                                                )}
                                            />
                                        )}
                                        {endDate && (
                                            <ItemsList
                                                label={varNameToString({ endDate })}
                                                checked={endDate?.enabled}
                                                onClick={toggleProjectsDetail(
                                                    project,
                                                    varNameToString({ endDate })
                                                )}
                                            />
                                        )}
                                        {url && (
                                            <ItemsList
                                                label={varNameToString({ url })}
                                                checked={url?.enabled}
                                                onClick={toggleProjectsDetail(
                                                    project,
                                                    varNameToString({ url })
                                                )}
                                            />
                                        )}
                                        {description && (
                                            <ItemsList
                                                label={varNameToString({ description })}
                                                checked={description?.enabled}
                                                onClick={toggleProjectsDetail(
                                                    project,
                                                    varNameToString({ description })
                                                )}
                                            />
                                        )}
                                        {type && (
                                            <ItemsList
                                                label={varNameToString({ type })}
                                                checked={type?.enabled}
                                                onClick={toggleProjectsDetail(
                                                    project,
                                                    varNameToString({ type })
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

export default memo(Projects);
