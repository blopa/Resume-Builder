import React, { Fragment, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { IntlContext } from 'gatsby-plugin-intl';

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
    aboutAndContactWrapper: {
        display: 'flex',
    },
    aboutWrapper: {
        width: '60%',
        paddingRight: '20px',
    },
    contactWrapper: {
        width: '40%',
    },
    locationWrapper: {
        display: 'inline-flex',
        '&> *': {
            marginRight: '5px',
        },
        '&> *:last-child': {
            marginRight: 0,
        },
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
        url,
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
    const intl = useContext(IntlContext);

    return (
        <div className={classes.resumeBasicsWrapper}>
            {name?.enabled && (
                <Typography
                    className={classes.resumeName}
                    color="textPrimary"
                    variant="h4"
                >
                    {name?.value}
                </Typography>
            )}
            {label?.enabled && (
                <Typography
                    className={classes.resumeLabel}
                    color="textPrimary"
                    variant="body1"
                >
                    {label?.value}
                </Typography>
            )}
            <div className={classes.aboutAndContactWrapper}>
                {summary?.enabled && (
                    <div className={classes.aboutWrapper}>
                        <Typography
                            className={classes.subtitle}
                            color="textPrimary"
                            variant="body1"
                        >
                            {intl.formatMessage({ id: 'about' })}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="body1"
                        >
                            {summary?.value}
                        </Typography>
                    </div>
                )}
                {(
                    email?.enabled
                    || phone?.enabled
                    || profiles?.enabled
                    || locationEnabled
                ) && (
                    <div className={classes.contactWrapper}>
                        <Typography
                            className={classes.subtitle}
                            color="textPrimary"
                            variant="body1"
                        >
                            {intl.formatMessage({ id: 'contact' })}
                        </Typography>
                        {locationEnabled && (
                            <div className={classes.locationWrapper}>
                                {city?.enabled && (
                                    <Typography
                                        color="textPrimary"
                                        variant="body1"
                                    >
                                        {city?.value}{','}
                                    </Typography>
                                )}
                                {postalCode?.enabled && (
                                    <Typography
                                        color="textPrimary"
                                        variant="body1"
                                    >
                                        {postalCode?.value}
                                    </Typography>
                                )}
                            </div>
                        )}
                        {phone?.enabled && (
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                {phone?.value}
                            </Typography>
                        )}
                        {email?.enabled && (
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                {email?.value}
                            </Typography>
                        )}
                        {profiles?.enabled && profiles?.value.map((profile) => {
                            const { url: profileUrl } = profile?.value || {};
                            return profileUrl?.enabled && (
                                <Typography
                                    key={uuid()}
                                    color="textPrimary"
                                    variant="body1"
                                >
                                    {profileUrl?.value}
                                </Typography>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Basics;
