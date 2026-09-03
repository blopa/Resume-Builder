/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';
import BulletList from './BulletList';

const useStyles = makeStyles(() => ({
    item: {
        pageBreakInside: 'avoid',
        marginBottom: '9px',
        '&:last-child': {
            marginBottom: 0,
        },
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
    },
    title: {
        fontWeight: 700,
    },
    dates: {
        flex: 'none',
        fontWeight: 700,
    },
    summary: {
        '& p': {
            margin: 0,
        },
    },
}));

const Volunteer = ({ volunteer }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'volunteers' })}>
            {volunteer.map((item, index) => {
                if (!item) {
                    return null;
                }

                const { organization, position, url, startDate, endDate, summary, highlights } = item;
                const title = [position, organization].filter(Boolean).join(', ');
                const dates = [startDate, endDate].filter(Boolean).join('—');

                return (
                    <article className={classes.item} key={index}>
                        <div className={classes.heading}>
                            <p className={classes.title}>{url && title ? <a href={url}>{title}</a> : title}</p>
                            {dates && <p className={classes.dates}>{dates}</p>}
                        </div>
                        {summary && <div className={classes.summary} dangerouslySetInnerHTML={{ __html: summary }} />}
                        <BulletList items={highlights} />
                    </article>
                );
            })}
        </Section>
    );
};

export default Volunteer;
