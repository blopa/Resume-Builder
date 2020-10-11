import React, { Fragment, useContext, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';

// Components
import { makeStyles } from '@material-ui/styles';
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import style from '../resumeDrawerStyles';
import setResumePublications from '../../../store/actions/setResumePublications';
import { varNameToString } from '../../../utils/utils';
import { StoreContext } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Publications({ publications }) {
    const classes = useStyles();
    const { state, dispatch } = useContext(StoreContext);

    const setResumePublicationsState = useCallback((newPublications) => {
        dispatch(setResumePublications(newPublications));
    }, []);

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
                            website,
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
                                        {website && (
                                            <ItemsList
                                                label={varNameToString({ website })}
                                                checked={website?.enabled}
                                                onClick={togglePublicationsDetail(
                                                    publication,
                                                    varNameToString({ website })
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
