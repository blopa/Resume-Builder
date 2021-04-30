import React, { Fragment, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    resumeSummary: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    resumeBasics: {
        pageBreakInside: 'avoid',
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
    url: {},
    detailsWrapper: {
        marginLeft: '4px',
    },
    summaryWrapper: {
        marginLeft: '4px',
    },
    image: {
        width: '100px',
        float: 'right',
    },
}));

const Basics = ({
    basics: {
        name,
        label,
        image,
        email,
        phone,
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
                {(image?.enabled && image.value) && (
                    <img
                        className={classes.image}
                        src={image.value}
                        alt="avatar"
                    />
                )}
                {name?.enabled && <h2>{name?.value}</h2>}
                {label?.enabled && <h3>{label?.value}</h3>}
                <div className={classes.detailsWrapper}>
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
            </div>
            {summary?.enabled && (
                <div className={classes.resumeSummary}>
                    <h3>
                        {intl.formatMessage({ id: 'summary' })}
                    </h3>
                    <div className={classes.summaryWrapper}>
                        <p>{summary?.value}</p>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Basics;
