import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    sectionTitle: {
        margin: '0',
        fontSize: '0.95rem',
        fontWeight: 'normal',
        letterSpacing: '0.6px',
        textTransform: 'uppercase',
        color: theme.palette.type === 'dark' ? '#8f8f8f' : '#aaaaaa',
        pageBreakInside: 'avoid',
    },
}));

const SectionTitle = forwardRef(({ children, style }, ref) => {
    const classes = useStyles();

    return (
        <h3 ref={ref} className={classes.sectionTitle} style={style}>
            {children}
        </h3>
    );
});

SectionTitle.displayName = 'SectionTitle';

export default SectionTitle;
