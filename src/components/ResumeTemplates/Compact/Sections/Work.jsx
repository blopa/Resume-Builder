import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';
import Entry from './Entry';
import BulletList from './BulletList';

// Utils
import { mutedColor } from '../styles';
import { toDisplayUrl } from '../utils';

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

const Work = ({ work: works }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        works?.length > 0 && (
            <Section title={intl.formatMessage({ id: 'experience' })}>
                {works.map((work) => {
                    if (work) {
                        const {
                            name,
                            location,
                            description,
                            position,
                            url,
                            startDate,
                            endDate,
                            summary,
                            highlights,
                            keywords,
                        } = work || {};

                        const title = [position, name].filter(Boolean).join(' · ');
                        const dates = [startDate, endDate].filter(Boolean).join(' – ');
                        const meta = [location, url].filter(Boolean);

                        return (
                            <Entry key={uuid()} title={title} dates={dates}>
                                {meta.length > 0 && (
                                    <p className={classes.meta}>
                                        {location}
                                        {location && url && ' · '}
                                        {url && <a href={url}>{toDisplayUrl(url)}</a>}
                                    </p>
                                )}
                                {summary && (
                                    <div className={classes.body} dangerouslySetInnerHTML={{ __html: summary }} />
                                )}
                                {description && (
                                    <div className={classes.body} dangerouslySetInnerHTML={{ __html: description }} />
                                )}
                                <BulletList items={highlights} />
                                {keywords?.length > 0 && (
                                    <p className={classes.meta}>{keywords.filter(Boolean).join(' · ')}</p>
                                )}
                            </Entry>
                        );
                    }

                    return null;
                })}
            </Section>
        )
    );
};

export default Work;
