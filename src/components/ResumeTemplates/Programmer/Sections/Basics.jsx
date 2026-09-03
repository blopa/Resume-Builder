/* eslint-disable react/prop-types, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';

import { accentColor, iconColor, inkColor } from '../styles';
import { toDisplayUrl } from '../../../ResumeTemplateShell/utils';

const useStyles = makeStyles((theme) => ({
    basics: {
        pageBreakInside: 'avoid',
        paddingBottom: '8px',
    },
    name: {
        color: inkColor(theme),
        fontSize: '2.18rem',
        lineHeight: 1,
        fontWeight: 800,
        letterSpacing: '0.3px',
        textTransform: 'uppercase',
    },
    label: {
        marginTop: '8px !important',
        color: accentColor(theme),
        fontSize: '1.33rem',
        lineHeight: 1,
        fontWeight: 700,
    },
    contacts: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '8px 22px',
        marginTop: '12px',
    },
    contact: {
        display: 'flex',
        alignItems: 'center',
        minWidth: 0,
        '& svg': {
            flex: '0 0 auto',
            width: '14px',
            height: '14px',
            marginRight: '4px',
            color: iconColor(theme),
        },
        '& a, & span': {
            minWidth: 0,
            overflowWrap: 'anywhere',
        },
    },
}));

const getProfileIcon = (network = '') => {
    const normalizedNetwork = network.toLowerCase();

    if (normalizedNetwork.includes('linkedin')) {
        return LinkedInIcon;
    }
    if (normalizedNetwork.includes('github')) {
        return GitHubIcon;
    }

    return LanguageIcon;
};

const Contact = ({ Icon, href, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.contact}>
            <Icon aria-hidden="true" />
            {href ? (
                <a href={href} target="_blank" rel="noreferrer">
                    {children}
                </a>
            ) : (
                <span>{children}</span>
            )}
        </div>
    );
};

const Basics = ({ basics: { name, label, email, phone, url, profiles = [], location } }) => {
    const classes = useStyles();
    const { address, city, region, postalCode, countryCode } = location || {};
    const locationText = [address, city, region, postalCode, countryCode].filter(Boolean).join(', ');

    return (
        <header className={classes.basics}>
            {name && <h2 className={classes.name}>{name}</h2>}
            {label && <p className={classes.label}>{label}</p>}
            <div className={classes.contacts}>
                {email && (
                    <Contact Icon={EmailIcon} href={`mailto:${email}`}>
                        {email}
                    </Contact>
                )}
                {phone && <Contact Icon={PhoneIcon}>{phone}</Contact>}
                {locationText && <Contact Icon={LocationOnIcon}>{locationText}</Contact>}
                {profiles.map((profile, index) => {
                    const { network, username, url: profileUrl } = profile || {};
                    const text = network || username || toDisplayUrl(profileUrl);
                    const Icon = getProfileIcon(network || profileUrl);

                    return (
                        text && (
                            <Contact key={index} Icon={Icon} href={profileUrl}>
                                {text}
                            </Contact>
                        )
                    );
                })}
                {url && (
                    <Contact Icon={LanguageIcon} href={url}>
                        {toDisplayUrl(url)}
                    </Contact>
                )}
            </div>
        </header>
    );
};

export default Basics;
