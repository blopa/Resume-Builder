import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeCertificates: {
        padding: '15px 0',
    },
    certificates: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 12px 0',
            '&:last-child': {
                margin: '0',
            },
        },
    },
    certificate: {
        fontWeight: 'bold',
    },
    meta: {
        color: theme.palette.type === 'dark' ? '#b0b0b0' : '#7d7d7d',
    },
    contentWrapper: {
        marginTop: '8px',
        marginLeft: '10px',
    },
    certificateWrapper: {
        pageBreakInside: 'avoid',
    },
}));

const Certificates = ({ certificates }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return (
        certificates?.length > 0 && (
            <div className={classes.resumeCertificates}>
                <SectionTitle ref={sectionTitle} style={titleStyle}>
                    {intl.formatMessage({ id: 'certificates' })}
                </SectionTitle>
                <div className={classes.contentWrapper}>
                    <ul className={classes.certificates}>
                        {certificates.map((certificate) => {
                            if (certificate) {
                                const { name, date, url, issuer } = certificate || {};

                                let refProps = {};
                                if (!firstItem.current) {
                                    refProps = {
                                        ref: firstItem,
                                    };
                                }

                                const meta = [date, issuer].filter(Boolean).join(' - ');

                                return (
                                    <li
                                        className={classes.certificateWrapper}
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        <p>
                                            {name &&
                                                (url ? (
                                                    <a className={classes.certificate} href={url}>
                                                        {name}
                                                    </a>
                                                ) : (
                                                    <span className={classes.certificate}>{name}</span>
                                                ))}
                                            {meta && (
                                                <span className={classes.meta}>
                                                    {name && ' - '}
                                                    {meta}
                                                </span>
                                            )}
                                        </p>
                                    </li>
                                );
                            }

                            return null;
                        })}
                    </ul>
                </div>
            </div>
        )
    );
};

export default Certificates;
