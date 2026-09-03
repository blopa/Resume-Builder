/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useIntl } from 'gatsby-plugin-react-intl';

import Section from './Section';
import BulletList from './BulletList';
import { accentColor, iconColor } from '../styles';
import getAdditionalEntryViewModel from '../../../ResumeTemplateShell/getAdditionalEntryViewModel';

const useStyles = makeStyles((theme) => ({
    item: {
        marginBottom: '14px',
        pageBreakInside: 'avoid',
        '&:last-child': {
            marginBottom: 0,
        },
    },
    title: {
        fontSize: '0.94rem',
        fontWeight: 600,
    },
    subtitle: {
        marginTop: '2px !important',
        color: accentColor(theme),
        fontWeight: 600,
    },
    dates: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '4px !important',
        '& svg': {
            flex: '0 0 auto',
            width: '13px',
            height: '13px',
            marginRight: '4px',
            color: iconColor(theme),
        },
    },
    body: {
        marginTop: '4px',
        '& p': {
            margin: 0,
        },
    },
    details: {
        marginTop: '3px !important',
    },
}));

const Additional = ({ type, items }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: type })}>
            {items.map((item, index) => {
                const entry = getAdditionalEntryViewModel(type, item);

                if (!entry) {
                    return null;
                }

                const { title, url, date, startDate, endDate, subtitle, body, bullets, details } = entry;
                const dates = date || [startDate, endDate].filter(Boolean).join(' - ');
                const detailsText = details?.filter(Boolean).join(', ');

                return (
                    <article className={classes.item} key={index}>
                        {title && <p className={classes.title}>{url ? <a href={url}>{title}</a> : title}</p>}
                        {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
                        {dates && (
                            <p className={classes.dates}>
                                <CalendarTodayIcon aria-hidden="true" />
                                {dates}
                            </p>
                        )}
                        {body && <div className={classes.body} dangerouslySetInnerHTML={{ __html: body }} />}
                        <BulletList items={bullets} />
                        {detailsText && <p className={classes.details}>{detailsText}</p>}
                    </article>
                );
            })}
        </Section>
    );
};

export default Additional;
