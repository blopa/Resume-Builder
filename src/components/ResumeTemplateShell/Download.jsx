import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import DownloadJsonLink from '../DownloadJsonLink';

// Utils
import { withResumeBuilderExtensions } from '../../utils/resume-builder-extensions';

/*
 * `jsonResume` here is the *exportable* resume, not the one the template renders —
 * the rendered one has already had its markdown turned into HTML and its disabled
 * entries collapsed, so serialising it would hand the user back a lossy file.
 */
const Download = ({ jsonResume }) => {
    const intl = useIntl();

    return (
        <div>
            {intl.formatMessage(
                {
                    id: 'download_data',
                },
                {
                    // eslint-disable-next-line react/display-name
                    a: (msg) => (
                        <DownloadJsonLink
                            json={withResumeBuilderExtensions(jsonResume)}
                            name={`jsonResume-${Date.now()}.json`}
                        >
                            {msg}
                        </DownloadJsonLink>
                    ),
                }
            )}
        </div>
    );
};

export default Download;
