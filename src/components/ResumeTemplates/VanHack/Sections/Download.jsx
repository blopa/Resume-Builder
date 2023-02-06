import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import DownloadJsonLink from '../../../DownloadJsonLink';

const useStyles = makeStyles((theme) => ({
    resumeDownload: {},
}));

const Download = ({ jsonResume }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <div className={classes.resumeDownload}>
            {intl.formatMessage(
                {
                    id: 'download_data',
                },
                {
                    // eslint-disable-next-line react/display-name
                    a: (msg) => (
                        <DownloadJsonLink json={jsonResume} name={`jsonResume-${Date.now()}.json`}>
                            {msg}
                        </DownloadJsonLink>
                    ),
                }
            )}
        </div>
    );
};

export default Download;
