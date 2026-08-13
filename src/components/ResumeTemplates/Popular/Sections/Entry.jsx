/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    entry: {
        marginBottom: '8px',
        pageBreakInside: 'avoid',
        '&:last-child': { marginBottom: 0 },
    },
    row: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: '12px',
    },
    title: { fontWeight: 700 },
    dates: {
        flex: 'none',
        fontWeight: 700,
        whiteSpace: 'nowrap',
    },
    subRow: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
        fontStyle: 'italic',
    },
    location: { flex: 'none' },
}));

const Entry = ({ title, dates, subtitle, location, children }) => {
    const classes = useStyles();

    return (
        <article className={classes.entry}>
            {(title || dates) && (
                <div className={classes.row}>
                    <p className={classes.title}>{title}</p>
                    {dates && <p className={classes.dates}>{dates}</p>}
                </div>
            )}
            {(subtitle || location) && (
                <div className={classes.subRow}>
                    <p>{subtitle}</p>
                    {location && <p className={classes.location}>{location}</p>}
                </div>
            )}
            {children}
        </article>
    );
};

export default Entry;
