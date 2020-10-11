import React, { Fragment, useContext, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';

// Components
import { makeStyles } from '@material-ui/styles';
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import style from '../resumeDrawerStyles';
import setResumeAwards from '../../../store/actions/setResumeAwards';
import { varNameToString } from '../../../utils/utils';
import { StoreContext } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Awards({ awards }) {
    const classes = useStyles();
    const { state, dispatch } = useContext(StoreContext);

    const setResumeAwardsState = useCallback((newAwards) => {
        dispatch(setResumeAwards(newAwards));
    }, []);

    const toggleAwards = () => {
        const currentState = awards?.enabled;
        setResumeAwardsState({
            ...awards,
            enabled: !currentState,
        });
    };

    const toggleAward = useCallback((award) => () => {
        const newAwards = { ...awards };
        newAwards.value =
            newAwards?.value.map((awd) => {
                if (JSON.stringify(awd?.value) === JSON.stringify(award?.value)) {
                    return {
                        ...awd,
                        enabled: !awd?.enabled,
                    };
                }
                return awd;
            });
        setResumeAwardsState(newAwards);
    }, [awards, setResumeAwardsState]);

    const toggleAwardsDetail = useCallback((award, propName) => () => {
        const newAwards = { ...awards };
        newAwards.value =
            newAwards?.value.map((awd) => {
                if (JSON.stringify(awd?.value) === JSON.stringify(award?.value)) {
                    return {
                        ...awd,
                        value: {
                            ...awd?.value,
                            [propName]: {
                                ...awd?.value[propName],
                                enabled: !awd?.value[propName]?.enabled,
                            },
                        },
                    };
                }
                return awd;
            });
        setResumeAwardsState(newAwards);
    }, [awards, setResumeAwardsState]);

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="awards"
                onChange={toggleAwards}
                checked={awards?.enabled}
            />
            {awards?.enabled && (
                <ul>
                    {awards?.value.map((award) => {
                        const { title, date, awarder, summary } = award?.value || {};
                        return (
                            <Fragment key={uuid()}>
                                <ItemsList
                                    label={title?.value}
                                    checked={award?.enabled}
                                    onClick={toggleAward(award)}
                                />
                                {award?.enabled && (
                                    <ul>
                                        {title && (
                                            <ItemsList
                                                label={varNameToString({ title })}
                                                checked={title?.enabled}
                                                onClick={toggleAwardsDetail(
                                                    award,
                                                    varNameToString({ title })
                                                )}
                                            />
                                        )}
                                        {date && (
                                            <ItemsList
                                                label={varNameToString({ date })}
                                                checked={date?.enabled}
                                                onClick={toggleAwardsDetail(
                                                    award,
                                                    varNameToString({ date })
                                                )}
                                            />
                                        )}
                                        {awarder && (
                                            <ItemsList
                                                label={varNameToString({ awarder })}
                                                checked={awarder?.enabled}
                                                onClick={toggleAwardsDetail(
                                                    award,
                                                    varNameToString({ awarder })
                                                )}
                                            />
                                        )}
                                        {summary && (
                                            <ItemsList
                                                label={varNameToString({ summary })}
                                                checked={summary?.enabled}
                                                onClick={toggleAwardsDetail(
                                                    award,
                                                    varNameToString({ summary })
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

export default memo(Awards);
