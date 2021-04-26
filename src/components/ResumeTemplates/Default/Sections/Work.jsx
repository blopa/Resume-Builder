import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => {
    return {
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
        positionDate: {
            fontStyle: 'italic',
            fontSize: '0.8rem',
        },
        website: {},
        summary: {
            whiteSpace: 'break-spaces',
        },
        highlights: {
            listStyle: 'none',
            paddingLeft: 0,
            display: 'inline-flex',
            '& li': {
                fontStyle: 'italic',
                margin: '0 3px 0 0',
                backgroundColor: theme.palette.type === 'dark' ? '#28407b' : '#dae4f4',
                borderRadius: '3px',
                padding: '1px 3px',
            },
        },
    };
});

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
                                    {position?.enabled && `${position?.value} @ `}
                                    {company?.enabled && company?.value}
                                    {name?.enabled && name?.value}
                                    {(startDate?.enabled || endDate?.enabled) && (
                                        <span className={classes.positionDate}>
                                            {' ('}
                                            {startDate?.enabled && endDate?.value}
                                            {endDate?.enabled && ` - ${endDate?.value}`}
                                            {')'}
                                        </span>
                                    )}
                                </p>
                                <p className={classes.website}>
                                    {website?.enabled && (
                                        <a href={website?.value}>
                                            {website?.value}
                                        </a>
                                    )}
                                </p>
                                <p className={classes.website}>
                                    {url?.enabled && (
                                        <a href={url?.value}>
                                            {url?.value}
                                        </a>
                                    )}
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
