/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';
import BulletList from './BulletList';

// Utils
import { secondaryTextColor } from '../styles';
import { toDisplayUrl } from '../../../ResumeTemplateShell/utils';

const useStyles = makeStyles((theme) => ({
    work: {
        pageBreakInside: 'avoid',
        marginBottom: '17px',
        '&:last-child': {
            marginBottom: 0,
        },
    },
    header: {
        display: 'grid',
        gridTemplateColumns: '38% 32% 30%',
        fontWeight: 700,
    },
    company: {
        textAlign: 'center',
    },
    dates: {
        textAlign: 'right',
        whiteSpace: 'nowrap',
    },
    subHeader: {
        display: 'grid',
        gridTemplateColumns: '38% 32% 30%',
        color: secondaryTextColor(theme),
    },
    location: {
        gridColumn: 2,
        textAlign: 'center',
    },
    link: {
        gridColumn: 1,
        gridRow: 1,
    },
    body: {
        marginTop: '3px',
        whiteSpace: 'break-spaces',
        '& p': {
            margin: 0,
        },
    },
    keywords: {
        marginTop: '3px !important',
        color: secondaryTextColor(theme),
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
                const dates = [startDate, endDate].filter(Boolean).join('—');

                return (
                    <article className={classes.work} key={index}>
                        <div className={classes.header}>
                            <p>{position}</p>
                            <p className={classes.company}>{name}</p>
                            <p className={classes.dates}>{dates}</p>
                        </div>
                        {(location || url) && (
                            <div className={classes.subHeader}>
                                {url && (
                                    <a className={classes.link} href={url}>
                                        {toDisplayUrl(url)}
                                    </a>
                                )}
                                {location && <p className={classes.location}>{location}</p>}
                            </div>
                        )}
                        {summary && <div className={classes.body} dangerouslySetInnerHTML={{ __html: summary }} />}
                        {description && (
                            <div className={classes.body} dangerouslySetInnerHTML={{ __html: description }} />
                        )}
                        <BulletList items={highlights} />
                        {keywords?.length > 0 && (
                            <p className={classes.keywords}>{keywords.filter(Boolean).join(', ')}</p>
                        )}
                    </article>
                );
            })}
        </Section>
    );
};

export default Work;
