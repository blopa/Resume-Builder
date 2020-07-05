import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import setResumeEducation from '../../../../../store/actions/setResumeEducation';
import { varNameToString } from '../../../../../utils/utils';
import style from '../resume-drawer-items.scss';

// Redux stuff
const mapDispatchToProps = (dispatch) => ({
    setResumeEducation: (education) => {
        dispatch(setResumeEducation(education));
    },
});

class Education extends Component {
    toggleEducations = () => {
        const currentState = this.props.education.enabled;
        this.props.setResumeEducation({
            ...this.props.education,
            enabled: !currentState,
        });
    };

    toggleEducation = (education) => {
        const newEducation = { ...this.props.education };
        newEducation.value =
            newEducation.value.map((edu) => {
                if (JSON.stringify(edu.value) === JSON.stringify(education.value)) {
                    return {
                        ...edu,
                        enabled: !edu.enabled,
                    };
                }
                return edu;
            });
        this.props.setResumeEducation(newEducation);
    };

    toggleEducationDetail = (education, propName) => {
        const newEducation = { ...this.props.education };
        newEducation.value =
            newEducation.value.map((edu) => {
                if (JSON.stringify(edu.value) === JSON.stringify(education.value)) {
                    return {
                        ...edu,
                        value: {
                            ...edu.value,
                            [propName]: {
                                ...edu.value[propName],
                                enabled: !edu.value[propName].enabled,
                            },
                        },
                    };
                }
                return edu;
            });
        this.props.setResumeEducation(newEducation);
    };

    render() {
        const { education: educations } = this.props;
        return (
            <div className={style['resume-drawer-items--item']}>
                <ItemInput
                    label="education"
                    checked={educations.enabled}
                    onChange={this.toggleEducations}
                />
                {educations.enabled && (
                    <ul>
                        {educations.value.map((education) => {
                            const {
                                institution,
                                area,
                                studyType,
                                startDate,
                                endDate,
                                gpa,
                                courses,
                            } = education.value;
                            return (
                                <Fragment key={uuid()}>
                                    <ItemsList
                                        label={institution.value}
                                        checked={educations.enabled}
                                        onClick={() => this.toggleEducation(
                                            education
                                        )}
                                    />
                                    {educations.enabled && (
                                        <ul>
                                            <ItemsList
                                                label={varNameToString({ institution })}
                                                checked={institution.enabled}
                                                onClick={() => this.toggleEducationDetail(
                                                    education,
                                                    varNameToString({ institution })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ area })}
                                                checked={area.enabled}
                                                onClick={() => this.toggleEducationDetail(
                                                    education,
                                                    varNameToString({ area })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ studyType })}
                                                checked={studyType.enabled}
                                                onClick={() => this.toggleEducationDetail(
                                                    education,
                                                    varNameToString({ studyType })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ startDate })}
                                                checked={startDate.enabled}
                                                onClick={() => this.toggleEducationDetail(
                                                    education,
                                                    varNameToString({ startDate })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ endDate })}
                                                checked={endDate.enabled}
                                                onClick={() => this.toggleEducationDetail(
                                                    education,
                                                    varNameToString({ endDate })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ gpa })}
                                                checked={gpa.enabled}
                                                onClick={() => this.toggleEducationDetail(
                                                    education,
                                                    varNameToString({ gpa })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ courses })}
                                                checked={courses.enabled}
                                                onClick={() => this.toggleEducationDetail(
                                                    education,
                                                    varNameToString({ courses })
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

export default connect(null, mapDispatchToProps)(Education);
