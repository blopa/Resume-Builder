/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useIntl } from 'gatsby-plugin-react-intl';

import Section from './Section';
import BulletList from './BulletList';
import { accentColor, iconColor } from '../styles';
import { toDisplayUrl } from '../../../ResumeTemplateShell/utils';

const useStyles = makeStyles((theme) => ({
    work: {
        marginBottom: '19px',
        pageBreakInside: 'avoid',
        '&:last-child': {
            marginBottom: 0,
        },
    },
    position: {
        fontSize: '1.08rem',
        lineHeight: 1.12,
    },
    company: {
        marginTop: '3px !important',
        color: accentColor(theme),
        fontSize: '0.86rem',
        fontWeight: 600,
        '& a': {
            color: 'inherit',
        },
    },
    meta: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '3px 12px',
        marginTop: '6px',
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        minWidth: 0,
        '& svg': {
            flex: '0 0 auto',
            width: '13px',
            height: '13px',
            marginRight: '4px',
            color: iconColor(theme),
        },
        '& span': {
            overflowWrap: 'anywhere',
        },
    },
    body: {
        marginTop: '4px',
        '& p': {
            margin: 0,
        },
    },
    keywords: {
        marginTop: '4px !important',
        fontStyle: 'italic',
    },
}));

const Work = ({ work }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'experience' })}>
            {work.map((item, index) => {
                if (!item) {
                    return null;
                }

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
                } = item;
                const dates = [startDate, endDate].filter(Boolean).join(' - ');

                return (
                    <article className={classes.work} key={index}>
                        {position && <p className={classes.position}>{position}</p>}
                        {(name || url) && (
                            <p className={classes.company}>
                                {url ? <a href={url}>{name || toDisplayUrl(url)}</a> : name}
                            </p>
                        )}
                        {(dates || location) && (
                            <div className={classes.meta}>
                                {dates && (
                                    <div className={classes.metaItem}>
                                        <CalendarTodayIcon aria-hidden="true" />
                                        <span>{dates}</span>
                                    </div>
                                )}
                                {location && (
                                    <div className={classes.metaItem}>
                                        <LocationOnIcon aria-hidden="true" />
                                        <span>{location}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        {summary && <div className={classes.body} dangerouslySetInnerHTML={{ __html: summary }} />}
                        {description && (
                            <div className={classes.body} dangerouslySetInnerHTML={{ __html: description }} />
                        )}
                        <BulletList items={highlights} />
                        {keywords?.length > 0 && (
                            <p className={classes.keywords}>{keywords.filter(Boolean).join(' · ')}</p>
                        )}
                    </article>
                );
            })}
        </Section>
    );
};

export default Work;
