import { Fragment, useCallback, memo } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/styles';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Utils
import { varNameToString } from '../../../utils/utils';

// Styles
import style from '../resumeDrawerStyles';

// Actions
import setResumeVolunteer from '../../../store/actions/setResumeVolunteer';

// Hooks
import { useDispatch } from '../../../store/StoreProvider';

const useStyles = makeStyles((theme) => ({
    ...style,
}));

function Volunteer({ volunteer: volunteerData }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const setResumeVolunteerState = useCallback(
        (volunteer) => {
            dispatch(setResumeVolunteer(volunteer));
        },
        [dispatch]
    );

    const toggleVolunteers = useCallback(() => {
        const currentState = volunteerData?.enabled;
        setResumeVolunteerState({
            ...volunteerData,
            enabled: !currentState,
        });
    }, [setResumeVolunteerState, volunteerData]);

    const toggleVolunteer = useCallback(
        (volunteer, index) => () => {
            const newVolunteer = { ...volunteerData };
            newVolunteer.value[index] = {
                ...newVolunteer.value[index],
                enabled: !newVolunteer.value[index].enabled,
            };
            setResumeVolunteerState(newVolunteer);
        },
        [setResumeVolunteerState, volunteerData]
    );

    const toggleVolunteerDetail = useCallback(
        (volunteer, index, propName) => () => {
            const newVolunteer = { ...volunteerData };
            newVolunteer.value[index] = {
                ...newVolunteer.value[index],
                value: {
                    ...newVolunteer.value[index].value,
                    [propName]: {
                        ...newVolunteer.value[index].value[propName],
                        enabled: !newVolunteer.value[index].value[propName].enabled,
                    },
                },
            };

            if (newVolunteer.value[index].enabled) {
                newVolunteer.value[index].enabled = Object.entries(newVolunteer.value[index].value).some(
                    (entry) => entry[1].enabled
                );
            }
            setResumeVolunteerState(newVolunteer);
        },
        [setResumeVolunteerState, volunteerData]
    );

    const toggleVolunteerHighlights = useCallback(
        (volunteer, volunteerIndex, highlight, highlightIndex) => () => {
            const newVolunteer = { ...volunteerData };
            newVolunteer.value[volunteerIndex].value.highlights.value[highlightIndex] = {
                ...newVolunteer.value[volunteerIndex].value.highlights.value[highlightIndex],
                enabled: !newVolunteer.value[volunteerIndex].value.highlights.value[highlightIndex].enabled,
            };
            setResumeVolunteerState(newVolunteer);
        },
        [setResumeVolunteerState, volunteerData]
    );

    const { enabled: volunteerEnabled, value: volunteers } = volunteerData || {};

    return (
        <div className={classes.resumeDrawerItem}>
            <ItemInput
                // TODO varNameToString({ volunteer })
                label="volunteer"
                onChange={toggleVolunteers}
                checked={volunteerEnabled}
            />
            {volunteerEnabled && (
                <ul>
                    {volunteers.map((volunteer, index) => {
                        const { organization, position, url, startDate, endDate, summary, highlights } =
                            volunteer?.value || {};

                        return (
                            <Fragment key={uuid()}>
                                {volunteer && (
                                    <ItemsList
                                        label={organization?.value}
                                        checked={volunteer?.enabled}
                                        onClick={toggleVolunteer(volunteer, index)}
                                    />
                                )}
                                {volunteer?.enabled && (
                                    <ul>
                                        {organization && (
                                            <ItemsList
                                                label={varNameToString({ organization })}
                                                checked={organization?.enabled}
                                                onClick={toggleVolunteerDetail(
                                                    volunteer,
                                                    index,
                                                    varNameToString({ organization })
                                                )}
                                            />
                                        )}
                                        {position && (
                                            <ItemsList
                                                label={varNameToString({ position })}
                                                checked={position?.enabled}
                                                onClick={toggleVolunteerDetail(
                                                    volunteer,
                                                    index,
                                                    varNameToString({ position })
                                                )}
                                            />
                                        )}
                                        {url && (
                                            <ItemsList
                                                label={varNameToString({ url })}
                                                checked={url?.enabled}
                                                onClick={toggleVolunteerDetail(
                                                    volunteer,
                                                    index,
                                                    varNameToString({ url })
                                                )}
                                            />
                                        )}
                                        {startDate && (
                                            <ItemsList
                                                label={varNameToString({ startDate })}
                                                checked={startDate?.enabled}
                                                onClick={toggleVolunteerDetail(
                                                    volunteer,
                                                    index,
                                                    varNameToString({ startDate })
                                                )}
                                            />
                                        )}
                                        {endDate && (
                                            <ItemsList
                                                label={varNameToString({ endDate })}
                                                checked={endDate?.enabled}
                                                onClick={toggleVolunteerDetail(
                                                    volunteer,
                                                    index,
                                                    varNameToString({ endDate })
                                                )}
                                            />
                                        )}
                                        {summary && (
                                            <ItemsList
                                                label={varNameToString({ summary })}
                                                checked={summary?.enabled}
                                                onClick={toggleVolunteerDetail(
                                                    volunteer,
                                                    index,
                                                    varNameToString({ summary })
                                                )}
                                            />
                                        )}
                                        {highlights && (
                                            <ItemsList
                                                label={varNameToString({ highlights })}
                                                checked={highlights?.enabled}
                                                onClick={toggleVolunteerDetail(
                                                    volunteer,
                                                    index,
                                                    varNameToString({ highlights })
                                                )}
                                            />
                                        )}
                                        {highlights?.enabled && (
                                            <ul>
                                                {highlights?.value.map((highlight, idx) => (
                                                    <ItemsList
                                                        label={highlight?.value}
                                                        key={uuid()}
                                                        checked={highlight?.enabled}
                                                        onClick={toggleVolunteerHighlights(
                                                            volunteer,
                                                            index,
                                                            highlight,
                                                            idx
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

export default memo(Volunteer);
