/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';

import { ruleColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    section: {
        paddingTop: '9px',
    },
    title: {
        margin: '0 0 4px',
        borderBottom: `1px solid ${ruleColor(theme)}`,
        fontSize: '0.85rem',
        lineHeight: 1.1,
        fontWeight: 700,
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
