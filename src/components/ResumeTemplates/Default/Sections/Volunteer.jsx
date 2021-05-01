import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    resumeVolunteer: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    volunteers: {
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
    position: { fontWeight: 'bold' },
    positionDate: {
        fontStyle: 'italic',
        fontSize: '0.8rem',
    },
    url: {},
    summary: {},
    highlights: {
        '& li': {
            marginBottom: '1px',
            fontStyle: 'italic',
        },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    volunteerWrapper: {
        pageBreakInside: 'avoid',
    },
}));

const Volunteer = ({ volunteer: volunteers }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return volunteers.length > 0 && (
        <div className={classes.resumeVolunteer}>
            <h3>
                {intl.formatMessage({ id: 'volunteers' })}
            </h3>
            <div className={classes.contentWrapper}>
                <ul className={classes.volunteers}>
                    {volunteers.map((volunteer) => {
                        if (volunteer?.enabled) {
                            const {
                                organization,
                                position,
                                url,
                                startDate,
                                endDate,
                                summary,
                                highlights,
                            } = volunteer?.value || {};

                            return (
                                <li className={classes.volunteerWrapper} key={uuid()}>
                                    <p className={classes.position}>
                                        {position?.enabled && position?.value}
                                        {(
                                            (position?.enabled && organization?.enabled)
                                            && (position?.value && organization?.value)
                                        ) && ` ${intl.formatMessage({ id: 'at' })} `}
                                        {organization?.enabled && organization?.value}
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
                                    <p className={classes.url}>
                                        {(url && url?.enabled && url?.value) && <a href={url.value}>{url.value}</a>}
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
        </div>
    );
};

export default Volunteer;
