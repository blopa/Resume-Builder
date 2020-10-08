import React, { Fragment } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    resumeBasicsWrapper: {
        // TODO
    },
    subtitle: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    resumeName: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    resumeLabel: {
        fontWeight: 'bold',
    },
    resumeSummary: {
        // TODO
    },
    address: {
        // TODO
    },
    contactInfo: {
        // TODO
    },
    socialMedia: {
        // TODO
    },
    website: {
        // TODO
    },
}));

const Basics = ({
    basics: {
        name,
        label,
        picture,
        email,
        phone,
        website,
        summary,
        location: {
            enabled: locationEnabled,
            value: {
                address,
                postalCode,
                city,
                countryCode,
                region,
            },
        },
        profiles,
    },
}) => {
    const classes = useStyles();

    return (
        <div className={classes.resumeBasicsWrapper}>
            {name?.enabled && (
                <Typography
                    className={classes.resumeName}
                    color="textPrimary"
                    variant="h4"
                >
                    {name.value}
                </Typography>
            )}
            {label?.enabled && (
                <Typography
                    className={classes.resumeLabel}
                    color="textPrimary"
                    variant="body1"
                >
                    {label.value}
                </Typography>
            )}
            {summary?.enabled && (
                <div>
                    <Typography
                        className={classes.subtitle}
                        color="textPrimary"
                        variant="body1"
                    >
                        About
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        {summary.value}
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default Basics;
