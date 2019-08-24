import React, { Fragment } from 'react';
import style from './default-sections.scss';

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
    <Fragment>
        <div className={style['resume-basics']}>
            {name && name.enabled
            && <h3>{name.value}</h3>
            }
            {label && label.enabled
            && <h4>{label.value}</h4>
            }
            {locationEnabled && (
                <ul className={style['resume-basics--address']}>
                    {address && address.enabled && <li>{address.value}</li>}
                    {city && city.enabled && <li>{city.value}</li>}
                    {region && region.enabled && <li>{region.value}</li>}
                    {postalCode && postalCode.enabled && <li>{postalCode.value}</li>}
                    {countryCode && countryCode.enabled && <li>{countryCode.value}</li>}
                </ul>
            )}
            <ul className={style['resume-basics--contact-info']}>
                {website && website.enabled && (
                    <li>
                        <a className={style['resume-basics--website']} href={website.value}>
                            {website.value}
                        </a>
                    </li>
                )}
                {phone && phone.enabled && <li>{phone.value}</li>}
                {email && email.enabled && <li>{email.value}</li>}
            </ul>
            {profiles && profiles.enabled && (
                <ul className={style['resume-basics--social-media']}>
                    {profiles.value.map((profile) => {
                        if (profile.enabled) {
                            const { url, network, username } = profile.value;
                            return url.enabled && network.enabled && username.enabled && (
                                <li>
                                    <a
                                        href={url.value}
                                        title={username.value}
                                    >
                                        {network.value}
                                    </a>
                                </li>
                            );
                        }

                        return null;
                    })}
                </ul>
            )}
        </div>
        {summary && summary.enabled && (
            <div className={style['resume-summary']}>
                <h4>Summary</h4>
                <p>{summary.value}</p>
            </div>
        )}
    </Fragment>
);

export default Basics;
