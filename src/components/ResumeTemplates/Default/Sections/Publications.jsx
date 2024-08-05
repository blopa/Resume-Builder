import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumePublications: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    publications: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 10px 0',
            '&:last-child': {
                margin: '3px 0 0',
            },
        },
    },
    publication: {
        fontWeight: 'bold',
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    publicationWrapper: {
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

const Publications = ({ publications }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return (
        publications?.length > 0 && (
            <div className={classes.resumePublications}>
                <h3 ref={sectionTitle} className={classes.title} style={titleStyle}>
                    {intl.formatMessage({ id: 'publications' })}
                </h3>
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

                                return (
                                    <li
                                        className={classes.publicationWrapper}
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        <p className={classes.publication}>
                                            {name}
                                            {publisher && name && ` ${intl.formatMessage({ id: 'at' })} `}
                                            {publisher}
                                            {releaseDate && (
                                                <span className={classes.positionDate}>{` (${releaseDate})`}</span>
                                            )}
                                        </p>
                                        {url && <a href={url}>{url}</a>}
                                        {summary && <span dangerouslySetInnerHTML={{ __html: summary }} />}
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
