import { Fragment } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

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

const Basics = ({ basics: { name, label, image, email, phone, url, summary, profiles, location } }) => {
    const classes = useStyles();
    const intl = useIntl();
    const { address, postalCode, city, countryCode, region } = location || {};

    const locationEnabled = Boolean(address || city || region || postalCode || countryCode);

    return (
        <Fragment>
            <div className={classes.resumeBasics}>
                {image && <img className={classes.image} src={image} alt="avatar" />}
                {name && <h2>{name}</h2>}
                {label && <h3>{label}</h3>}
                <div className={classes.detailsWrapper}>
                    {locationEnabled && (
                        <ul className={classes.address}>
                            {address && <li key={uuid()}>{address}</li>}
                            {city && <li key={uuid()}>{city}</li>}
                            {region && <li key={uuid()}>{region}</li>}
                            {postalCode && <li key={uuid()}>{postalCode}</li>}
                            {countryCode && <li key={uuid()}>{countryCode}</li>}
                        </ul>
                    )}
                    <ul className={classes['contact-info']}>
                        {url && (
                            <li key={uuid()}>
                                <a className={classes.url} href={url} target="_blank" rel="noreferrer">
                                    {url}
                                </a>
                            </li>
                        )}
                        {phone && <li key={uuid()}>{phone}</li>}
                        {email && <li key={uuid()}>{email}</li>}
                    </ul>
                    {profiles?.length > 0 && (
                        <ul className={classes['social-media']}>
                            {profiles?.map((profile) => {
                                if (profile) {
                                    const { url: profileUrl, network, username } = profile || {};

                                    const isProfileEnable = Boolean(profileUrl && network && username);

                                    return (
                                        isProfileEnable && (
                                            <li key={uuid()}>
                                                <a href={profileUrl} title={username} target="_blank" rel="noreferrer">
                                                    {network}
                                                </a>
                                            </li>
                                        )
                                    );
                                }

                                return null;
                            })}
                        </ul>
                    )}
                </div>
            </div>
            {summary && (
                <div className={classes.resumeSummary}>
                    <h3>{intl.formatMessage({ id: 'summary' })}</h3>
                    <div className={classes.summaryWrapper} dangerouslySetInnerHTML={{ __html: summary }} />
                </div>
            )}
        </Fragment>
    );
};

export default Basics;
