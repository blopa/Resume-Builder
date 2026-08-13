/* eslint-disable react/prop-types, gatsby/purify-html */
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
    heading: {
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

const Awards = ({ awards }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'awards' })}>
            <ul className={classes.list}>
                {awards.map((item, index) => {
                    if (!item) {
                        return null;
                    }

                    const { title, date, awarder, summary } = item;

                    return (
                        <li className={classes.item} key={index}>
                            <div className={classes.heading}>
                                <p>
                                    <span className={classes.title}>{title}</span>
                                    {title && awarder && `, ${awarder}`}
                                </p>
                                {date && <p className={classes.date}>{date}</p>}
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

export default Awards;
