import React, { Fragment, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumeReferences from '../../../store/actions/setResumeReferences';

// Utils
import { varNameToString } from '../../../utils/utils';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function References({ references }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const setResumeReferencesState = useCallback((newReferences) => {
        dispatch(setResumeReferences(newReferences));
    }, [dispatch]);

    const toggleReferences = () => {
        const currentState = references?.enabled;
        setResumeReferencesState({
            ...references,
            enabled: !currentState,
        });
    };

    const toggleReference = useCallback((reference) => () => {
        const newReferences = { ...references };
        newReferences.value =
            newReferences?.value.map((ref) => {
                if (JSON.stringify(ref?.value) === JSON.stringify(reference?.value)) {
                    return {
                        ...ref,
                        enabled: !ref?.enabled,
                    };
                }
                return ref;
            });
        setResumeReferencesState(newReferences);
    }, [references, setResumeReferencesState]);

    const toggleReferencesDetail = useCallback((reference, propName) => () => {
        const newReferences = { ...references };
        newReferences.value =
            newReferences?.value.map((ref) => {
                if (JSON.stringify(ref?.value) === JSON.stringify(reference?.value)) {
                    return {
                        ...ref,
                        value: {
                            ...ref?.value,
                            [propName]: {
                                ...ref?.value[propName],
                                enabled: !ref?.value[propName]?.enabled,
                            },
                        },
                    };
                }
                return ref;
            });
        setResumeReferencesState(newReferences);
    }, [references, setResumeReferencesState]);

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="references"
                onChange={toggleReferences}
                checked={references?.enabled}
            />
            {references?.enabled && (
                <ul>
                    {references?.value.map((ref) => {
                        const {
                            name,
                            reference,
                        } = ref?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                {ref && (
                                    <ItemsList
                                        label={name?.value}
                                        checked={ref?.enabled}
                                        onClick={toggleReference(ref)}
                                    />
                                )}
                                {ref?.enabled && (
                                    <ul>
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={toggleReferencesDetail(
                                                    ref,
                                                    varNameToString({ name })
                                                )}
                                            />
                                        )}
                                        {reference && (
                                            <ItemsList
                                                label={varNameToString({ reference })}
                                                checked={reference?.enabled}
                                                onClick={toggleReferencesDetail(
                                                    ref,
                                                    varNameToString({ reference })
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

export default memo(References);
