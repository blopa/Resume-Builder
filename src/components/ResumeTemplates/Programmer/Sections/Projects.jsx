/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useIntl } from 'gatsby-plugin-react-intl';

import Section from './Section';
import BulletList from './BulletList';
import { accentColor, iconColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    project: {
        marginBottom: '18px',
        pageBreakInside: 'avoid',
        '&:last-child': {
            marginBottom: 0,
        },
    },
    name: {
        fontSize: '1.08rem',
        lineHeight: 1.12,
    },
    role: {
        marginTop: '3px !important',
        color: accentColor(theme),
        fontSize: '0.86rem',
        fontWeight: 600,
    },
    dates: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '5px !important',
        '& svg': {
            width: '13px',
            height: '13px',
            marginRight: '4px',
            color: iconColor(theme),
        },
    },
    description: {
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

const Projects = ({ projects }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'projects' })}>
            {projects.map((item, index) => {
                if (!item) {
                    return null;
                }

                const { name, description, highlights, keywords, startDate, endDate, url, roles, entity, type } = item;
                const role = [roles?.filter(Boolean).join(', '), entity, type].filter(Boolean).join(' · ');
                const dates = [startDate, endDate].filter(Boolean).join(' - ');

                return (
                    <article className={classes.project} key={index}>
                        {name && <p className={classes.name}>{url ? <a href={url}>{name}</a> : name}</p>}
                        {role && <p className={classes.role}>{role}</p>}
                        {dates && (
                            <p className={classes.dates}>
                                <CalendarTodayIcon aria-hidden="true" />
                                {dates}
                            </p>
                        )}
                        {description && (
                            <div className={classes.description} dangerouslySetInnerHTML={{ __html: description }} />
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

export default Projects;
