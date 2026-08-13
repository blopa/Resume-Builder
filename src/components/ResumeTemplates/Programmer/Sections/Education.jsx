/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useIntl } from 'gatsby-plugin-react-intl';

import Section from './Section';
import BulletList from './BulletList';
import { accentColor, iconColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    education: {
        marginBottom: '17px',
        pageBreakInside: 'avoid',
        '&:last-child': {
            marginBottom: 0,
        },
    },
    degree: {
        fontSize: '1rem',
        lineHeight: 1.3,
    },
    institution: {
        marginTop: '2px !important',
        color: accentColor(theme),
        fontSize: '0.92rem',
        fontWeight: 600,
        '& a': {
            color: 'inherit',
        },
    },
    meta: {
        marginTop: '5px',
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '3px',
        '& svg': {
            flex: '0 0 auto',
            width: '13px',
            height: '13px',
            marginRight: '4px',
            color: iconColor(theme),
        },
    },
    score: {
        marginTop: '3px !important',
    },
}));

const Education = ({ education }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'education' })}>
            {education.map((item, index) => {
                if (!item) {
                    return null;
                }

                const { institution, url, area, studyType, startDate, endDate, score, courses, location } = item;
                const dates = [startDate, endDate].filter(Boolean).join(' - ');

                return (
                    <article className={classes.education} key={index}>
                        {(studyType || area) && (
                            <p className={classes.degree}>
                                {studyType}
                                {studyType && area && <br />}
                                {area}
                            </p>
                        )}
                        {institution && (
                            <p className={classes.institution}>{url ? <a href={url}>{institution}</a> : institution}</p>
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
                        {score && (
                            <p className={classes.score}>
                                {intl.formatMessage({ id: 'score' })}: {score}
                            </p>
                        )}
                        <BulletList items={courses} />
                    </article>
                );
            })}
        </Section>
    );
};

export default Education;
