import React from 'react';
import { getPropsFromLocationHistory, isObjectEmpty } from '../../utils/utils';

export default function BuildPage(props) {
    const { history } = props;
    const { jsonResume } = getPropsFromLocationHistory(props);

    if (!jsonResume || isObjectEmpty(jsonResume)) {
        // if no resume, then return to home
        history.push('/upload');
    }
    console.log(jsonResume);

    return (
        <div>
            Check your log!!!
        </div>
    );
}
