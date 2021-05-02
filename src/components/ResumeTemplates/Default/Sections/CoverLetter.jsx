import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    resumeReferences: {
        padding: '10px 0',
    },
    name: { fontWeight: 'bold' },
    references: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': { margin: '0 0 10px 0', '&:last-child': { margin: '0' } },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    referenceWrapper: {
        pageBreakInside: 'avoid',
    },
}));

const CoverLetter = ({ coverLetter }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return null;
};

export default CoverLetter;
