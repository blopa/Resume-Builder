import { Fragment, useCallback, memo } from 'react';
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

    const setResumeReferencesState = useCallback(
        (newReferences) => {
            dispatch(setResumeReferences(newReferences));
        },
        [dispatch]
    );

    const toggleReferences = useCallback(() => {
        const currentState = references?.enabled;
        setResumeReferencesState({
            ...references,
            enabled: !currentState,
        });
    }, [references, setResumeReferencesState]);

    const toggleReference = useCallback(
        (reference, index) => () => {
            const newReferences = { ...references };
            newReferences.value[index] = {
                ...newReferences.value[index],
                enabled: !newReferences.value[index].enabled,
            };
            setResumeReferencesState(newReferences);
        },
        [references, setResumeReferencesState]
    );

    const toggleReferencesDetail = useCallback(
        (reference, index, propName) => () => {
            const newReferences = { ...references };
            newReferences.value[index] = {
                ...newReferences.value[index],
                value: {
                    ...newReferences.value[index].value,
                    [propName]: {
                        ...newReferences.value[index].value[propName],
                        enabled: !newReferences.value[index].value[propName].enabled,
                    },
                },
            };

            if (newReferences.value[index].enabled) {
                newReferences.value[index].enabled = Object.entries(newReferences.value[index].value).some(
                    (entry) => entry[1].enabled
                );
            }
            setResumeReferencesState(newReferences);
        },
        [references, setResumeReferencesState]
    );

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label={varNameToString({ references })}
                onChange={toggleReferences}
                checked={references?.enabled}
            />
            {references?.enabled && (
                <ul>
                    {references?.value.map((ref, index) => {
                        const { name, reference } = ref?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                {ref && (
                                    <ItemsList
                                        label={name?.value}
                                        checked={ref?.enabled}
                                        onClick={toggleReference(ref, index)}
                                    />
                                )}
                                {ref?.enabled && (
                                    <ul>
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={toggleReferencesDetail(ref, index, varNameToString({ name }))}
                                            />
                                        )}
                                        {reference && (
                                            <ItemsList
                                                label={varNameToString({ reference })}
                                                checked={reference?.enabled}
                                                onClick={toggleReferencesDetail(
                                                    ref,
                                                    index,
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
