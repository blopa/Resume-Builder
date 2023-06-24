import { Fragment, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Utils
import { varNameToString } from '../../../utils/utils';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumeWork from '../../../store/actions/setResumeWork';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Work({ work: workData }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { enabled: workEnabled, value: works } = workData || {};

    const setResumeWorkState = useCallback(
        (newWork) => {
            dispatch(setResumeWork(newWork));
        },
        [dispatch]
    );

    const toggleWorks = useCallback(() => {
        const currentState = workData?.enabled;
        setResumeWorkState({
            ...workData,
            enabled: !currentState,
        });
    }, [setResumeWorkState, workData]);

    const toggleWork = useCallback(
        (oldWork, index) => () => {
            const newWork = { ...workData };
            newWork.value[index] = {
                ...newWork.value[index],
                enabled: !newWork.value[index].enabled,
            };
            setResumeWorkState(newWork);
        },
        [setResumeWorkState, workData]
    );

    const toggleWorkDetail = useCallback(
        (oldWork, index, propName) => () => {
            const newWork = { ...workData };
            newWork.value[index] = {
                ...newWork.value[index],
                value: {
                    ...newWork.value[index].value,
                    [propName]: {
                        ...newWork.value[index].value[propName],
                        enabled: !newWork.value[index].value[propName].enabled,
                    },
                },
            };

            if (newWork.value[index].enabled) {
                newWork.value[index].enabled = Object.entries(newWork.value[index].value).some(
                    (entry) => entry[1].enabled
                );
            }
            setResumeWorkState(newWork);
        },
        [setResumeWorkState, workData]
    );

    const toggleWorkHighlights = useCallback(
        (oldWork, oldWorkIndex, highlight, highlightIndex) => () => {
            const newWork = { ...workData };
            newWork.value[oldWorkIndex].value.highlights.value[highlightIndex] = {
                ...newWork.value[oldWorkIndex].value.highlights.value[highlightIndex],
                enabled: !newWork.value[oldWorkIndex].value.highlights.value[highlightIndex].enabled,
            };
            setResumeWorkState(newWork);
        },
        [setResumeWorkState, workData]
    );

    const toggleWorkKeywords = useCallback(
        (oldWork, oldWorkIndex, keyword, keywordIndex) => () => {
            const newWork = { ...workData };
            newWork.value[oldWorkIndex].value.keywords.value[keywordIndex] = {
                ...newWork.value[oldWorkIndex].value.keywords.value[keywordIndex],
                enabled: !newWork.value[oldWorkIndex].value.keywords.value[keywordIndex].enabled,
            };
            setResumeWorkState(newWork);
        },
        [setResumeWorkState, workData]
    );

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                // TODO varNameToString({ work })
                label="work"
                onChange={toggleWorks}
                checked={workEnabled}
            />
            {workEnabled && (
                <ul>
                    {works.map((work, index) => {
                        const {
                            name,
                            location,
                            description,
                            position,
                            url,
                            startDate,
                            endDate,
                            summary,
                            highlights,
                            keywords,
                        } = work?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                {work && (
                                    <ItemsList
                                        label={name?.value}
                                        checked={work?.enabled}
                                        onClick={toggleWork(work, index)}
                                    />
                                )}
                                {work?.enabled && (
                                    <ul>
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={toggleWorkDetail(work, index, varNameToString({ name }))}
                                            />
                                        )}
                                        {position && (
                                            <ItemsList
                                                label={varNameToString({ position })}
                                                checked={position?.enabled}
                                                onClick={toggleWorkDetail(work, index, varNameToString({ position }))}
                                            />
                                        )}
                                        {url && (
                                            <ItemsList
                                                label={varNameToString({ url })}
                                                checked={url?.enabled}
                                                onClick={toggleWorkDetail(work, index, varNameToString({ url }))}
                                            />
                                        )}
                                        {location && (
                                            <ItemsList
                                                label={varNameToString({ location })}
                                                checked={location?.enabled}
                                                onClick={toggleWorkDetail(work, index, varNameToString({ location }))}
                                            />
                                        )}
                                        {startDate && (
                                            <ItemsList
                                                label={varNameToString({ startDate })}
                                                checked={startDate?.enabled}
                                                onClick={toggleWorkDetail(work, index, varNameToString({ startDate }))}
                                            />
                                        )}
                                        {endDate && (
                                            <ItemsList
                                                label={varNameToString({ endDate })}
                                                checked={endDate?.enabled}
                                                onClick={toggleWorkDetail(work, index, varNameToString({ endDate }))}
                                            />
                                        )}
                                        {summary && (
                                            <ItemsList
                                                label={varNameToString({ summary })}
                                                checked={summary?.enabled}
                                                onClick={toggleWorkDetail(work, index, varNameToString({ summary }))}
                                            />
                                        )}
                                        {description && (
                                            <ItemsList
                                                label={varNameToString({ description })}
                                                checked={description?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    index,
                                                    varNameToString({ description })
                                                )}
                                            />
                                        )}
                                        {highlights && (
                                            <ItemsList
                                                label={varNameToString({ highlights })}
                                                checked={highlights?.enabled}
                                                onClick={toggleWorkDetail(work, index, varNameToString({ highlights }))}
                                            />
                                        )}
                                        {highlights?.enabled && (
                                            <ul>
                                                {highlights?.value.map((highlight, idx) => (
                                                    <ItemsList
                                                        label={highlight?.value}
                                                        key={uuid()}
                                                        checked={highlight?.enabled}
                                                        onClick={toggleWorkHighlights(work, index, highlight, idx)}
                                                    />
                                                ))}
                                            </ul>
                                        )}
                                        {keywords && (
                                            <ItemsList
                                                label={varNameToString({ keywords })}
                                                checked={keywords?.enabled}
                                                onClick={toggleWorkDetail(work, index, varNameToString({ keywords }))}
                                            />
                                        )}
                                        {keywords?.enabled && (
                                            <ul>
                                                {keywords?.value.map((keyword, idx) => (
                                                    <ItemsList
                                                        label={keyword?.value}
                                                        key={uuid()}
                                                        checked={keyword?.enabled}
                                                        onClick={toggleWorkKeywords(work, index, keyword, idx)}
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

export default memo(Work);
