import { makeStyles } from '@material-ui/core/styles';

// Utils
import { mutedColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    entry: {
        pageBreakInside: 'avoid',
        margin: '0 0 8px 0',
        '&:last-child': {
            margin: '0',
        },
    },
    header: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
    },
    dates: {
        flex: 'none',
        paddingLeft: '10px',
        whiteSpace: 'nowrap',
        color: mutedColor(theme),
    },
}));

// One record of a section: a bold title, right aligned dates and whatever else the section adds.
const Entry = ({ title, dates, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.entry}>
            {(title || dates) && (
                <div className={classes.header}>
                    <p className={classes.title}>{title}</p>
                    {dates && <p className={classes.dates}>{dates}</p>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Entry;
