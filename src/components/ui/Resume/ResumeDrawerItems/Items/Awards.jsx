import React, { Component } from 'react';
import uuid from 'uuid';

class Awards extends Component {
    render() {
        return (
            <div>
                <p>{JSON.stringify(this.props)}</p>
            </div>
        );
    }
}

export default Awards;
