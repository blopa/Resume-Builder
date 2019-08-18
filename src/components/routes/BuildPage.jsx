import React from 'react';
import { getPropsFromLocationHistory } from '../../utils/utils';

export default function BuildPage(props) {
    const { history } = props;
    const { jsonResume } = getPropsFromLocationHistory(props);
    if (!jsonResume) {
        // if no resume, then return to home
        history.push('/');
    }

    return (
        <div>
            {JSON.stringify(jsonResume)}
        </div>
    );
}
