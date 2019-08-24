import React, { Component, Fragment } from 'react';

// Components
import DefaultTemplate from '../ui/Resume/Templates/Default/Default';
import FloatingButton from '../ui/FloatingButton/FloatingButton';
import Drawer from '../ui/Drawer/Drawer';

// Utils
import { getPropsFromLocationHistory, isObjectEmpty } from '../../utils/utils';

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
        const { jsonResume } = getPropsFromLocationHistory(this.props);

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

export default BuildPage;
