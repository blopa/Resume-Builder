import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    resumeWork: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    works: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': { margin: '0 0 10px 0', '&:last-child': { margin: '0' } },
    },
    position: { fontWeight: 'bold' },
    website: {},
    summary: {},
    highlights: {
        listStyle: 'disc',
        '& li': { fontStyle: 'italic', margin: '0' },
    },
}));

const Work = ({ work: works }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return works.length > 0 && (
        <div className={classes.resumeWork}>
            <h3>
                {intl.formatMessage({ id: 'experience' })}
            </h3>
            <ul className={classes.works}>
                {works.map((work) => {
                    if (work?.enabled) {
                        const {
                            company,
                            name,
                            position,
                            website,
                            url,
                            startDate,
                            endDate,
                            summary,
                            highlights,
                        } = work?.value || {};

                        return (
                            <li key={uuid()}>
                                <p className={classes.position}>
                                    {position?.enabled && `${position?.value}, `}
                                    {company?.enabled && `${company?.value}, `}
                                    {name?.enabled && `${name?.value}, `}
                                    {startDate?.enabled && startDate?.value}
                                    {' - '}
                                    {endDate?.enabled && endDate?.value}
                                </p>
                                <p className={classes.website}>
                                    {website?.enabled && website?.value}
                                </p>
                                <p className={classes.website}>
                                    {url?.enabled && url?.value}
                                </p>
                                <p className={classes.summary}>
                                    {summary?.enabled && summary?.value}
                                </p>
                                {highlights?.enabled && (
                                    <ul className={classes.highlights}>
                                        {highlights?.value.map((highlight) =>
                                            highlight?.enabled && (
                                                <li key={uuid()}>
                                                    {highlight?.value}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </div>
    );
};

export default Work;
