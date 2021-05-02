import React, { Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';
import Mustache from 'mustache';

const useStyles = makeStyles((theme) => ({
    contentWrapper: {
        marginBottom: '40px',
        '@media print': {
            clear: 'both',
            pageBreakAfter: 'always',
            breakAfter: 'page',
            minHeight: '29.7cm',
            marginBottom: 0,
        },
    },
    pageBreakWarning: {
        height: '35px',
        padding: 0,
        marginLeft: '-42px',
        width: '112%',
        textAlign: 'center',
        fontStyle: 'italic',
        color: theme.palette.type === 'dark' ? '#6b6b6b' : '#b1afaf',
        backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#fafafa',
        paddingTop: '5px',
        '@media print': {
            display: 'none',
        },
    },
}));

const CoverLetter = ({ coverLetter }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return (
        <Fragment>
            <div className={classes.contentWrapper}>
                {Mustache.render(coverLetter.text, coverLetter.variables)}
            </div>
            <div className={classes.pageBreakWarning}>
                {intl.formatMessage({ id: 'this_is_a_page_break' })}
            </div>
        </Fragment>
    );
};

export default CoverLetter;
