import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import setResumeAwards from '../../../../../store/actions/setResumeAwards';
import { varNameToString } from '../../../../../utils/utils';

// Redux stuff
const mapDispatchToProps = (dispatch) => ({
    setResumeAwards: (awards) => {
        dispatch(setResumeAwards(awards));
    },
});

class Awards extends Component {
    toggleAwards = () => {
        const currentState = this.props.awards.enabled;
        this.props.setResumeAwards({
            ...this.props.awards,
            enabled: !currentState,
        });
    };

    toggleAward = (award) => {
        const newAwards = { ...this.props.awards };
        newAwards.value =
            newAwards.value.map((awd) => {
                if (JSON.stringify(awd.value) === JSON.stringify(award.value)) {
                    return {
                        ...awd,
                        enabled: !awd.enabled,
                    };
                } else {
                    return awd;
                }
            });
        this.props.setResumeAwards(newAwards);
    };

    toggleAwardsDetail = (award, propName) => {
        const newAwards = { ...this.props.awards };
        newAwards.value =
            newAwards.value.map((awd) => {
                if (JSON.stringify(awd.value) === JSON.stringify(award.value)) {
                    return {
                        ...awd,
                        value: {
                            ...awd.value,
                            [propName]: {
                                ...awd.value[propName],
                                enabled: !awd.value[propName].enabled,
                            },
                        },
                    };
                } else {
                    return awd;
                }
            });
        this.props.setResumeAwards(newAwards);
    };

    render() {
        const { awards } = this.props;
        return (
            <div>
                <ItemInput
                    label="awards"
                    onChange={this.toggleAwards}
                    checked={awards.enabled}
                />
                {awards.enabled && (
                    <ul>
                        {awards.value.map((award) => {
                            const { title, date, awarder, summary } = award.value;
                            return (
                                <Fragment key={uuid()}>
                                    <ItemsList
                                        label={title.value}
                                        checked={award.enabled}
                                        onClick={() => this.toggleAward(award)}
                                    />
                                    {award.enabled && (
                                        <ul>
                                            <ItemsList
                                                label={varNameToString({ title })}
                                                checked={title.enabled}
                                                onClick={() => this.toggleAwardsDetail(
                                                    award,
                                                    varNameToString({ title })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ date })}
                                                checked={date.enabled}
                                                onClick={() => this.toggleAwardsDetail(
                                                    award,
                                                    varNameToString({ date })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ awarder })}
                                                checked={awarder.enabled}
                                                onClick={() => this.toggleAwardsDetail(
                                                    award,
                                                    varNameToString({ awarder })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ summary })}
                                                checked={summary.enabled}
                                                onClick={() => this.toggleAwardsDetail(
                                                    award,
                                                    varNameToString({ summary })
                                                )}
                                            />
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

export default connect(null, mapDispatchToProps)(Awards);
