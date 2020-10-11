import React, { Fragment, useContext, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';

// Components
import { makeStyles } from '@material-ui/styles';
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Utils
import { varNameToString } from '../../../utils/utils';

// Actions
import style from '../resumeDrawerStyles';
import setResumeWork from '../../../store/actions/setResumeWork';
import { StoreContext } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Work({ work: workData }) {
    const classes = useStyles();
    const { state, dispatch } = useContext(StoreContext);

    const {
        enabled: workEnabled,
        value: works,
    } = workData || {};

    const setResumeWorkState = useCallback((newWork) => {
        dispatch(setResumeWork(newWork));
    }, []);

    const toggleWorks = () => {
        const currentState = workData?.enabled;
        setResumeWorkState({
            ...workData,
            enabled: !currentState,
        });
    };

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
                            company,
                            name,
                            position,
                            website,
                            url,
                            startDate,
                            endDate,
                            summary,
                            highlights,
                        } = work?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                {work && (
                                    <ItemsList
                                        label={company?.value || name?.value}
                                        checked={work?.enabled}
                                        onClick={toggleWork(work)}
                                    />
                                )}
                                {work?.enabled && (
                                    <ul>
                                        {company && (
                                            <ItemsList
                                                label={varNameToString({ company })}
                                                checked={company?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    varNameToString({ company })
                                                )}
                                            />
                                        )}
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
                                        {website && (
                                            <ItemsList
                                                label={varNameToString({ website })}
                                                checked={website?.enabled}
                                                onClick={toggleWorkDetail(
                                                    work,
                                                    varNameToString({ website })
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
