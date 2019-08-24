import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

// Utils
import { varNameToString, capitalize } from '../../../../../utils/utils';

// Actions
import setResumeBasics from '../../../../../store/actions/setResumeBasics';

const mapStateToProps = (state) => ({ storeData: state });
const mapDispatchToProps = (dispatch) => ({
    setResumeBasics: (basics) => {
        dispatch(setResumeBasics(basics));
    },
});

// Stateless components
const BasicsLi = ({ onClick, label, checked }) => (
    <li key={uuid()}>
        <BasicsInput
            onClick={onClick}
            label={label}
            checked={checked}
        />
    </li>
);

const BasicsInput = ({ onClick, label, checked }) => {
    const id = uuid();
    return (
        <Fragment>
            <input
                type="checkbox"
                onClick={onClick}
                id={id}
                checked={checked}
            />
            <label htmlFor={id}>
                {capitalize(label)}
            </label>
        </Fragment>
    );
};

class Basics extends Component {
    getNewBasicsDetailObject = (propName, newState) => ({
        ...this.props.basics,
        value: {
            ...this.props.basics.value,
            [propName]: {
                ...this.props.basics.value[propName],
                enabled: newState,
            },
        },
    });

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
        this.props.setResumeBasics(this.getNewBasicsDetailObject(
            propName,
            !currentState
        ));
    };

    toggleAddress = () => {
        const currentState =
            this.props.basics.value.location.value.address.enabled;
        this.props.setResumeBasics({
            ...this.props.basics,
            value: {
                ...this.props.basics.value,
                location: {
                    ...this.props.basics.value.location,
                    value: {
                        ...this.props.basics.value.location.value,
                        address: {
                            ...this.props.basics.value.location.value.address,
                            enabled: !currentState,
                        },
                    },
                },
            },
        });
    };

    toggleCity = () => {
        const currentState =
            this.props.basics.value.location.value.city.enabled;
        this.props.setResumeBasics({
            ...this.props.basics,
            value: {
                ...this.props.basics.value,
                location: {
                    ...this.props.basics.value.location,
                    value: {
                        ...this.props.basics.value.location.value,
                        city: {
                            ...this.props.basics.value.location.value.city,
                            enabled: !currentState,
                        },
                    },
                },
            },
        });
    };

    toggleRegion = () => {
        const currentState =
            this.props.basics.value.location.value.region.enabled;
        this.props.setResumeBasics({
            ...this.props.basics,
            value: {
                ...this.props.basics.value,
                location: {
                    ...this.props.basics.value.location,
                    value: {
                        ...this.props.basics.value.location.value,
                        region: {
                            ...this.props.basics.value.location.value.region,
                            enabled: !currentState,
                        },
                    },
                },
            },
        });
    };

    togglePortalCode = () => {
        const currentState =
            this.props.basics.value.location.value.postalCode.enabled;
        this.props.setResumeBasics({
            ...this.props.basics,
            value: {
                ...this.props.basics.value,
                location: {
                    ...this.props.basics.value.location,
                    value: {
                        ...this.props.basics.value.location.value,
                        postalCode: {
                            ...this.props.basics.value.location.value.postalCode,
                            enabled: !currentState,
                        },
                    },
                },
            },
        });
    };

    toggleCountryCode = () => {
        const currentState =
            this.props.basics.value.location.value.countryCode.enabled;
        this.props.setResumeBasics({
            ...this.props.basics,
            value: {
                ...this.props.basics.value,
                location: {
                    ...this.props.basics.value.location,
                    value: {
                        ...this.props.basics.value.location.value,
                        countryCode: {
                            ...this.props.basics.value.location.value.countryCode,
                            enabled: !currentState,
                        },
                    },
                },
            },
        });
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
            <div>
                <BasicsInput
                    label="basics"
                    onClick={this.toggleBasics}
                    checked={basicsEnabled}
                />
                {basicsEnabled && (
                    <ul>
                        {name && (
                            <BasicsLi
                                label={varNameToString({ name })}
                                checked={name.enabled}
                                onClick={() => this.toggleBasicsDetail(
                                    varNameToString({ name })
                                )}
                            />
                        )}
                        {label && (
                            <BasicsLi
                                label={varNameToString({ label })}
                                checked={label.enabled}
                                onClick={() => this.toggleBasicsDetail(
                                    varNameToString({ label })
                                )}
                            />
                        )}
                        <Fragment>
                            <BasicsLi
                                label="location"
                                checked={locationEnabled}
                                onClick={() => this.toggleBasicsDetail(
                                    'location'
                                )}
                            />
                            {locationEnabled && (
                                <ul>
                                    {address && (
                                        <BasicsLi
                                            label={varNameToString({ address })}
                                            checked={address.enabled}
                                            onClick={this.toggleAddress}
                                        />
                                    )}
                                    {city && (
                                        <BasicsLi
                                            label={varNameToString({ city })}
                                            checked={city.enabled}
                                            onClick={this.toggleCity}
                                        />
                                    )}
                                    {region && (
                                        <BasicsLi
                                            label={varNameToString({ region })}
                                            checked={region.enabled}
                                            onClick={this.toggleRegion}
                                        />
                                    )}
                                    {postalCode && (
                                        <BasicsLi
                                            label={varNameToString({ postalCode })}
                                            checked={postalCode.enabled}
                                            onClick={this.togglePortalCode}
                                        />
                                    )}
                                    {countryCode && (
                                        <BasicsLi
                                            label={varNameToString({ countryCode })}
                                            checked={countryCode.enabled}
                                            onClick={this.toggleCountryCode}
                                        />
                                    )}
                                </ul>
                            )}
                        </Fragment>
                        {website && (
                            <BasicsLi
                                label={varNameToString({ website })}
                                checked={website.enabled}
                                onClick={() => this.toggleBasicsDetail(
                                    varNameToString({ website })
                                )}
                            />
                        )}
                        {phone && (
                            <BasicsLi
                                label={varNameToString({ phone })}
                                checked={phone.enabled}
                                onClick={() => this.toggleBasicsDetail(
                                    varNameToString({ phone })
                                )}
                            />
                        )}
                        {email && (
                            <BasicsLi
                                label={varNameToString({ email })}
                                checked={email.enabled}
                                onClick={() => this.toggleBasicsDetail(
                                    varNameToString({ email })
                                )}
                            />
                        )}
                        {profiles && (
                            <Fragment>
                                <BasicsLi
                                    label={varNameToString({ profiles })}
                                    checked={profiles.enabled}
                                    onClick={() => this.toggleBasicsDetail(
                                        varNameToString({ profiles })
                                    )}
                                />
                                {profiles.enabled && (
                                    <ul>
                                        {profiles.value.map((profile) => {
                                            if (profile.enabled) {
                                                const { network } = profile.value;
                                                return (
                                                    <BasicsLi
                                                        label={network.value}
                                                    />
                                                );
                                            }

                                            return null;
                                        })}
                                    </ul>
                                )}
                            </Fragment>
                        )}
                        {summary && (
                            <BasicsLi
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

export default connect(mapStateToProps, mapDispatchToProps)(Basics);
