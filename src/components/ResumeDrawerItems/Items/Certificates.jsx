import { Fragment, useCallback, memo } from 'react';
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

    const setResumeCertificatesState = useCallback(
        (newCertificates) => {
            dispatch(setResumeCertificates(newCertificates));
        },
        [dispatch]
    );

    const toggleCertificates = useCallback(() => {
        const currentState = certificates?.enabled;
        setResumeCertificatesState({
            ...certificates,
            enabled: !currentState,
        });
    }, [certificates, setResumeCertificatesState]);

    const toggleCertificate = useCallback(
        (certificate, index) => () => {
            const newCertificates = { ...certificates };
            newCertificates.value[index] = {
                ...newCertificates.value[index],
                enabled: !newCertificates.value[index].enabled,
            };
            setResumeCertificatesState(newCertificates);
        },
        [certificates, setResumeCertificatesState]
    );

    const toggleCertificatesDetail = useCallback(
        (certificate, index, propName) => () => {
            const newCertificates = { ...certificates };
            newCertificates.value[index] = {
                ...newCertificates.value[index],
                value: {
                    ...newCertificates.value[index].value,
                    [propName]: {
                        ...newCertificates.value[index].value[propName],
                        enabled: !newCertificates.value[index].value[propName].enabled,
                    },
                },
            };

            if (newCertificates.value[index].enabled) {
                newCertificates.value[index].enabled = Object.entries(newCertificates.value[index].value).some(
                    (entry) => entry[1].enabled
                );
            }
            setResumeCertificatesState(newCertificates);
        },
        [certificates, setResumeCertificatesState]
    );

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label={varNameToString({ certificates })}
                onChange={toggleCertificates}
                checked={certificates?.enabled}
            />
            {certificates?.enabled && (
                <ul>
                    {certificates?.value.map((certificate, index) => {
                        const { name, date, url, issuer } = certificate?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                <ItemsList
                                    label={name?.value}
                                    checked={certificate?.enabled}
                                    onClick={toggleCertificate(certificate, index)}
                                />
                                {certificate?.enabled && (
                                    <ul>
                                        {name && (
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name?.enabled}
                                                onClick={toggleCertificatesDetail(
                                                    certificate,
                                                    index,
                                                    varNameToString({ name })
                                                )}
                                            />
                                        )}
                                        {date && (
                                            <ItemsList
                                                label={varNameToString({ date })}
                                                checked={date?.enabled}
                                                onClick={toggleCertificatesDetail(
                                                    certificate,
                                                    index,
                                                    varNameToString({ date })
                                                )}
                                            />
                                        )}
                                        {issuer && (
                                            <ItemsList
                                                label={varNameToString({ issuer })}
                                                checked={issuer?.enabled}
                                                onClick={toggleCertificatesDetail(
                                                    certificate,
                                                    index,
                                                    varNameToString({ issuer })
                                                )}
                                            />
                                        )}
                                        {url && (
                                            <ItemsList
                                                label={varNameToString({ url })}
                                                checked={url?.enabled}
                                                onClick={toggleCertificatesDetail(
                                                    certificate,
                                                    index,
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
