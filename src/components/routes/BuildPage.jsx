import React from 'react';

// Components
import DefaultTemplate from '../ui/Resume/Templates/Default/Default';

// Utils
import { getPropsFromLocationHistory, isObjectEmpty } from '../../utils/utils';

export default function BuildPage(props) {
    const { history } = props;
    const { jsonResume } = getPropsFromLocationHistory(props);

    if (!jsonResume || isObjectEmpty(jsonResume)) {
        // if no resume, then return to home
        history.push('/upload');
        return null;
    }
    console.log(jsonResume);

    return (
        <DefaultTemplate
            resume={jsonResume}
        />
    );
}
