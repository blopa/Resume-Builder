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

const References = ({ references }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return references.length > 0 && (
        <div className={classes.resumeReferences}>
            <h3>
                {intl.formatMessage({ id: 'references' })}
            </h3>
            <div className={classes.contentWrapper}>
                <ul className={classes.references}>
                    {references.map((ref) => {
                        if (ref?.enabled) {
                            const { name, reference } = ref?.value || {};
                            return (
                                <li className={classes.referenceWrapper} key={uuid()}>
                                    {name?.enabled && (
                                        <p className={classes.name}>
                                            {name?.value}
                                        </p>
                                    )}
                                    {reference?.enabled && <p>{reference?.value}</p>}
                                </li>
                            );
                        }

                        return null;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default References;
