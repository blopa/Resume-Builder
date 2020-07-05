import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import style from '../resume-drawer-items.scss';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Utils
import { varNameToString } from '../../../../../utils/utils';

// Actions
import setResumeBasics from '../../../../../store/actions/setResumeBasics';

// Redux stuff
const mapDispatchToProps = (dispatch) => ({
    setResumeBasics: (basics) => {
        dispatch(setResumeBasics(basics));
    },
});

class Basics extends Component {
    toggleBasics = () => {
        const currentState = this.props.basics.enabled;
        this.props.setResumeBasics({
            ...this.props.basics,
            enabled: !currentState,
        });
    };

    toggleBasicsDetail = (propName) => {
        const currentState =
            this.props.basics.value[propName].enabled;
        this.props.setResumeBasics({
            ...this.props.basics,
            value: {
                ...this.props.basics.value,
                [propName]: {
                    ...this.props.basics.value[propName],
                    enabled: !currentState,
                },
            },
        });
    };

    toggleBasicsLocationDetail = (propName) => {
        const currentState =
            this.props.basics.value.location.value[propName].enabled;
        this.props.setResumeBasics({
            ...this.props.basics,
            value: {
                ...this.props.basics.value,
                location: {
                    ...this.props.basics.value.location,
                    value: {
                        ...this.props.basics.value.location.value,
                        [propName]: {
                            ...this.props.basics.value.location.value[propName],
                            enabled: !currentState,
                        },
                    },
                },
            },
        });
    };

    toggleBasicsProfilesDetail = (profile) => {
        const newBasics = { ...this.props.basics };
        newBasics.value.profiles.value =
            newBasics.value.profiles.value.map((pro) => {
                if (JSON.stringify(pro.value) === JSON.stringify(profile.value)) {
                    return {
                        ...pro,
                        enabled: !pro.enabled,
                    };
                }
                return pro;
            });
        this.props.setResumeBasics(newBasics);
    };

    render() {
        const {
            basics: {
                enabled: basicsEnabled,
                value: {
                    name,
                    label,
                    picture,
                    email,
                    phone,
                    website,
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
            },
        } = this.props;

        return (
            <div className={style['resume-drawer-items--item']}>
                <ItemInput
                    label="basics"
                    onChange={this.toggleBasics}
                    checked={basicsEnabled}
                />
                {basicsEnabled && (
                    <ul>
                        {name && (
                            <ItemsList
                                label={varNameToString({ name })}
                                checked={name.enabled}
                                onClick={() => this.toggleBasicsDetail(
                                    varNameToString({ name })
                                )}
                            />
                        )}
                        {label && (
                            <ItemsList
                                label={varNameToString({ label })}
                                checked={label.enabled}
                                onClick={() => this.toggleBasicsDetail(
                                    varNameToString({ label })
                                )}
                            />
                        )}
                        <ItemsList
                            label="location"
                            checked={locationEnabled}
                            onClick={() => this.toggleBasicsDetail(
                                'location'
                            )}
                        />
                        {locationEnabled && (
                            <ul>
                                {address && (
                                    <ItemsList
                                        label={varNameToString({ address })}
                                        checked={address.enabled}
                                        onClick={() => this.toggleBasicsLocationDetail(
                                            varNameToString({ address })
                                        )}
                                    />
                                )}
                                {city && (
                                    <ItemsList
                                        label={varNameToString({ city })}
                                        checked={city.enabled}
                                        onClick={() => this.toggleBasicsLocationDetail(
                                            varNameToString({ city })
                                        )}
                                    />
                                )}
                                {region && (
                                    <ItemsList
                                        label={varNameToString({ region })}
                                        checked={region.enabled}
                                        onClick={() => this.toggleBasicsLocationDetail(
                                            varNameToString({ region })
                                        )}
                                    />
                                )}
                                {postalCode && (
                                    <ItemsList
                                        label={varNameToString({ postalCode })}
                                        checked={postalCode.enabled}
                                        onClick={() => this.toggleBasicsLocationDetail(
                                            varNameToString({ postalCode })
                                        )}
                                    />
                                )}
                                {countryCode && (
                                    <ItemsList
                                        label={varNameToString({ countryCode })}
                                        checked={countryCode.enabled}
                                        onClick={() => this.toggleBasicsLocationDetail(
                                            varNameToString({ countryCode })
                                        )}
                                    />
                                )}
                            </ul>
                        )}
                        {website && (
                            <ItemsList
                                label={varNameToString({ website })}
                                checked={website.enabled}
                                onClick={() => this.toggleBasicsDetail(
                                    varNameToString({ website })
                                )}
                            />
                        )}
                        {phone && (
                            <ItemsList
                                label={varNameToString({ phone })}
                                checked={phone.enabled}
                                onClick={() => this.toggleBasicsDetail(
                                    varNameToString({ phone })
                                )}
                            />
                        )}
                        {email && (
                            <ItemsList
                                label={varNameToString({ email })}
                                checked={email.enabled}
                                onClick={() => this.toggleBasicsDetail(
                                    varNameToString({ email })
                                )}
                            />
                        )}
                        {profiles && (
                            <Fragment>
                                <ItemsList
                                    label={varNameToString({ profiles })}
                                    checked={profiles.enabled}
                                    onClick={() => this.toggleBasicsDetail(
                                        varNameToString({ profiles })
                                    )}
                                />
                                {profiles.enabled && (
                                    <ul>
                                        {profiles.value.map((profile) => {
                                            const { network } = profile.value;
                                            return (
                                                <ItemsList
                                                    label={network.value}
                                                    key={uuid()}
                                                    checked={profile.enabled}
                                                    onClick={() => this.toggleBasicsProfilesDetail(
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
                                checked={summary.enabled}
                                onClick={() => this.toggleBasicsDetail(
                                    varNameToString({ summary })
                                )}
                            />
                        )}
                    </ul>
                )}
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Basics);
