import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import setResumeSkills from '../../../../../store/actions/setResumeSkills';
import { varNameToString } from '../../../../../utils/utils';
import style from '../resume-drawer-items.scss';

// Redux stuff
const mapDispatchToProps = (dispatch) => ({
    setResumeSkills: (skills) => {
        dispatch(setResumeSkills(skills));
    },
});

class Skills extends Component {
    toggleSkills = () => {
        const currentState = this.props.skills.enabled;
        this.props.setResumeSkills({
            ...this.props.skills,
            enabled: !currentState,
        });
    };

    toggleSkill = (skill) => {
        const newSkills = { ...this.props.skills };
        newSkills.value =
            newSkills.value.map((skl) => {
                if (JSON.stringify(skl.value) === JSON.stringify(skill.value)) {
                    return {
                        ...skl,
                        enabled: !skl.enabled,
                    };
                }
                return skl;
            });
        this.props.setResumeSkills(newSkills);
    };

    toggleSkillsDetail = (skill, propName) => {
        const newSkills = { ...this.props.skills };
        newSkills.value =
            newSkills.value.map((skl) => {
                if (JSON.stringify(skl.value) === JSON.stringify(skill.value)) {
                    return {
                        ...skl,
                        value: {
                            ...skl.value,
                            [propName]: {
                                ...skl.value[propName],
                                enabled: !skl.value[propName].enabled,
                            },
                        },
                    };
                }
                return skl;
            });
        this.props.setResumeSkills(newSkills);
    };

    render() {
        const { skills } = this.props;
        return (
            <div className={style['resume-drawer-items--item']}>
                <ItemInput
                    label="skills"
                    onChange={this.toggleSkills}
                    checked={skills.enabled}
                />
                {skills.enabled && (
                    <ul>
                        {skills.value.map((skill) => {
                            const { keywords, level, name } = skill.value;
                            return (
                                <Fragment key={uuid()}>
                                    <ItemsList
                                        label={name.value}
                                        checked={skill.enabled}
                                        onClick={() => this.toggleSkill(skill)}
                                    />
                                    {skill.enabled && (
                                        <ul>
                                            <ItemsList
                                                label={varNameToString({ keywords })}
                                                checked={keywords.enabled}
                                                onClick={() => this.toggleSkillsDetail(
                                                    skill,
                                                    varNameToString({ keywords })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ level })}
                                                checked={level.enabled}
                                                onClick={() => this.toggleSkillsDetail(
                                                    skill,
                                                    varNameToString({ level })
                                                )}
                                            />
                                            <ItemsList
                                                label={varNameToString({ name })}
                                                checked={name.enabled}
                                                onClick={() => this.toggleSkillsDetail(
                                                    skill,
                                                    varNameToString({ name })
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

export default connect(null, mapDispatchToProps)(Skills);
