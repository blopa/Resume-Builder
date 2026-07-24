import { Fragment, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeBasics: {
        pageBreakInside: 'avoid',
        paddingBottom: '15px',
    },
    header: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    headerContent: {
        flex: '1',
        minWidth: '0',
    },
    name: {
        margin: '0 0 6px 0',
        fontSize: '2rem',
        lineHeight: '1.1',
        color: '#8b84d4',
    },
    contactInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        color: theme.palette.type === 'dark' ? '#b0b0b0' : '#7d7d7d',
    },
    contactColumn: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '0',
        '& > *': {
            overflowWrap: 'break-word',
        },
    },
    contactColumnRight: {
        textAlign: 'right',
        paddingLeft: '20px',
    },
    label: {
        color: theme.palette.text.primary,
    },
    image: {
        width: '90px',
        marginLeft: '20px',
    },
    resumeSummary: {
        padding: '15px 0',
    },
    contentWrapper: {
        marginTop: '8px',
    },
}));

// the design shows bare domains, e.g. "personalwebsite.com" rather than "https://personalwebsite.com/"
const toDisplayUrl = (url) => url?.replace(/^https?:\/\//, '').replace(/\/$/, '');

const Basics = ({ basics: { name, label, image, email, phone, url, summary, profiles, location } }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);
    const { address, postalCode, city, countryCode, region } = location || {};

    const locationText = [address, city, region, postalCode, countryCode].filter(Boolean).join(', ');

    return (
        <Fragment>
            <div className={classes.resumeBasics}>
                <div className={classes.header}>
                    <div className={classes.headerContent}>
                        {name && <h2 className={classes.name}>{name}</h2>}
                        <div className={classes.contactInfo}>
                            <div className={classes.contactColumn}>
                                {label && <p className={classes.label}>{label}</p>}
                                {url && (
                                    <a href={url} target="_blank" rel="noreferrer">
                                        {toDisplayUrl(url)}
                                    </a>
                                )}
                                {profiles?.map((profile) => {
                                    const { url: profileUrl, network, username } = profile || {};
                                    const profileText =
                                        toDisplayUrl(profileUrl) || [network, username].filter(Boolean).join('/');

                                    if (!profileText) {
                                        return null;
                                    }

                                    return profileUrl ? (
                                        <a
                                            key={uuid()}
                                            href={profileUrl}
                                            title={username}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {profileText}
                                        </a>
                                    ) : (
                                        <p key={uuid()}>{profileText}</p>
                                    );
                                })}
                            </div>
                            <div className={`${classes.contactColumn} ${classes.contactColumnRight}`}>
                                {locationText && <p>{locationText}</p>}
                                {email && <a href={`mailto:${email}`}>{email}</a>}
                                {phone && <p>{phone}</p>}
                            </div>
                        </div>
                    </div>
                    {image && <img className={classes.image} src={image} alt="avatar" />}
                </div>
            </div>
            {summary && (
                <div className={classes.resumeSummary}>
                    <SectionTitle ref={sectionTitle} style={titleStyle}>
                        {intl.formatMessage({ id: 'summary' })}
                    </SectionTitle>
                    <div
                        ref={firstItem}
                        className={classes.contentWrapper}
                        dangerouslySetInnerHTML={{ __html: summary }}
                    />
                </div>
            )}
        </Fragment>
    );
};

export default Basics;
