/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';

// Utils
import { secondaryTextColor } from '../styles';
import { toDisplayUrl } from '../../../ResumeTemplateShell/utils';

const useStyles = makeStyles((theme) => ({
    basics: {
        pageBreakInside: 'avoid',
    },
    header: {
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'start',
        minHeight: '48px',
    },
    contact: {
        paddingTop: '1px',
        color: secondaryTextColor(theme),
        '& > *': {
            overflowWrap: 'anywhere',
        },
        '& a': {
            color: 'inherit',
        },
    },
    identity: {
        padding: '0 18px',
        textAlign: 'center',
    },
    name: {
        fontSize: '1.55rem',
        lineHeight: 1.1,
        fontWeight: 400,
        letterSpacing: '-0.3px',
        whiteSpace: 'nowrap',
    },
    label: {
        marginTop: '2px !important',
        color: secondaryTextColor(theme),
    },
    links: {
        textAlign: 'right',
        '& a': {
            display: 'block',
        },
    },
    summary: {
        marginTop: '4px',
        '& p': {
            margin: 0,
        },
    },
}));

const Basics = ({ basics: { name, label, email, phone, url, summary, profiles, location } }) => {
    const classes = useStyles();
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
        <div className={classes.basics}>
            <div className={classes.header}>
                <div className={classes.contact}>
                    {locationText && <p>{locationText}</p>}
                    {email && <a href={`mailto:${email}`}>{email}</a>}
                    {phone && <p>{phone}</p>}
                </div>
                <div className={classes.identity}>
                    {name && <h2 className={classes.name}>{name}</h2>}
                    {label && <p className={classes.label}>{label}</p>}
                </div>
                <div className={`${classes.contact} ${classes.links}`}>
                    {links.map(({ href, text }, index) =>
                        href ? (
                            <a key={index} href={href} target="_blank" rel="noreferrer">
                                {text}
                            </a>
                        ) : (
                            <p key={index}>{text}</p>
                        )
                    )}
                </div>
            </div>
            {summary && <div className={classes.summary} dangerouslySetInnerHTML={{ __html: summary }} />}
        </div>
    );
};

export default Basics;
