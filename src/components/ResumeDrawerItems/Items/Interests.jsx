import { Fragment, useCallback, memo } from 'react';
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

    const setResumeInterestsState = useCallback(
        (interest) => {
            dispatch(setResumeInterests(interest));
        },
        [dispatch]
    );

    const toggleInterests = useCallback(() => {
        const currentState = interests?.enabled;
        setResumeInterestsState({
            ...interests,
            enabled: !currentState,
        });
    }, [interests, setResumeInterestsState]);

    const toggleInterest = useCallback(
        (interest, index) => () => {
            const newInterest = { ...interests };
            newInterest.value[index] = {
                ...newInterest.value[index],
                enabled: !newInterest.value[index].enabled,
            };
            setResumeInterestsState(newInterest);
        },
        [interests, setResumeInterestsState]
    );

    const toggleInterestDetail = useCallback(
        (interest, index, propName) => () => {
            const newInterest = { ...interests };
            newInterest.value[index] = {
                ...newInterest.value[index],
                value: {
                    ...newInterest.value[index].value,
                    [propName]: {
                        ...newInterest.value[index].value[propName],
                        enabled: !newInterest.value[index].value[propName].enabled,
                    },
                },
            };

            if (newInterest.value[index].enabled) {
                newInterest.value[index].enabled = Object.entries(newInterest.value[index].value).some(
                    (entry) => entry[1].enabled
                );
            }
            setResumeInterestsState(newInterest);
        },
        [interests, setResumeInterestsState]
    );

    const toggleInterestKeywords = useCallback(
        (interest, interestIndex, keyword, keywordIndex) => () => {
            const newInterest = { ...interests };
            newInterest.value[interestIndex].value.keywords.value[keywordIndex] = {
                ...newInterest.value[interestIndex].value.keywords.value[keywordIndex],
                enabled: !newInterest.value[interestIndex].value.keywords.value[keywordIndex].enabled,
            };
            setResumeInterestsState(newInterest);
        },
        [interests, setResumeInterestsState]
    );

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                // TODO varNameToString({ interest })
                label="interest"
                onChange={toggleInterests}
                checked={interests?.enabled}
            />
            {interests?.enabled && (
                <ul>
                    {interests?.value.map((interest, index) => {
                        const { name, keywords } = interest?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                {interest && (
                                    <ItemsList
                                        label={name?.value}
                                        checked={interest?.enabled}
                                        onClick={toggleInterest(interest, index)}
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
                                                    index,
                                                    varNameToString({ name })
                                                )}
                                            />
                                        )}
                                        {keywords && (
                                            <ItemsList
                                                label={varNameToString({ keywords })}
                                                checked={keywords?.enabled}
                                                onClick={toggleInterestDetail(
                                                    interest,
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
                                                        onClick={toggleInterestKeywords(interest, index, keyword, idx)}
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

export default memo(Interest);
