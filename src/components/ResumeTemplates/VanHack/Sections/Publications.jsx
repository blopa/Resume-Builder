import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';

// Hooks
import useAntiPageBreakSection from '../../../hooks/useAntiPageBreakSection';

const useStyles = makeStyles((theme) => ({
    resumePublications: {
        padding: '15px 0',
    },
    publications: {
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
    publication: {
        fontWeight: 'bold',
    },
    meta: {
        color: theme.palette.type === 'dark' ? '#b0b0b0' : '#7d7d7d',
    },
    contentWrapper: {
        marginTop: '8px',
        marginLeft: '10px',
    },
    publicationWrapper: {
        pageBreakInside: 'avoid',
    },
}));

const Publications = ({ publications }) => {
    const classes = useStyles();
    const intl = useIntl();
    const { titleRef, titleStyle, firstItemProps } = useAntiPageBreakSection();

    return (
        publications?.length > 0 && (
            <div className={classes.resumePublications}>
                <SectionTitle ref={titleRef} style={titleStyle}>
                    {intl.formatMessage({ id: 'publications' })}
                </SectionTitle>
                <div className={classes.contentWrapper}>
                    <ul className={classes.publications}>
                        {publications.map((publication, index) => {
                            if (publication) {
                                const { name, publisher, releaseDate, url, summary } = publication || {};

                                const title = [name, publisher].filter(Boolean).join(', ');

                                return (
                                    <li
                                        className={classes.publicationWrapper}
                                        key={index}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...firstItemProps()}
                                    >
                                        <p>
                                            {title &&
                                                (url ? (
                                                    <a className={classes.publication} href={url}>
                                                        {title}
                                                    </a>
                                                ) : (
                                                    <span className={classes.publication}>{title}</span>
                                                ))}
                                            {releaseDate && (
                                                <span className={classes.meta}>
                                                    {title && ' - '}
                                                    {releaseDate}
                                                </span>
                                            )}
                                        </p>
                                        {summary && <div dangerouslySetInnerHTML={{ __html: summary }} />}
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

export default Publications;
