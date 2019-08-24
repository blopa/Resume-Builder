import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Components
import DefaultTemplate from '../ui/Resume/Templates/Default/Default';
import FloatingButton from '../ui/FloatingButton/FloatingButton';
import Drawer from '../ui/Drawer/Drawer';

// Utils
import { isObjectEmpty } from '../../utils/utils';

// Actions
import setJsonResume from '../../store/actions/setJsonResume';
import setTogglableJsonResume from '../../store/actions/setTogglableJsonResume';

const mapStateToProps = (state) => ({
    togglableJsonResume: state.resume.togglableJsonResume,
});

const mapDispatchToProps = (dispatch) => ({
    setJsonResume: (resume) => {
        dispatch(setJsonResume(resume));
    },
    setTogglableJsonResume: (resume) => {
        dispatch(setTogglableJsonResume(resume));
    },
});

class BuildPage extends Component {
    state = {
        drawerOpen: false,
    };

    toggleDrawer = () => {
        this.setState((prevState) => ({
            drawerOpen: !prevState.drawerOpen,
        }));
    };

    render() {
        const { history } = this.props;
        const jsonResume = this.props.togglableJsonResume;

        if (!jsonResume || isObjectEmpty(jsonResume)) {
            // if no resume, then return to home
            history.push('/upload');
            return null;
        }
        console.log(jsonResume);

        return (
            <Fragment>
                <FloatingButton
                    onClick={this.toggleDrawer}
                />
                <Drawer
                    open={this.state.drawerOpen}
                    onClose={this.toggleDrawer}
                >
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </Drawer>
                <DefaultTemplate
                    resume={jsonResume}
                />
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildPage);
