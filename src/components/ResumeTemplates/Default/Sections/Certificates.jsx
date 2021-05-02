import React, { useContext, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeCertificates: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    award: { fontWeight: 'bold' },
    certificates: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': { margin: '0 0 10px 0', '&:last-child': { margin: '0' } },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    awardWrapper: {
        pageBreakInside: 'avoid',
    },
    positionDate: {
        fontStyle: 'italic',
        fontSize: '0.8rem',
    },
    title: {
        pageBreakInside: 'avoid',
    },
}));

const Certificates = ({ certificates }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return certificates.length > 0 && (
        <div className={classes.resumeCertificates}>
            <h3
                ref={sectionTitle}
                className={classes.title}
                style={titleStyle}
            >
                {intl.formatMessage({ id: 'certificates' })}
            </h3>
            <div className={classes.contentWrapper}>
                <ul className={classes.certificates}>
                    {certificates.map((award) => {
                        if (award?.enabled) {
                            const {
                                name,
                                date,
                                url,
                                issuer,
                            } = award?.value || {};

                            let refProps = {};
                            if (!firstItem.current) {
                                refProps = {
                                    ref: firstItem,
                                };
                            }

                            return (
                                <li
                                    className={classes.awardWrapper}
                                    key={uuid()}
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...refProps}
                                >
                                    <p className={classes.award}>
                                        {name?.enabled && name?.value}
                                        {(date?.enabled && date?.value) && (
                                            <span className={classes.positionDate}>
                                                {` (${date?.value})`}
                                            </span>
                                        )}
                                    </p>
                                    {(url && url?.enabled && url?.value) && <a href={url.value}>{url.value}</a>}
                                    <p>{issuer?.enabled && issuer?.value}</p>
                                </li>
                            );
                        }

                        return null;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Certificates;
