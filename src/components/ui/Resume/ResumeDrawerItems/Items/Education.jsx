import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import setResumeEducation from '../../../../../store/actions/setResumeEducation';
import { varNameToString } from '../../../../../utils/utils';

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

    render() {
        const { education: educations } = this.props;
        return (
            <div>
                <ItemInput
                    label="education"
                    onChange={this.toggleEducations}
                    checked={educations.enabled}
                />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Education);
