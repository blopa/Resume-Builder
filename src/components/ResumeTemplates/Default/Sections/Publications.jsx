import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    resumePublications: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    publications: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': { margin: '0 0 10px 0', '&:last-child': { margin: '0' } },
    },
    publication: { fontWeight: 'bold' },
}));

const Publications = ({ publications }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return publications.length > 0 && (
        <div className={classes.resumePublications}>
            <h3>
                {intl.formatMessage({ id: 'publications' })}
            </h3>
            <ul className={classes.publications}>
                {publications.map((publication) => {
                    if (publication?.enabled) {
                        const {
                            name,
                            publisher,
                            releaseDate,
                            website,
                            url,
                            summary,
                        } = publication?.value || {};
                        return (
                            <li key={uuid()}>
                                {name?.enabled && (
                                    <p className={classes.publication}>
                                        {name?.value}
                                    </p>
                                )}
                                {publisher && publisher?.enabled && <p>{publisher?.value}</p>}
                                {website && website?.enabled && <p>{website?.value}</p>}
                                {url && url?.enabled && <p>{url?.value}</p>}
                                {releaseDate && releaseDate?.enabled && <p>{releaseDate?.value}</p>}
                                {summary && summary?.enabled && <p>{summary?.value}</p>}
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );
};

export default Publications;
