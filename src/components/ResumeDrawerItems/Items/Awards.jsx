import { Fragment, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumeAwards from '../../../store/actions/setResumeAwards';

// Utils
import { varNameToString } from '../../../utils/utils';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Awards({ awards }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const setResumeAwardsState = useCallback(
        (newAwards) => {
            dispatch(setResumeAwards(newAwards));
        },
        [dispatch]
    );

    const toggleAwards = useCallback(() => {
        const currentState = awards?.enabled;
        setResumeAwardsState({
            ...awards,
            enabled: !currentState,
        });
    }, [awards, setResumeAwardsState]);

    const toggleAward = useCallback(
        (award, index) => () => {
            const newAwards = { ...awards };
            newAwards.value[index] = {
                ...newAwards.value[index],
                enabled: !newAwards.value[index].enabled,
            };
            setResumeAwardsState(newAwards);
        },
        [awards, setResumeAwardsState]
    );

    const toggleAwardsDetail = useCallback(
        (award, index, propName) => () => {
            const newAwards = { ...awards };
            newAwards.value[index] = {
                ...newAwards.value[index],
                value: {
                    ...newAwards.value[index].value,
                    [propName]: {
                        ...newAwards.value[index].value[propName],
                        enabled: !newAwards.value[index].value[propName].enabled,
                    },
                },
            };

            if (newAwards.value[index].enabled) {
                newAwards.value[index].enabled = Object.entries(newAwards.value[index].value).some(
                    (entry) => entry[1].enabled
                );
            }
            setResumeAwardsState(newAwards);
        },
        [awards, setResumeAwardsState]
    );

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput label={varNameToString({ awards })} onChange={toggleAwards} checked={awards?.enabled} />
            {awards?.enabled && (
                <ul>
                    {awards?.value.map((award, index) => {
                        const { title, date, awarder, summary } = award?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                <ItemsList
                                    label={title?.value}
                                    checked={award?.enabled}
                                    onClick={toggleAward(award, index)}
                                />
                                {award?.enabled && (
                                    <ul>
                                        {title && (
                                            <ItemsList
                                                label={varNameToString({ title })}
                                                checked={title?.enabled}
                                                onClick={toggleAwardsDetail(award, index, varNameToString({ title }))}
                                            />
                                        )}
                                        {date && (
                                            <ItemsList
                                                label={varNameToString({ date })}
                                                checked={date?.enabled}
                                                onClick={toggleAwardsDetail(award, index, varNameToString({ date }))}
                                            />
                                        )}
                                        {awarder && (
                                            <ItemsList
                                                label={varNameToString({ awarder })}
                                                checked={awarder?.enabled}
                                                onClick={toggleAwardsDetail(award, index, varNameToString({ awarder }))}
                                            />
                                        )}
                                        {summary && (
                                            <ItemsList
                                                label={varNameToString({ summary })}
                                                checked={summary?.enabled}
                                                onClick={toggleAwardsDetail(award, index, varNameToString({ summary }))}
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
