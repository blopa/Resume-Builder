import React, { Fragment, useCallback, memo } from 'react';
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

    const setResumePublicationsState = useCallback((newPublications) => {
        dispatch(setResumePublications(newPublications));
    }, [dispatch]);

    const togglePublications = () => {
        const currentState = publications?.enabled;
        setResumePublicationsState({
            ...publications,
            enabled: !currentState,
        });
    };

    const togglePublication = useCallback((publication) => () => {
        const newPublications = { ...publications };
        newPublications.value =
            newPublications?.value.map((pub) => {
                if (JSON.stringify(pub?.value) === JSON.stringify(publication?.value)) {
                    return {
                        ...pub,
                        enabled: !pub?.enabled,
                    };
                }
                return pub;
            });
        setResumePublicationsState(newPublications);
    }, [publications, setResumePublicationsState]);

    const togglePublicationsDetail = useCallback((publication, propName) => () => {
        const newPublications = { ...publications };
        newPublications.value =
            newPublications?.value.map((pub) => {
                if (JSON.stringify(pub?.value) === JSON.stringify(publication?.value)) {
                    return {
                        ...pub,
                        value: {
                            ...pub?.value,
                            [propName]: {
                                ...pub?.value[propName],
                                enabled: !pub?.value[propName]?.enabled,
                            },
                        },
                    };
                }
                return pub;
            });
        setResumePublicationsState(newPublications);
    }, [publications, setResumePublicationsState]);

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="publications"
                onChange={togglePublications}
                checked={publications?.enabled}
            />
            {publications?.enabled && (
                <ul>
                    {publications?.value.map((publication) => {
                        const {
                            name,
                            publisher,
                            releaseDate,
                            url,
                            summary,
                        } = publication?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                <ItemsList
                                    label={name?.value}
                                    checked={publication?.enabled}
                                    onClick={togglePublication(publication)}
                                />
                                {publication?.enabled && (
                                    <ul>
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={togglePublicationsDetail(
                                                    publication,
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
