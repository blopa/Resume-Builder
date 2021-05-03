import React, { Fragment, useContext, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';
import Mustache from 'mustache';
import { renderToString } from 'react-dom/server';

const useStyles = makeStyles((theme) => ({
    contentWrapper: {
        whiteSpace: 'break-spaces',
        marginBottom: '40px',
        '@media print': {
            clear: 'both',
            pageBreakAfter: 'always',
            breakAfter: 'page',
            minHeight: '29.7cm',
            marginBottom: 0,
        },
    },
    variable: {
        backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#cccccc',
        padding: '0 2px',
        '@media print': {
            backgroundColor: 'unset',
            padding: 0,
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
    const variables = useMemo(() => {
        const newVariables = {};
        Object.entries(coverLetter.variables)
            .forEach((entry) => {
                const [key, value] = entry;
                newVariables[key] = renderToString(
                    <span className={classes.variable}>
                        {value}
                    </span>
                );
            });

        return newVariables;
    }, [classes.variable, coverLetter.variables]);

    const text = useMemo(
        () => coverLetter.text.replaceAll('{{', '{{{').replaceAll('}}', '}}}'),
        [coverLetter.text]
    );

    return (
        <Fragment>
            <div
                className={classes.contentWrapper}
                dangerouslySetInnerHTML={{
                    __html: Mustache.render(text, variables),
                }}
            />
            <div className={classes.pageBreakWarning}>
                {intl.formatMessage({ id: 'this_is_a_page_break' })}
            </div>
        </Fragment>
    );
};

export default CoverLetter;
