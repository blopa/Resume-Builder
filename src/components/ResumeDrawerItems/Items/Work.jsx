import React, { Fragment, useCallback, memo } from 'react';
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

    const {
        enabled: workEnabled,
        value: works,
    } = workData || {};

    const setResumeWorkState = useCallback((newWork) => {
        dispatch(setResumeWork(newWork));
    }, [dispatch]);

    const toggleWorks = useCallback(() => {
        const currentState = workData?.enabled;
        setResumeWorkState({
            ...workData,
            enabled: !currentState,
        });
    }, [setResumeWorkState, workData]);

    const toggleWork = useCallback((oldWork) => () => {
        const newWork = { ...workData };
        newWork.value =
            newWork?.value.map((wrk) => {
                if (JSON.stringify(wrk?.value) === JSON.stringify(oldWork?.value)) {
                    return {
                        ...wrk,
                        enabled: !wrk?.enabled,
                    };
                }
                return wrk;
            });
        setResumeWorkState(newWork);
    }, [setResumeWorkState, workData]);

    const toggleWorkDetail = useCallback((oldWork, propName) => () => {
        const newWork = { ...workData };
        newWork.value =
            newWork?.value.map((wrk) => {
                if (JSON.stringify(wrk?.value) === JSON.stringify(oldWork?.value)) {
                    return {
                        ...wrk,
                        value: {
                            ...wrk?.value,
                            [propName]: {
                                ...wrk?.value[propName],
                                enabled: !wrk?.value[propName]?.enabled,
                            },
                        },
                    };
                }
                return wrk;
            });
        setResumeWorkState(newWork);
    }, [setResumeWorkState, workData]);

    const toggleWorkHighlights = useCallback((oldWork, highlight) => () => {
        const newWork = { ...workData };
        newWork.value =
            newWork?.value.map((wrk) => {
                if (JSON.stringify(wrk?.value) === JSON.stringify(oldWork?.value)) {
                    return {
                        ...wrk,
                        value: {
                            ...wrk?.value,
                            highlights: {
                                ...wrk?.value.highlights,
                                value: [
                                    ...wrk?.value.highlights?.value.map((high) => {
                                        if (JSON.stringify(high?.value) === JSON.stringify(highlight?.value)) {
                                            return {
                                                ...high,
                                                enabled: !high?.enabled,
                                            };
                                        }

                                        return high;
                                    }),
                                ],
                            },
                        },
                    };
                }

                return wrk;
            });
        setResumeWorkState(newWork);
    }, [setResumeWorkState, workData]);

    const toggleWorkKeywords = useCallback((oldWork, keyword) => () => {
        const newWork = { ...workData };
        newWork.value =
            newWork?.value.map((wrk) => {
                if (JSON.stringify(wrk?.value) === JSON.stringify(oldWork?.value)) {
                    return {
                        ...wrk,
                        value: {
                            ...wrk?.value,
                            keywords: {
                                ...wrk?.value.keywords,
                                value: [
                                    ...wrk?.value.keywords?.value.map((kword) => {
                                        if (JSON.stringify(kword?.value) === JSON.stringify(keyword?.value)) {
                                            return {
                                                ...kword,
                                                enabled: !kword?.enabled,
                                            };
                                        }

                                        return kword;
                                    }),
                                ],
                            },
                        },
                    };
                }

                return wrk;
            });
        setResumeWorkState(newWork);
    }, [setResumeWorkState, workData]);

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="work"
                onChange={toggleWorks}
                checked={workEnabled}
            />
            {workEnabled && (
                <ul>
                    {works.map((work) => {
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
                                        onClick={toggleWork(work)}
                                    />
                                )}
                                {work?.enabled && (
                                    <ul>
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    varNameToString({ name })
                                                )}
                                            />
                                        )}
                                        {position && (
                                            <ItemsList
                                                label={varNameToString({ position })}
                                                checked={position?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    varNameToString({ position })
                                                )}
                                            />
                                        )}
                                        {url && (
                                            <ItemsList
                                                label={varNameToString({ url })}
                                                checked={url?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    varNameToString({ url })
                                                )}
                                            />
                                        )}
                                        {location && (
                                            <ItemsList
                                                label={varNameToString({ location })}
                                                checked={location?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    varNameToString({ location })
                                                )}
                                            />
                                        )}
                                        {startDate && (
                                            <ItemsList
                                                label={varNameToString({ startDate })}
                                                checked={startDate?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    varNameToString({ startDate })
                                                )}
                                            />
                                        )}
                                        {endDate && (
                                            <ItemsList
                                                label={varNameToString({ endDate })}
                                                checked={endDate?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    varNameToString({ endDate })
                                                )}
                                            />
                                        )}
                                        {summary && (
                                            <ItemsList
                                                label={varNameToString({ summary })}
                                                checked={summary?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    varNameToString({ summary })
                                                )}
                                            />
                                        )}
                                        {description && (
                                            <ItemsList
                                                label={varNameToString({ description })}
                                                checked={description?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    varNameToString({ description })
                                                )}
                                            />
                                        )}
                                        {highlights && (
                                            <ItemsList
                                                label={varNameToString({ highlights })}
                                                checked={highlights?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    varNameToString({ highlights })
                                                )}
                                            />
                                        )}
                                        {highlights?.enabled && (
                                            <ul>
                                                {highlights?.value.map((highlight) => (
                                                    <ItemsList
                                                        label={highlight?.value}
                                                        key={uuid()}
                                                        checked={highlight?.enabled}
                                                        onClick={toggleWorkHighlights(
                                                            work,
                                                            highlight
                                                        )}
                                                    />
                                                ))}
                                            </ul>
                                        )}
                                        {keywords && (
                                            <ItemsList
                                                label={varNameToString({ keywords })}
                                                checked={keywords?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    varNameToString({ keywords })
                                                )}
                                            />
                                        )}
                                        {keywords?.enabled && (
                                            <ul>
                                                {keywords?.value.map((keyword) => (
                                                    <ItemsList
                                                        label={keyword?.value}
                                                        key={uuid()}
                                                        checked={keyword?.enabled}
                                                        onClick={toggleWorkKeywords(
                                                            work,
                                                            keyword
                                                        )}
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
