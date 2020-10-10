import React, { Fragment, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    resumeSummary: { padding: '10px 0', borderBottom: '1px solid #ddd' },
    resumeBasics: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
        '& h2': { textTransform: 'uppercase', margin: '0' },
    },
    address: {
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
    'contact-info': {
        margin: '0',
        padding: '0',
        display: 'flex',
        listStyle: 'none',
        '& li': {
            margin: '0 5px 0 0',
            '&:after': { content: '" |"' },
            '&:last-child': { '&:after': { content: '""' } },
        },
    },
    'social-media': {
        margin: '0',
        padding: '0',
        display: 'flex',
        listStyle: 'none',
        '& li': {
            margin: '0 5px 0 0',
            '&:after': { content: '" |"' },
            '&:last-child': { '&:after': { content: '""' } },
        },
    },
    website: {},
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
        <Fragment>
            <div className={classes.resumeBasics}>
                {name?.enabled && <h2>{name?.value}</h2>}
                {label?.enabled && <h3>{label?.value}</h3>}
                {locationEnabled && (
                    <ul className={classes.address}>
                        {address?.enabled && <li key={uuid()}>{address?.value}</li>}
                        {city?.enabled && <li key={uuid()}>{city?.value}</li>}
                        {region?.enabled && <li key={uuid()}>{region?.value}</li>}
                        {postalCode?.enabled && <li key={uuid()}>{postalCode?.value}</li>}
                        {countryCode?.enabled && <li key={uuid()}>{countryCode?.value}</li>}
                    </ul>
                )}
                <ul className={classes['contact-info']}>
                    {url?.enabled && (
                        <li key={uuid()}>
                            <a
                                className={classes.url}
                                href={url?.value}
                                target="_blank"
                            >
                                {url?.value}
                            </a>
                        </li>
                    )}
                    {website?.enabled && (
                        <li key={uuid()}>
                            <a
                                className={classes.website}
                                href={website?.value}
                                target="_blank"
                            >
                                {website?.value}
                            </a>
                        </li>
                    )}
                    {phone?.enabled && <li key={uuid()}>{phone?.value}</li>}
                    {email?.enabled && <li key={uuid()}>{email?.value}</li>}
                </ul>
                {profiles?.enabled && (
                    <ul className={classes['social-media']}>
                        {profiles?.value.map((profile) => {
                            if (profile?.enabled) {
                                const { url: profileUrl, network, username } = profile?.value || {};

                                return profileUrl?.enabled && network?.enabled && username?.enabled && (
                                    <li key={uuid()}>
                                        <a
                                            href={profileUrl?.value}
                                            title={username?.value}
                                            target="_blank"
                                        >
                                            {network?.value}
                                        </a>
                                    </li>
                                );
                            }

                            return null;
                        })}
                    </ul>
                )}
            </div>
            {summary?.enabled && (
                <div className={classes.resumeSummary}>
                    <h3>
                        {intl.formatMessage({ id: 'summary' })}
                    </h3>
                    <p>{summary?.value}</p>
                </div>
            )}
        </Fragment>
    );
};

export default Basics;
