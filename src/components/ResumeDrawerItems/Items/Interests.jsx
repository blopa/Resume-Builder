import React, { Fragment, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumeInterests from '../../../store/actions/setResumeInterests';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

// Utils
import { varNameToString } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Interest({ interests }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const setResumeInterestsState = useCallback((interest) => {
        dispatch(setResumeInterests(interest));
    }, [dispatch]);

    const toggleInterests = () => {
        const currentState = interests?.enabled;
        setResumeInterestsState({
            ...interests,
            enabled: !currentState,
        });
    };

    const toggleInterest = useCallback((interest) => () => {
        const newInterest = { ...interests };
        newInterest.value =
            newInterest?.value.map((wrk) => {
                if (JSON.stringify(wrk?.value) === JSON.stringify(interest?.value)) {
                    return {
                        ...wrk,
                        enabled: !wrk?.enabled,
                    };
                }
                return wrk;
            });
        setResumeInterestsState(newInterest);
    }, [interests, setResumeInterestsState]);

    const toggleInterestDetail = useCallback((interest, propName) => () => {
        const newInterest = { ...interests };
        newInterest.value =
            newInterest?.value.map((vol) => {
                if (JSON.stringify(vol?.value) === JSON.stringify(interest?.value)) {
                    return {
                        ...vol,
                        value: {
                            ...vol?.value,
                            [propName]: {
                                ...vol?.value[propName],
                                enabled: !vol?.value[propName]?.enabled,
                            },
                        },
                    };
                }
                return vol;
            });
        setResumeInterestsState(newInterest);
    }, [interests, setResumeInterestsState]);

    const toggleInterestKeywords = useCallback((interest, keyword) => () => {
        const newInterest = { ...interests };
        newInterest.value =
            newInterest?.value.map((vol) => {
                if (JSON.stringify(vol?.value) === JSON.stringify(interest?.value)) {
                    return {
                        ...vol,
                        value: {
                            ...vol?.value,
                            keywords: {
                                ...vol?.value.keywords,
                                value: [
                                    ...vol?.value.keywords?.value.map((key) => {
                                        if (JSON.stringify(key?.value) === JSON.stringify(keyword?.value)) {
                                            return {
                                                ...key,
                                                enabled: !key?.enabled,
                                            };
                                        }

                                        return key;
                                    }),
                                ],
                            },
                        },
                    };
                }
                return vol;
            });
        setResumeInterestsState(newInterest);
    }, [interests, setResumeInterestsState]);

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="interest"
                onChange={toggleInterests}
                checked={interests?.enabled}
            />
            {interests?.enabled && (
                <ul>
                    {interests?.value.map((interest) => {
                        const {
                            name,
                            keywords,
                        } = interest?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                {interest && (
                                    <ItemsList
                                        label={name?.value}
                                        checked={interest?.enabled}
                                        onClick={toggleInterest(interest)}
                                    />
                                )}
                                {interest?.enabled && (
                                    <ul>
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={toggleInterestDetail(
                                                    interest,
                                                    varNameToString({ name })
                                                )}
                                            />
                                        )}
                                        {keywords?.enabled && keywords?.value.map((keyword) => (
                                            <ItemsList
                                                label={keyword?.value}
                                                key={uuid()}
                                                checked={keyword?.enabled}
                                                onClick={toggleInterestKeywords(
                                                    interest,
                                                    keyword
                                                )}
                                            />
                                        ))}
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

export default memo(Interest);
