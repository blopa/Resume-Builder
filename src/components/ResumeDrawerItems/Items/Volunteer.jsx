import React, { Fragment, useContext } from 'react';
import { v4 as uuid } from 'uuid';

// Components
import { makeStyles } from '@material-ui/styles';
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Utils
import { varNameToString } from '../../../utils/utils';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumeVolunteer from '../../../store/actions/setResumeVolunteer';

// Context
import { StoreContext } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Volunteer({ volunteer: volunteerData }) {
    const classes = useStyles();
    const { state, dispatch } = useContext(StoreContext);
    const setResumeVolunteerState = (volunteer) => {
        dispatch(setResumeVolunteer(volunteer));
    };

    const toggleVolunteers = () => {
        const currentState = volunteerData.enabled;
        setResumeVolunteerState({
            ...volunteerData,
            enabled: !currentState,
        });
    };

    const toggleVolunteer = (volunteer) => {
        const newVolunteer = { ...volunteerData };
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
        setResumeVolunteerState(newVolunteer);
    };

    const toggleVolunteerDetail = (volunteer, propName) => {
        const newVolunteer = { ...volunteerData };
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
        setResumeVolunteerState(newVolunteer);
    };

    const toggleVolunteerHighlights = (volunteer, highlight) => {
        const newVolunteer = { ...volunteerData };
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
        setResumeVolunteerState(newVolunteer);
    };

    const {
        enabled: volunteerEnabled,
        value: volunteers,
    } = volunteerData;

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                label="volunteer"
                onChange={toggleVolunteers}
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
                                    onClick={() => toggleVolunteer(volunteer)}
                                />
                                {volunteer.enabled && (
                                    <ul>
                                        <ItemsList
                                            label={varNameToString({ organization })}
                                            checked={organization.enabled}
                                            onClick={() => toggleVolunteerDetail(
                                                volunteer,
                                                varNameToString({ organization })
                                            )}
                                        />
                                        <ItemsList
                                            label={varNameToString({ position })}
                                            checked={position.enabled}
                                            onClick={() => toggleVolunteerDetail(
                                                volunteer,
                                                varNameToString({ position })
                                            )}
                                        />
                                        <ItemsList
                                            label={varNameToString({ website })}
                                            checked={website.enabled}
                                            onClick={() => toggleVolunteerDetail(
                                                volunteer,
                                                varNameToString({ website })
                                            )}
                                        />
                                        <ItemsList
                                            label={varNameToString({ startDate })}
                                            checked={startDate.enabled}
                                            onClick={() => toggleVolunteerDetail(
                                                volunteer,
                                                varNameToString({ startDate })
                                            )}
                                        />
                                        <ItemsList
                                            label={varNameToString({ endDate })}
                                            checked={endDate.enabled}
                                            onClick={() => toggleVolunteerDetail(
                                                volunteer,
                                                varNameToString({ endDate })
                                            )}
                                        />
                                        <ItemsList
                                            label={varNameToString({ summary })}
                                            checked={summary.enabled}
                                            onClick={() => toggleVolunteerDetail(
                                                volunteer,
                                                varNameToString({ summary })
                                            )}
                                        />
                                        <ItemsList
                                            label={varNameToString({ highlights })}
                                            checked={highlights.enabled}
                                            onClick={() => toggleVolunteerDetail(
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
                                                        onClick={() => toggleVolunteerHighlights(
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

export default Volunteer;
