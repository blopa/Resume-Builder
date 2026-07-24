import { makeStyles } from '@material-ui/core/styles';

// Utils
import { mutedColor, ruleColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    // the label sits beside its content rather than above it, so a page break can
    // never leave a heading stranded at the bottom of a page
    section: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: '7px 0',
        borderTop: `1px solid ${ruleColor(theme)}`,
    },
    label: {
        flex: '0 0 105px',
        margin: '0',
        paddingRight: '12px',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        color: mutedColor(theme),
    },
    content: {
        flex: '1',
        minWidth: '0',
    },
}));

const Section = ({ title, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.section}>
            <h3 className={classes.label}>{title}</h3>
            <div className={classes.content}>{children}</div>
        </div>
    );
};

export default Section;
