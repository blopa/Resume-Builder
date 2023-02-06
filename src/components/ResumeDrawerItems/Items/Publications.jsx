import { Fragment, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumePublications from '../../../store/actions/setResumePublications';

// Utils
import { varNameToString } from '../../../utils/utils';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Publications({ publications }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const setResumePublicationsState = useCallback(
        (newPublications) => {
            dispatch(setResumePublications(newPublications));
        },
        [dispatch]
    );

    const togglePublications = useCallback(() => {
        const currentState = publications?.enabled;
        setResumePublicationsState({
            ...publications,
            enabled: !currentState,
        });
    }, [publications, setResumePublicationsState]);

    const togglePublication = useCallback(
        (publication, index) => () => {
            const newPublications = { ...publications };
            newPublications.value[index] = {
                ...newPublications.value[index],
                enabled: !newPublications.value[index].enabled,
            };
            setResumePublicationsState(newPublications);
        },
        [publications, setResumePublicationsState]
    );

    const togglePublicationsDetail = useCallback(
        (publication, index, propName) => () => {
            const newPublications = { ...publications };
            newPublications.value[index] = {
                ...newPublications.value[index],
                value: {
                    ...newPublications.value[index].value,
                    [propName]: {
                        ...newPublications.value[index].value[propName],
                        enabled: !newPublications.value[index].value[propName].enabled,
                    },
                },
            };

            if (newPublications.value[index].enabled) {
                newPublications.value[index].enabled = Object.entries(newPublications.value[index].value).some(
                    (entry) => entry[1].enabled
                );
            }
            setResumePublicationsState(newPublications);
        },
        [publications, setResumePublicationsState]
    );

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label={varNameToString({ publications })}
                onChange={togglePublications}
                checked={publications?.enabled}
            />
            {publications?.enabled && (
                <ul>
                    {publications?.value.map((publication, index) => {
                        const { name, publisher, releaseDate, url, summary } = publication?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                <ItemsList
                                    label={name?.value}
                                    checked={publication?.enabled}
                                    onClick={togglePublication(publication, index)}
                                />
                                {publication?.enabled && (
                                    <ul>
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={togglePublicationsDetail(
                                                    publication,
                                                    index,
                                                    varNameToString({ name })
                                                )}
                                            />
                                        )}
                                        {publisher && (
                                            <ItemsList
                                                label={varNameToString({ publisher })}
                                                checked={publisher?.enabled}
                                                onClick={togglePublicationsDetail(
                                                    publication,
                                                    index,
                                                    varNameToString({ publisher })
                                                )}
                                            />
                                        )}
                                        {releaseDate && (
                                            <ItemsList
                                                label={varNameToString({ releaseDate })}
                                                checked={releaseDate?.enabled}
                                                onClick={togglePublicationsDetail(
                                                    publication,
                                                    index,
                                                    varNameToString({ releaseDate })
                                                )}
                                            />
                                        )}
                                        {url && (
                                            <ItemsList
                                                label={varNameToString({ url })}
                                                checked={url?.enabled}
                                                onClick={togglePublicationsDetail(
                                                    publication,
                                                    index,
                                                    varNameToString({ url })
                                                )}
                                            />
                                        )}
                                        {summary && (
                                            <ItemsList
                                                label={varNameToString({ summary })}
                                                checked={summary?.enabled}
                                                onClick={togglePublicationsDetail(
                                                    publication,
                                                    index,
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

export default memo(Publications);
