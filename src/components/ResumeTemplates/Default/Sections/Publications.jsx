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
    publication: {
        fontWeight: 'bold',
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    publicationWrapper: {
        pageBreakInside: 'avoid',
    },
    positionDate: {
        fontStyle: 'italic',
        fontSize: '0.8rem',
    },
}));

const Publications = ({ publications }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return publications.length > 0 && (
        <div className={classes.resumePublications}>
            <h3>
                {intl.formatMessage({ id: 'publications' })}
            </h3>
            <div className={classes.contentWrapper}>
                <ul className={classes.publications}>
                    {publications.map((publication) => {
                        if (publication?.enabled) {
                            const {
                                name,
                                publisher,
                                releaseDate,
                                url,
                                summary,
                            } = publication?.value || {};
                            return (
                                <li className={classes.publicationWrapper} key={uuid()}>
                                    <p className={classes.publication}>
                                        {name?.enabled && name?.value}
                                        {(
                                            (publisher?.enabled && name?.enabled)
                                            && (publisher?.value && name?.value)
                                        ) && ` ${intl.formatMessage({ id: 'at' })} `}
                                        {publisher?.enabled && publisher?.value}
                                        {(releaseDate?.enabled && releaseDate?.value) && (
                                            <span className={classes.positionDate}>
                                                {` (${releaseDate?.value})`}
                                            </span>
                                        )}
                                    </p>
                                    {(url && url?.enabled && url?.value) && <a href={url.value}>{url.value}</a>}
                                    {summary && summary?.enabled && <p>{summary?.value}</p>}
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

export default Publications;
