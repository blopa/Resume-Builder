import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Utils
import { varNameToString } from '../../../../../utils/utils';

// Actions
import setResumeInterests from '../../../../../store/actions/setResumeInterests';
import style from "../resume-drawer-items.scss";

// Redux stuff
const mapDispatchToProps = (dispatch) => ({
    setResumeInterests: (interest) => {
        dispatch(setResumeInterests(interest));
    },
});

class Interest extends Component {
    toggleInterests = () => {
        const currentState = this.props.interests.enabled;
        this.props.setResumeInterests({
            ...this.props.interests,
            enabled: !currentState,
        });
    };

    toggleInterest = (interest) => {
        const newInterest = { ...this.props.interests };
        newInterest.value =
            newInterest.value.map((wrk) => {
                if (JSON.stringify(wrk.value) === JSON.stringify(interest.value)) {
                    return {
                        ...wrk,
                        enabled: !wrk.enabled,
                    };
                } else {
                    return wrk;
                }
            });
        this.props.setResumeInterests(newInterest);
    };

    toggleInterestDetail = (interest, propName) => {
        const newInterest = { ...this.props.interests };
        newInterest.value =
            newInterest.value.map((vol) => {
                if (JSON.stringify(vol.value) === JSON.stringify(interest.value)) {
                    return {
                        ...vol,
                        value: {
                            ...vol.value,
                            [propName]: {
                                ...vol.value[propName],
                                enabled: !vol.value[propName].enabled,
                            },
                        },
                    };
                } else {
                    return vol;
                }
            });
        this.props.setResumeInterests(newInterest);
    };

    toggleInterestKeywords = (interest, keyword) => {
        const newInterest = { ...this.props.interests };
        newInterest.value =
            newInterest.value.map((vol) => {
                if (JSON.stringify(vol.value) === JSON.stringify(interest.value)) {
                    return {
                        ...vol,
                        value: {
                            ...vol.value,
                            keywords: {
                                ...vol.value.keywords,
                                value: [
                                    ...vol.value.keywords.value.map((key) => {
                                        if (JSON.stringify(key.value) === JSON.stringify(keyword.value)) {
                                            return {
                                                ...key,
                                                enabled: !key.enabled,
                                            };
                                        }

                                        return key;
                                    }),
                                ],
                            },
                        },
                    };
                } else {
                    return vol;
                }
            });
        this.props.setResumeInterests(newInterest);
    };

    render() {
        const { interests } = this.props;

        return (
            <div className={style['resume-drawer-items--item']}>
                <ItemInput
                    label="interest"
                    onChange={this.toggleInterests}
                    checked={interests.enabled}
                />
                {interests.enabled && (
                    <ul>
                        {interests.value.map((interest) => {
                            const { name, keywords } = interest.value;

                            return (
                                <Fragment key={uuid()}>
                                    <ItemsList
                                        label={name.value}
                                        checked={interest.enabled}
                                        onClick={() => this.toggleInterest(interest)}
                                    />
                                    {interest.enabled && (
                                        <ul>
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name.enabled}
                                                onClick={() => this.toggleInterestDetail(
                                                    interest,
                                                    varNameToString({ name })
                                                )}
                                            />
                                            {keywords.enabled && (
                                                <ul>
                                                    {keywords.value.map((keyword) => (
                                                        <ItemsList
                                                            label={keyword.value}
                                                            key={uuid()}
                                                            checked={keyword.enabled}
                                                            onClick={() => this.toggleInterestKeywords(
                                                                interest,
                                                                keyword
                                                            )}
                                                        />
                                                    ))}
                                                </ul>
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
}

export default connect(null, mapDispatchToProps)(Interest);
