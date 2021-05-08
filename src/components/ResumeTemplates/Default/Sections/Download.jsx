import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-intl';

// Components
import DownloadJsonLink from '../../../DownloadJsonLink';

// Hooks
import { useSelector } from '../../../../store/StoreProvider';

// Selectors
import { selectJsonResume } from '../../../../store/selectors';

const useStyles = makeStyles((theme) => ({
    resumeDownload: {},
}));

const Download = () => {
    const classes = useStyles();
    const intl = useIntl();
    const jsonResume = useSelector(selectJsonResume);

    return (
        <div className={classes.resumeDownload}>
            {intl.formatMessage({
                id: 'download_data',
            },
            {
                // eslint-disable-next-line react/display-name
                a: (msg) => (
                    <DownloadJsonLink
                        json={jsonResume}
                        name={`resume-${Date.now()}.json`}
                    >
                        {msg}
                    </DownloadJsonLink>
                ),
            })}
        </div>
    );
};

export default Download;
