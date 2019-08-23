import React, { Fragment } from 'react';

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
}) => (
    <div>
        {name && name.enabled && <h3>{name.value}</h3>}
        {label && label.enabled && <h4>{label.value}</h4>}
        {locationEnabled && (
            <p>
                {address && address.enabled && `${address.value}, `}
                {city && city.enabled && `${city.value}, `}
                {region && region.enabled && `${region.value}, `}
                {postalCode && postalCode.enabled && `${postalCode.value}, `}
                {countryCode && countryCode.enabled && countryCode.value}
            </p>
        )}
        <p>
            {website && website.enabled && (
                <Fragment>
                    <a href={website.value}>{website.value}</a>{' | '}
                </Fragment>
            )}
            {phone && phone.enabled && `${phone.value} | `}
            {email && email.enabled && email.value}
        </p>
        {profiles && profiles.enabled && (
            <ul>
                {profiles.value.map((profile) => {
                    if (profile.enabled) {
                        const { url, network, username } = profile.value;
                        return url.enabled && network.enabled && username.enabled && (
                            <li>
                                <a
                                    href={url.value}
                                    title={network.value}
                                >
                                    {username.value}
                                </a>
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        )}
        {summary && summary.enabled && (
            <div>
                <hr />
                <h4>Summary</h4>
                <p>{summary.value}</p>
            </div>
        )}
    </div>
);

export default Basics;
