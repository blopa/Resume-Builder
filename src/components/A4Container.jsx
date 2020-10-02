import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    a4Container: {
        backgroundColor: '#ffffff',
        width: '21cm',
        minHeight: '29.7cm',
        '@media print': {
            visibility: 'visible !important',
            '& *': {
                visibility: 'visible !important',
                '& div': {
                    pageBreakInside: 'avoid',
                    '&:last-child': {
                        borderBottom: 'none',
                    },
                },
            },
        },
    },
}));

function A4Container({ className, children }) {
    const classes = useStyles();

    return (
        <div
            className={classNames(
                classes.a4Container,
                className
            )}
        >
            {children}
        </div>
    );
}

export default A4Container;
