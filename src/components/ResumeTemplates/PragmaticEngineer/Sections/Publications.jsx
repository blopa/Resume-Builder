/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';

const useStyles = makeStyles(() => ({
    list: {
        margin: 0,
        paddingLeft: '22px',
    },
    item: {
        pageBreakInside: 'avoid',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
    },
    title: {
        fontWeight: 700,
    },
    date: {
        flex: 'none',
        fontWeight: 700,
    },
    summary: {
        '& p': {
            margin: 0,
        },
    },
}));

const Publications = ({ publications }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'publications' })}>
            <ul className={classes.list}>
                {publications.map((item, index) => {
                    if (!item) {
                        return null;
                    }

                    const { name, publisher, releaseDate, url, summary } = item;

                    return (
                        <li className={classes.item} key={index}>
                            <div className={classes.row}>
                                <p>
                                    <span className={classes.title}>
                                        {url && name ? <a href={url}>{name}</a> : name}
                                    </span>
                                    {name && publisher && `, ${publisher}`}
                                </p>
                                {releaseDate && <p className={classes.date}>{releaseDate}</p>}
                            </div>
                            {summary && (
                                <div className={classes.summary} dangerouslySetInnerHTML={{ __html: summary }} />
                            )}
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
};

export default Publications;
