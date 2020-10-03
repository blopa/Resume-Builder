import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    a4Container: {
        backgroundColor: theme.palette.background.paper,
        width: '21cm',
        minHeight: '29.7cm',
        '@media print': {
            // backgroundColor: theme.palette.background.paper,
            '-webkit-print-color-adjust': 'exact',
            position: 'absolute',
            top: 0,
            left: 0,
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
    alignCenter: {
        margin: '0 auto',
    },
    alignLeft: {
        marginLeft: 'calc(50% - 11.5cm - 175px)',
    },
}));

function A4Container({ children, alignCenter = true }) {
    const classes = useStyles();

    return (
        <div
            className={classNames(
                classes.a4Container,
                {
                    [classes.alignCenter]: alignCenter,
                    [classes.alignLeft]: !alignCenter,
                }
            )}
        >
            {children}
        </div>
    );
}

export default A4Container;
