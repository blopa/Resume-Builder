import { Fragment, useCallback, memo } from 'react';
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

    const setResumeProjectsState = useCallback(
        (newProjects) => {
            dispatch(setResumeProjects(newProjects));
        },
        [dispatch]
    );

    const toggleProjects = useCallback(() => {
        const currentState = projects?.enabled;
        setResumeProjectsState({
            ...projects,
            enabled: !currentState,
        });
    }, [projects, setResumeProjectsState]);

    const toggleProject = useCallback(
        (project, index) => () => {
            const newProjects = { ...projects };
            newProjects.value[index] = {
                ...newProjects.value[index],
                enabled: !newProjects.value[index].enabled,
            };
            setResumeProjectsState(newProjects);
        },
        [projects, setResumeProjectsState]
    );

    const toggleProjectDetail = useCallback(
        (project, index, propName) => () => {
            const newProjects = { ...projects };
            newProjects.value[index] = {
                ...newProjects.value[index],
                value: {
                    ...newProjects.value[index].value,
                    [propName]: {
                        ...newProjects.value[index].value[propName],
                        enabled: !newProjects.value[index].value[propName].enabled,
                    },
                },
            };

            if (newProjects.value[index].enabled) {
                newProjects.value[index].enabled = Object.entries(newProjects.value[index].value).some(
                    (entry) => entry[1].enabled
                );
            }
            setResumeProjectsState(newProjects);
        },
        [projects, setResumeProjectsState]
    );

    const toggleProjectKeywords = useCallback(
        (project, projectIndex, keyword, keywordIndex) => () => {
            const newProjects = { ...projects };
            newProjects.value[projectIndex].value.keywords.value[keywordIndex] = {
                ...newProjects.value[projectIndex].value.keywords.value[keywordIndex],
                enabled: !newProjects.value[projectIndex].value.keywords.value[keywordIndex].enabled,
            };
            setResumeProjectsState(newProjects);
        },
        [projects, setResumeProjectsState]
    );

    const toggleProjectHighlights = useCallback(
        (project, projectIndex, highlight, highlightIndex) => () => {
            const newProjects = { ...projects };
            newProjects.value[projectIndex].value.highlights.value[highlightIndex] = {
                ...newProjects.value[projectIndex].value.highlights.value[highlightIndex],
                enabled: !newProjects.value[projectIndex].value.highlights.value[highlightIndex].enabled,
            };
            setResumeProjectsState(newProjects);
        },
        [projects, setResumeProjectsState]
    );

    const toggleProjectRoles = useCallback(
        (project, projectIndex, role, roleIndex) => () => {
            const newProjects = { ...projects };
            newProjects.value[projectIndex].value.roles.value[roleIndex] = {
                ...newProjects.value[projectIndex].value.roles.value[roleIndex],
                enabled: !newProjects.value[projectIndex].value.roles.value[roleIndex].enabled,
            };
            setResumeProjectsState(newProjects);
        },
        [projects, setResumeProjectsState]
    );

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput label={varNameToString({ projects })} onChange={toggleProjects} checked={projects?.enabled} />
            {projects?.enabled && (
                <ul>
                    {projects?.value.map((project, index) => {
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
                                    onClick={toggleProject(project, index)}
                                />
                                {project?.enabled && (
                                    <ul>
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={toggleProjectDetail(project, index, varNameToString({ name }))}
                                            />
                                        )}
                                        {entity && (
                                            <ItemsList
                                                label={varNameToString({ entity })}
                                                checked={entity?.enabled}
                                                onClick={toggleProjectDetail(
                                                    project,
                                                    index,
                                                    varNameToString({ entity })
                                                )}
                                            />
                                        )}
                                        {startDate && (
                                            <ItemsList
                                                label={varNameToString({ startDate })}
                                                checked={startDate?.enabled}
                                                onClick={toggleProjectDetail(
                                                    project,
                                                    index,
                                                    varNameToString({ startDate })
                                                )}
                                            />
                                        )}
                                        {endDate && (
                                            <ItemsList
                                                label={varNameToString({ endDate })}
                                                checked={endDate?.enabled}
                                                onClick={toggleProjectDetail(
                                                    project,
                                                    index,
                                                    varNameToString({ endDate })
                                                )}
                                            />
                                        )}
                                        {url && (
                                            <ItemsList
                                                label={varNameToString({ url })}
                                                checked={url?.enabled}
                                                onClick={toggleProjectDetail(project, index, varNameToString({ url }))}
                                            />
                                        )}
                                        {description && (
                                            <ItemsList
                                                label={varNameToString({ description })}
                                                checked={description?.enabled}
                                                onClick={toggleProjectDetail(
                                                    project,
                                                    index,
                                                    varNameToString({ description })
                                                )}
                                            />
                                        )}
                                        {type && (
                                            <ItemsList
                                                label={varNameToString({ type })}
                                                checked={type?.enabled}
                                                onClick={toggleProjectDetail(project, index, varNameToString({ type }))}
                                            />
                                        )}
                                        {highlights && (
                                            <ItemsList
                                                label={varNameToString({ highlights })}
                                                checked={highlights?.enabled}
                                                onClick={toggleProjectDetail(
                                                    project,
                                                    index,
                                                    varNameToString({ highlights })
                                                )}
                                            />
                                        )}
                                        {highlights?.enabled && (
                                            <ul>
                                                {highlights?.value.map((highlight, idx) => (
                                                    <ItemsList
                                                        label={highlight?.value}
                                                        key={uuid()}
                                                        checked={highlight?.enabled}
                                                        onClick={toggleProjectHighlights(
                                                            project,
                                                            index,
                                                            highlight,
                                                            idx
                                                        )}
                                                    />
                                                ))}
                                            </ul>
                                        )}
                                        {keywords && (
                                            <ItemsList
                                                label={varNameToString({ keywords })}
                                                checked={keywords?.enabled}
                                                onClick={toggleProjectDetail(
                                                    project,
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
                                                        onClick={toggleProjectKeywords(project, index, keyword, idx)}
                                                    />
                                                ))}
                                            </ul>
                                        )}
                                        {roles && (
                                            <ItemsList
                                                label={varNameToString({ roles })}
                                                checked={roles?.enabled}
                                                onClick={toggleProjectDetail(
                                                    project,
                                                    index,
                                                    varNameToString({ roles })
                                                )}
                                            />
                                        )}
                                        {roles?.enabled && (
                                            <ul>
                                                {roles?.value.map((role, idx) => (
                                                    <ItemsList
                                                        label={role?.value}
                                                        key={uuid()}
                                                        checked={role?.enabled}
                                                        onClick={toggleProjectRoles(project, index, role, idx)}
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

export default memo(Projects);
