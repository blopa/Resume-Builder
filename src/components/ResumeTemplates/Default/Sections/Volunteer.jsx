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
        '& li': { margin: '0 0 10px 0', '&:last-child': { margin: '0' } },
    },
    position: { fontWeight: 'bold' },
    website: {},
    summary: {},
    highlights: {
        margin: '0',
        padding: '0',
        display: 'flex',
        listStyle: 'none',
        '& li': {
            margin: '0 5px 0 0',
            '&:after': { content: '","' },
            '&:last-child': { '&:after': { content: '""' } },
        },
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
            <ul className={classes.volunteers}>
                {volunteers.map((volunteer) => {
                    if (volunteer?.enabled) {
                        const {
                            organization,
                            position,
                            website,
                            url,
                            startDate,
                            endDate,
                            summary,
                            highlights,
                        } = volunteer?.value || {};

                        return (
                            <li key={uuid()}>
                                <p className={classes.position}>
                                    {position?.enabled && `${position?.value}, `}
                                    {organization?.enabled && `${organization?.value}, `}
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
                                            highlight && highlight?.enabled && (
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

export default Volunteer;
