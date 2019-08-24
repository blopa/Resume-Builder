import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

// Components
import ItemInput from './List/ItemInput';
import ItemsList from './List/ItemsList';

// Actions
import setResumeWork from '../../../../../store/actions/setResumeWork';

// Redux stuff
const mapDispatchToProps = (dispatch) => ({
    setResumeWork: (work) => {
        dispatch(setResumeWork(work));
    },
});

class Work extends Component {
    toggleWork = () => {
        const currentState = this.props.work.enabled;
        this.props.setResumeWork({
            ...this.props.work,
            enabled: !currentState,
        });
    };

    render() {
        const {
            work: {
                enabled: workEnabled,
                value: works,
            },
        } = this.props;
        console.log(works);

        return (
            <div>
                <ItemInput
                    label="work"
                    onChange={this.toggleWork}
                    checked={workEnabled}
                />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Work);
