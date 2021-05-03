import React, { useContext, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeWork: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    works: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 10px 0',
            '&:last-child': {
                margin: '3px 0 0',
            },
        },
    },
    position: {
        fontWeight: 'bold',
    },
    positionDate: {
        fontStyle: 'italic',
        fontSize: '0.8rem',
    },
    urlAndLocation: {
        fontStyle: 'italic',
        color: theme.palette.type === 'dark' ? '#b7bfc1' : '#6a5e5e',
    },
    summary: {
        whiteSpace: 'break-spaces',
    },
    description: {
        whiteSpace: 'break-spaces',
    },
    highlights: {
        '& li': {
            marginBottom: '1px',
            fontStyle: 'italic',
        },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    workWrapper: {
        pageBreakInside: 'avoid',
    },
    workHeader: {
        marginBottom: '5px',
    },
    title: {
        pageBreakInside: 'avoid',
    },
}));

const Work = ({ work: works }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return works.length > 0 && (
        <div className={classes.resumeWork}>
            <h3
                ref={sectionTitle}
                className={classes.title}
                style={titleStyle}
            >
                {intl.formatMessage({ id: 'experience' })}
            </h3>
            <div className={classes.contentWrapper}>
                <ul className={classes.works}>
                    {works.map((work) => {
                        if (work?.enabled) {
                            const {
                                name,
                                location,
                                description,
                                position,
                                url,
                                startDate,
                                endDate,
                                summary,
                                highlights,
                            } = work?.value || {};

                            let refProps = {};
                            if (!firstItem.current) {
                                refProps = {
                                    ref: firstItem,
                                };
                            }

                            return (
                                <li
                                    className={classes.workWrapper}
                                    key={uuid()}
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...refProps}
                                >
                                    <div className={classes.workHeader}>
                                        <p className={classes.position}>
                                            {position?.enabled && position?.value}
                                            {(
                                                (position?.enabled && name?.enabled)
                                                && (position?.value && name?.value)
                                            ) && ` ${intl.formatMessage({ id: 'at' })} `}
                                            {name?.enabled && name?.value}
                                            {(startDate?.enabled || endDate?.enabled) && (
                                                <span className={classes.positionDate}>
                                                    {' ('}
                                                    {startDate?.enabled && startDate?.value}
                                                    {(startDate?.enabled && endDate?.enabled) && ' - '}
                                                    {endDate?.enabled && endDate?.value}
                                                    {')'}
                                                </span>
                                            )}
                                        </p>
                                        <p className={classes.urlAndLocation}>
                                            {location?.enabled && location?.value}
                                            {(
                                                (location?.enabled && url?.enabled)
                                                && (location?.value && url?.value)
                                            ) && ', '}
                                            {url?.enabled && (
                                                <a href={url?.value}>
                                                    {url?.value}
                                                </a>
                                            )}
                                        </p>
                                    </div>
                                    <p className={classes.summary}>
                                        {summary?.enabled && summary?.value}
                                    </p>
                                    <p className={classes.description}>
                                        {description?.enabled && description?.value}
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
        </div>
    );
};

export default Work;
