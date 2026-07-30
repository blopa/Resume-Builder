import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';
import Entry from './Entry';
import BulletList from './BulletList';

// Utils
import { mutedColor } from '../styles';
import { toDisplayUrl } from '../../../ResumeTemplateShell/utils';

const useStyles = makeStyles((theme) => ({
    meta: {
        color: mutedColor(theme),
    },
    body: {
        whiteSpace: 'break-spaces',
        '& p': {
            margin: '0',
        },
    },
}));

const Volunteer = ({ volunteer: volunteers }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        volunteers?.length > 0 && (
            <Section title={intl.formatMessage({ id: 'volunteers' })}>
                {volunteers.map((volunteer, index) => {
                    if (volunteer) {
                        const { organization, position, url, startDate, endDate, summary, highlights } =
                            volunteer || {};

                        const title = [position, organization].filter(Boolean).join(' · ');
                        const dates = [startDate, endDate].filter(Boolean).join(' – ');

                        return (
                            <Entry key={index} title={title} dates={dates}>
                                {url && (
                                    <p className={classes.meta}>
                                        <a href={url}>{toDisplayUrl(url)}</a>
                                    </p>
                                )}
                                {summary && (
                                    <div className={classes.body} dangerouslySetInnerHTML={{ __html: summary }} />
                                )}
                                <BulletList items={highlights} />
                            </Entry>
                        );
                    }

                    return null;
                })}
            </Section>
        )
    );
};

export default Volunteer;
