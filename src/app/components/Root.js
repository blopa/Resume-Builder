import React from 'react';
import { Header } from './Header'
import { Home } from './Home'

export class Root extends React.Component {
    render() {
        return(
            <div className="container">
                <div className="row">
                    <Header/>
                </div>
                <div className="row">
                    <Home/>
                </div>
            </div>
        );
    }
}

Root.propTypes = {
    // https://reactjs.org/docs/typechecking-with-proptypes.html
};