import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

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
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return (
        publications?.length > 0 && (
            <div className={classes.resumePublications}>
                <SectionTitle ref={sectionTitle} style={titleStyle}>
                    {intl.formatMessage({ id: 'publications' })}
                </SectionTitle>
                <div className={classes.contentWrapper}>
                    <ul className={classes.publications}>
                        {publications.map((publication) => {
                            if (publication) {
                                const { name, publisher, releaseDate, url, summary } = publication || {};

                                let refProps = {};
                                if (!firstItem.current) {
                                    refProps = {
                                        ref: firstItem,
                                    };
                                }

                                const title = [name, publisher].filter(Boolean).join(', ');

                                return (
                                    <li
                                        className={classes.publicationWrapper}
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
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
