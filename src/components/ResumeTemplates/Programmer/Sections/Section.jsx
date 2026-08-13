/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';

import { inkColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    section: {
        paddingTop: '24px',
    },
    title: {
        margin: '0 0 7px',
        paddingBottom: '2px',
        borderBottom: `3px solid ${inkColor(theme)}`,
        fontSize: '1.36rem',
        lineHeight: 1.05,
        fontWeight: 800,
        letterSpacing: '-0.3px',
        textTransform: 'uppercase',
        breakAfter: 'avoid',
        pageBreakAfter: 'avoid',
    },
}));

const Section = ({ title, children }) => {
    const classes = useStyles();

    return (
        <section className={classes.section}>
            <h3 className={classes.title}>{title}</h3>
            {children}
        </section>
    );
};

export default Section;
