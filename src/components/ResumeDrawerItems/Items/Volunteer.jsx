import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

// Components
import { makeStyles } from '@material-ui/styles';
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Utils

// Actions
import style from '../resumeDrawerStyles';
import { varNameToString } from '../../../utils/utils';
import setResumeVolunteer from '../../../store/actions/setResumeVolunteer';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

// Redux stuff
const mapDispatchToProps = (dispatch) => ({
    setResumeVolunteer: (volunteer) => {
        dispatch(setResumeVolunteer(volunteer));
    },
});

class Volunteer extends Component {
    toggleVolunteers = () => {
        const currentState = this.props.volunteer.enabled;
        this.props.setResumeVolunteer({
            ...this.props.volunteer,
            enabled: !currentState,
        });
    };

    toggleVolunteer = (volunteer) => {
        const newVolunteer = { ...this.props.volunteer };
        newVolunteer.value =
            newVolunteer.value.map((wrk) => {
                if (JSON.stringify(wrk.value) === JSON.stringify(volunteer.value)) {
                    return {
                        ...wrk,
                        enabled: !wrk.enabled,
                    };
                }
                return wrk;
            });
        this.props.setResumeVolunteer(newVolunteer);
    };

    toggleVolunteerDetail = (volunteer, propName) => {
        const newVolunteer = { ...this.props.volunteer };
        newVolunteer.value =
            newVolunteer.value.map((vol) => {
                if (JSON.stringify(vol.value) === JSON.stringify(volunteer.value)) {
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
                }
                return vol;
            });
        this.props.setResumeVolunteer(newVolunteer);
    };

    toggleVolunteerHighlights = (volunteer, highlight) => {
        const newVolunteer = { ...this.props.volunteer };
        newVolunteer.value =
            newVolunteer.value.map((vol) => {
                if (JSON.stringify(vol.value) === JSON.stringify(volunteer.value)) {
                    return {
                        ...vol,
                        value: {
                            ...vol.value,
                            highlights: {
                                ...vol.value.highlights,
                                value: [
                                    ...vol.value.highlights.value.map((high) => {
                                        if (JSON.stringify(high.value) === JSON.stringify(highlight.value)) {
                                            return {
                                                ...high,
                                                enabled: !high.enabled,
                                            };
                                        }

                                        return high;
                                    }),
                                ],
                            },
                        },
                    };
                }
                return vol;
            });
        this.props.setResumeVolunteer(newVolunteer);
    };

    render() {
        const {
            volunteer: {
                enabled: volunteerEnabled,
                value: volunteers,
            },
        } = this.props;

        return (
            <div className={style.resumeDrawerItem}>
                <ItemInput
                    label="volunteer"
                    onChange={this.toggleVolunteers}
                    checked={volunteerEnabled}
                />
                {volunteerEnabled && (
                    <ul>
                        {volunteers.map((volunteer) => {
                            const {
                                organization,
                                position,
                                website,
                                startDate,
                                endDate,
                                summary,
                                highlights,
                            } = volunteer.value;

                            return (
                                <Fragment key={uuid()}>
                                    <ItemsList
                                        label={organization.value}
                                        checked={volunteer.enabled}
                                        onClick={() => this.toggleVolunteer(volunteer)}
                                    />
                                    {volunteer.enabled && (
                                        <ul>
                                            <ItemsList
                                                label={varNameToString({ organization })}
                                                checked={organization.enabled}
                                                onClick={() => this.toggleVolunteerDetail(
                                                    volunteer,
                                                    varNameToString({ organization })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ position })}
                                                checked={position.enabled}
                                                onClick={() => this.toggleVolunteerDetail(
                                                    volunteer,
                                                    varNameToString({ position })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ website })}
                                                checked={website.enabled}
                                                onClick={() => this.toggleVolunteerDetail(
                                                    volunteer,
                                                    varNameToString({ website })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ startDate })}
                                                checked={startDate.enabled}
                                                onClick={() => this.toggleVolunteerDetail(
                                                    volunteer,
                                                    varNameToString({ startDate })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ endDate })}
                                                checked={endDate.enabled}
                                                onClick={() => this.toggleVolunteerDetail(
                                                    volunteer,
                                                    varNameToString({ endDate })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ summary })}
                                                checked={summary.enabled}
                                                onClick={() => this.toggleVolunteerDetail(
                                                    volunteer,
                                                    varNameToString({ summary })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ highlights })}
                                                checked={highlights.enabled}
                                                onClick={() => this.toggleVolunteerDetail(
                                                    volunteer,
                                                    varNameToString({ highlights })
                                                )}
                                            />
                                            {highlights.enabled && (
                                                <ul>
                                                    {highlights.value.map((highlight) => (
                                                        <ItemsList
                                                            label={highlight.value}
                                                            key={uuid()}
                                                            checked={highlight.enabled}
                                                            onClick={() => this.toggleVolunteerHighlights(
                                                                volunteer,
                                                                highlight
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

export default connect(null, mapDispatchToProps)(Volunteer);
