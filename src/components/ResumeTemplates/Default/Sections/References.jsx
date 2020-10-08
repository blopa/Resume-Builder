import React from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';

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
}));

const References = ({ references }) => {
    const classes = useStyles();
    return references.length > 0 && (
        <div className={classes.resumeReferences}>
            <h3>References</h3>
            <ul className={classes.references}>
                {references.map((ref) => {
                    if (ref.enabled) {
                        const { name, reference } = ref.value;
                        return (
                            <li key={uuid()}>
                                {name && name.enabled && (
                                    <p className={classes.name}>
                                        {name.value}
                                    </p>
                                )}
                                {reference && reference.enabled && <p>{reference.value}</p>}
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );
};

export default References;
