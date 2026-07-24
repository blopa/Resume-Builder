import { Fragment } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';

// Utils
import { mutedColor } from '../styles';
import { toDisplayUrl } from '../utils';

const useStyles = makeStyles((theme) => ({
    resumeBasics: {
        pageBreakInside: 'avoid',
        display: 'flex',
        alignItems: 'flex-start',
        paddingBottom: '10px',
    },
    identity: {
        flex: '1',
        minWidth: '0',
    },
    name: {
        margin: '0',
        fontSize: '1.6rem',
        lineHeight: '1.1',
        letterSpacing: '-0.3px',
    },
    label: {
        color: mutedColor(theme),
    },
    contact: {
        flex: 'none',
        paddingLeft: '20px',
        textAlign: 'right',
        color: mutedColor(theme),
        '& > *': {
            overflowWrap: 'break-word',
        },
    },
    image: {
        width: '70px',
        marginLeft: '16px',
    },
    summary: {
        '& p': {
            margin: '0',
        },
    },
}));

const Basics = ({ basics: { name, label, image, email, phone, url, summary, profiles, location } }) => {
    const classes = useStyles();
    const intl = useIntl();
    const { address, postalCode, city, countryCode, region } = location || {};

    const locationText = [address, city, region, postalCode, countryCode].filter(Boolean).join(', ');
    const links = [
        ...(url ? [{ href: url, text: toDisplayUrl(url) }] : []),
        ...(profiles || [])
            .map((profile) => {
                const { url: profileUrl, network, username } = profile || {};
                const text = toDisplayUrl(profileUrl) || [network, username].filter(Boolean).join('/');

                return text ? { href: profileUrl, text } : null;
            })
            .filter(Boolean),
    ];

    return (
        <Fragment>
            <div className={classes.resumeBasics}>
                <div className={classes.identity}>
                    {name && <h2 className={classes.name}>{name}</h2>}
                    {label && <p className={classes.label}>{label}</p>}
                </div>
                <div className={classes.contact}>
                    {locationText && <p>{locationText}</p>}
                    {(email || phone) && (
                        <p>
                            {email && <a href={`mailto:${email}`}>{email}</a>}
                            {email && phone && ' · '}
                            {phone}
                        </p>
                    )}
                    {links.length > 0 && (
                        <p>
                            {links.map(({ href, text }, index) => (
                                <Fragment key={uuid()}>
                                    {index > 0 && ' · '}
                                    {href ? (
                                        <a href={href} target="_blank" rel="noreferrer">
                                            {text}
                                        </a>
                                    ) : (
                                        text
                                    )}
                                </Fragment>
                            ))}
                        </p>
                    )}
                </div>
                {image && <img className={classes.image} src={image} alt="avatar" />}
            </div>
            {summary && (
                <Section title={intl.formatMessage({ id: 'summary' })}>
                    <div className={classes.summary} dangerouslySetInnerHTML={{ __html: summary }} />
                </Section>
            )}
        </Fragment>
    );
};

export default Basics;
