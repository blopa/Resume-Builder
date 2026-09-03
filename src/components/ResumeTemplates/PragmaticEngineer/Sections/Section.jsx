/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';

// Utils
import { accentColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    section: {
        paddingTop: '15px',
    },
    title: {
        margin: '0 0 5px',
        paddingBottom: '4px',
        borderBottom: `1px solid ${accentColor(theme)}`,
        fontSize: '0.95rem',
        lineHeight: 1.15,
        color: accentColor(theme),
        breakAfter: 'avoid',
        pageBreakAfter: 'avoid',
    },
}));

const Section = ({ title, children, className = '' }) => {
    const classes = useStyles();

    return (
        <section className={`${classes.section} ${className}`}>
            <h3 className={classes.title}>{title}</h3>
            {children}
        </section>
    );
};

export default Section;
