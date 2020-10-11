import React, { Fragment, useContext, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';
import style from '../resumeDrawerStyles';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Utils
// Actions
import { varNameToString } from '../../../utils/utils';
import setResumeBasics from '../../../store/actions/setResumeBasics';
import { StoreContext } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Basics({ basics }) {
    const classes = useStyles();
    const { state, dispatch } = useContext(StoreContext);

    const setResumeBasicsState = useCallback((newBasics) => {
        dispatch(setResumeBasics(newBasics));
    }, []);

    const toggleBasics = () => {
        const currentState = basics?.enabled;
        setResumeBasicsState({
            ...basics,
            enabled: !currentState,
        });
    };

    const toggleBasicsDetail = useCallback((propName) => () => {
        const currentState = basics?.value[propName]?.enabled;
        setResumeBasicsState({
            ...basics,
            value: {
                ...basics?.value,
                [propName]: {
                    ...basics?.value[propName],
                    enabled: !currentState,
                },
            },
        });
    }, [basics, setResumeBasicsState]);

    const toggleBasicsLocationDetail = useCallback((propName) => () => {
        const currentState = basics?.value.location?.value[propName]?.enabled;
        setResumeBasicsState({
            ...basics,
            value: {
                ...basics?.value,
                location: {
                    ...basics?.value.location,
                    value: {
                        ...basics?.value.location?.value,
                        [propName]: {
                            ...basics?.value.location?.value[propName],
                            enabled: !currentState,
                        },
                    },
                },
            },
        });
    }, [basics, setResumeBasicsState]);

    const toggleBasicsProfilesDetail = useCallback((profile) => () => {
        const newBasics = { ...basics };
        newBasics.value.profiles.value =
            newBasics?.value.profiles?.value.map((pro) => {
                if (JSON.stringify(pro?.value) === JSON.stringify(profile?.value)) {
                    return {
                        ...pro,
                        enabled: !pro?.enabled,
                    };
                }
                return pro;
            });
        setResumeBasicsState(newBasics);
    }, [basics, setResumeBasicsState]);

    const {
        enabled: basicsEnabled,
        value: {
            name,
            label,
            picture,
            email,
            phone,
            website,
            url,
            summary,
            location: {
                enabled: locationEnabled,
                value: {
                    address,
                    postalCode,
                    city,
                    countryCode,
                    region,
                },
            },
            profiles,
        },
    } = basics || {};

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="basics"
                onChange={toggleBasics}
                checked={basicsEnabled}
            />
            {basicsEnabled && (
                <ul>
                    {name && (
                        <ItemsList
                            label={varNameToString({ name })}
                            checked={name?.enabled}
                            onClick={toggleBasicsDetail(
                                varNameToString({ name })
                            )}
                        />
                    )}
                    {label && (
                        <ItemsList
                            label={varNameToString({ label })}
                            checked={label?.enabled}
                            onClick={toggleBasicsDetail(
                                varNameToString({ label })
                            )}
                        />
                    )}
                    <ItemsList
                        label="location"
                        checked={locationEnabled}
                        onClick={toggleBasicsDetail(
                            'location'
                        )}
                    />
                    {locationEnabled && (
                        <ul>
                            {address && (
                                <ItemsList
                                    label={varNameToString({ address })}
                                    checked={address?.enabled}
                                    onClick={toggleBasicsLocationDetail(
                                        varNameToString({ address })
                                    )}
                                />
                            )}
                            {city && (
                                <ItemsList
                                    label={varNameToString({ city })}
                                    checked={city?.enabled}
                                    onClick={toggleBasicsLocationDetail(
                                        varNameToString({ city })
                                    )}
                                />
                            )}
                            {region && (
                                <ItemsList
                                    label={varNameToString({ region })}
                                    checked={region?.enabled}
                                    onClick={toggleBasicsLocationDetail(
                                        varNameToString({ region })
                                    )}
                                />
                            )}
                            {postalCode && (
                                <ItemsList
                                    label={varNameToString({ postalCode })}
                                    checked={postalCode?.enabled}
                                    onClick={toggleBasicsLocationDetail(
                                        varNameToString({ postalCode })
                                    )}
                                />
                            )}
                            {countryCode && (
                                <ItemsList
                                    label={varNameToString({ countryCode })}
                                    checked={countryCode?.enabled}
                                    onClick={toggleBasicsLocationDetail(
                                        varNameToString({ countryCode })
                                    )}
                                />
                            )}
                        </ul>
                    )}
                    {website && (
                        <ItemsList
                            label={varNameToString({ website })}
                            checked={website?.enabled}
                            onClick={toggleBasicsDetail(
                                varNameToString({ website })
                            )}
                        />
                    )}
                    {url && (
                        <ItemsList
                            label={varNameToString({ url })}
                            checked={url?.enabled}
                            onClick={toggleBasicsDetail(
                                varNameToString({ url })
                            )}
                        />
                    )}
                    {phone && (
                        <ItemsList
                            label={varNameToString({ phone })}
                            checked={phone?.enabled}
                            onClick={toggleBasicsDetail(
                                varNameToString({ phone })
                            )}
                        />
                    )}
                    {email && (
                        <ItemsList
                            label={varNameToString({ email })}
                            checked={email?.enabled}
                            onClick={toggleBasicsDetail(
                                varNameToString({ email })
                            )}
                        />
                    )}
                    {profiles && (
                        <Fragment>
                            {profiles && (
                                <ItemsList
                                    label={varNameToString({ profiles })}
                                    checked={profiles?.enabled}
                                    onClick={toggleBasicsDetail(
                                        varNameToString({ profiles })
                                    )}
                                />
                            )}
                            {profiles?.enabled && (
                                <ul>
                                    {profiles?.value.map((profile) => {
                                        const { network } = profile?.value || {};
                                        return (
                                            <ItemsList
                                                label={network?.value}
                                                key={uuid()}
                                                checked={profile?.enabled}
                                                onClick={toggleBasicsProfilesDetail(
                                                    profile
                                                )}
                                            />
                                        );
                                    })}
                                </ul>
                            )}
                        </Fragment>
                    )}
                    {summary && (
                        <ItemsList
                            label={varNameToString({ summary })}
                            checked={summary?.enabled}
                            onClick={toggleBasicsDetail(
                                varNameToString({ summary })
                            )}
                        />
                    )}
                </ul>
            )}
        </div>
    );
}

export default memo(Basics);
