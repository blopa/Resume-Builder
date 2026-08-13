/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

import Section from './Section';
import { toDisplayUrl } from '../../../ResumeTemplateShell/utils';

const useStyles = makeStyles(() => ({
    basics: { pageBreakInside: 'avoid' },
    name: {
        margin: 0,
        fontSize: '1.75rem',
        lineHeight: 1.05,
        fontWeight: 700,
    },
    label: { marginTop: '1px !important', fontStyle: 'italic' },
    contact: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0 7px',
        padding: '3px 0 5px',
        borderBottom: '1px solid currentColor',
        fontSize: '1rem',
        '& > *:not(:last-child)::after': {
            content: "' |'",
            color: 'currentColor',
        },
    },
    summary: { '& p': { margin: 0 } },
}));

const Basics = ({ basics: { name, label, email, phone, url, summary, profiles, location } }) => {
    const classes = useStyles();
    const intl = useIntl();
    const { address, city, region, postalCode, countryCode } = location || {};
    const locationText = [address, city, region, postalCode, countryCode].filter(Boolean).join(', ');
    const links = [
        ...(url ? [{ href: url, text: toDisplayUrl(url) }] : []),
        ...(profiles || []).map(({ url: profileUrl, network, username } = {}) => ({
            href: profileUrl,
            text: network || username || toDisplayUrl(profileUrl),
        })),
    ].filter(({ text }) => text);

    return (
        <Fragment>
            <header className={classes.basics}>
                {name && <h2 className={classes.name}>{name}</h2>}
                {label && <p className={classes.label}>{label}</p>}
                <div className={classes.contact}>
                    {email && <a href={`mailto:${email}`}>{email}</a>}
                    {phone && <span>{phone}</span>}
                    {locationText && <span>{locationText}</span>}
                    {links.map(({ href, text }, index) =>
                        href ? (
                            <a key={index} href={href} target="_blank" rel="noreferrer">
                                {text}
                            </a>
                        ) : (
                            <span key={index}>{text}</span>
                        )
                    )}
                </div>
            </header>
            {summary && (
                <Section title={intl.formatMessage({ id: 'summary' })}>
                    <div className={classes.summary} dangerouslySetInnerHTML={{ __html: summary }} />
                </Section>
            )}
        </Fragment>
    );
};

export default Basics;
