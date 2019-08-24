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
                                            onClick={() => this.toggleBasicsLocationDetail(
                                                varNameToString({ address })
                                            )}
                                        />
                                    )}
                                    {city && (
                                        <BasicsLi
                                            label={varNameToString({ city })}
                                            checked={city.enabled}
                                            onClick={() => this.toggleBasicsLocationDetail(
                                                varNameToString({ city })
                                            )}
                                        />
                                    )}
                                    {region && (
                                        <BasicsLi
                                            label={varNameToString({ region })}
                                            checked={region.enabled}
                                            onClick={() => this.toggleBasicsLocationDetail(
                                                varNameToString({ region })
                                            )}
                                        />
                                    )}
                                    {postalCode && (
                                        <BasicsLi
                                            label={varNameToString({ postalCode })}
                                            checked={postalCode.enabled}
                                            onClick={() => this.toggleBasicsLocationDetail(
                                                varNameToString({ postalCode })
                                            )}
                                        />
                                    )}
                                    {countryCode && (
                                        <BasicsLi
                                            label={varNameToString({ countryCode })}
                                            checked={countryCode.enabled}
                                            onClick={() => this.toggleBasicsLocationDetail(
                                                varNameToString({ countryCode })
                                            )}
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
