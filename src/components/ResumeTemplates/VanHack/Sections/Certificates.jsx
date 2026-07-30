import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';

// Hooks
import useAntiPageBreakSection from '../../../hooks/useAntiPageBreakSection';

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
    const { titleRef, titleStyle, firstItemProps } = useAntiPageBreakSection();

    return (
        certificates?.length > 0 && (
            <div className={classes.resumeCertificates}>
                <SectionTitle ref={titleRef} style={titleStyle}>
                    {intl.formatMessage({ id: 'certificates' })}
                </SectionTitle>
                <div className={classes.contentWrapper}>
                    <ul className={classes.certificates}>
                        {certificates.map((certificate, index) => {
                            if (certificate) {
                                const { name, date, url, issuer } = certificate || {};

                                const meta = [date, issuer].filter(Boolean).join(' - ');

                                return (
                                    <li
                                        className={classes.certificateWrapper}
                                        key={index}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...firstItemProps()}
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
