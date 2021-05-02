import React, { Fragment, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumeCertificates from '../../../store/actions/setResumeCertificates';

// Utils
import { varNameToString } from '../../../utils/utils';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Certificates({ certificates }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const setResumeCertificatesState = useCallback((newCertificates) => {
        dispatch(setResumeCertificates(newCertificates));
    }, [dispatch]);

    const toggleCertificates = () => {
        const currentState = certificates?.enabled;
        setResumeCertificatesState({
            ...certificates,
            enabled: !currentState,
        });
    };

    const toggleAward = useCallback((award) => () => {
        const newCertificates = { ...certificates };
        newCertificates.value =
            newCertificates?.value.map((awd) => {
                if (JSON.stringify(awd?.value) === JSON.stringify(award?.value)) {
                    return {
                        ...awd,
                        enabled: !awd?.enabled,
                    };
                }
                return awd;
            });
        setResumeCertificatesState(newCertificates);
    }, [certificates, setResumeCertificatesState]);

    const toggleCertificatesDetail = useCallback((award, propName) => () => {
        const newCertificates = { ...certificates };
        newCertificates.value =
            newCertificates?.value.map((awd) => {
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
        setResumeCertificatesState(newCertificates);
    }, [certificates, setResumeCertificatesState]);

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="certificates"
                onChange={toggleCertificates}
                checked={certificates?.enabled}
            />
            {certificates?.enabled && (
                <ul>
                    {certificates?.value.map((award) => {
                        const {
                            name,
                            date,
                            url,
                            issuer,
                        } = award?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                <ItemsList
                                    label={name?.value}
                                    checked={award?.enabled}
                                    onClick={toggleAward(award)}
                                />
                                {award?.enabled && (
                                    <ul>
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={toggleCertificatesDetail(
                                                    award,
                                                    varNameToString({ name })
                                                )}
                                            />
                                        )}
                                        {date && (
                                            <ItemsList
                                                label={varNameToString({ date })}
                                                checked={date?.enabled}
                                                onClick={toggleCertificatesDetail(
                                                    award,
                                                    varNameToString({ date })
                                                )}
                                            />
                                        )}
                                        {issuer && (
                                            <ItemsList
                                                label={varNameToString({ issuer })}
                                                checked={issuer?.enabled}
                                                onClick={toggleCertificatesDetail(
                                                    award,
                                                    varNameToString({ issuer })
                                                )}
                                            />
                                        )}
                                        {url && (
                                            <ItemsList
                                                label={varNameToString({ url })}
                                                checked={url?.enabled}
                                                onClick={toggleCertificatesDetail(
                                                    award,
                                                    varNameToString({ url })
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

export default memo(Certificates);
