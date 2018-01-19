import React from 'react';
import { Header } from './Header'

export class Root extends React.Component {
    render() {
        return(
            <div className="container">
                <div className="row">
                    <Header/>
                </div>
                <div className="row">
                    <p>Nothing here</p>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Root.propTypes = {
    // https://reactjs.org/docs/typechecking-with-proptypes.html
};