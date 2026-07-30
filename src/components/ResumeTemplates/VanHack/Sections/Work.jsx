import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';
import BulletList from './BulletList';

// Hooks
import useAntiPageBreakSection from '../../../hooks/useAntiPageBreakSection';

const useStyles = makeStyles((theme) => ({
    resumeWork: {
        padding: '15px 0',
    },
    works: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 16px 0',
            '&:last-child': {
                margin: '0',
            },
        },
    },
    position: {
        fontWeight: 'bold',
    },
    meta: {
        color: theme.palette.type === 'dark' ? '#b0b0b0' : '#7d7d7d',
    },
    summary: {
        whiteSpace: 'break-spaces',
    },
    description: {
        whiteSpace: 'break-spaces',
    },
    contentWrapper: {
        marginTop: '8px',
        marginLeft: '10px',
    },
    workWrapper: {
        pageBreakInside: 'avoid',
    },
}));

const Work = ({ work: works }) => {
    const classes = useStyles();
    const intl = useIntl();
    const { titleRef, titleStyle, firstItemProps } = useAntiPageBreakSection();

    return (
        works?.length > 0 && (
            <div className={classes.resumeWork}>
                <SectionTitle ref={titleRef} style={titleStyle}>
                    {intl.formatMessage({ id: 'experience' })}
                </SectionTitle>
                <div className={classes.contentWrapper}>
                    <ul className={classes.works}>
                        {works.map((work, index) => {
                            if (work) {
                                const {
                                    name,
                                    location,
                                    description,
                                    position,
                                    url,
                                    startDate,
                                    endDate,
                                    summary,
                                    highlights,
                                    keywords,
                                } = work || {};

                                const title = [position, name].filter(Boolean).join(', ');
                                const meta = [startDate, endDate, location].filter(Boolean).join(' - ');

                                return (
                                    <li
                                        className={classes.workWrapper}
                                        key={index}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...firstItemProps()}
                                    >
                                        <p>
                                            {title && <span className={classes.position}>{title}</span>}
                                            {meta && (
                                                <span className={classes.meta}>
                                                    {title && ' - '}
                                                    {meta}
                                                </span>
                                            )}
                                        </p>
                                        {url && (
                                            <p className={classes.meta}>
                                                <a href={url}>{url}</a>
                                            </p>
                                        )}
                                        {summary && (
                                            <div
                                                className={classes.summary}
                                                dangerouslySetInnerHTML={{ __html: summary }}
                                            />
                                        )}
                                        {description && (
                                            <div
                                                className={classes.description}
                                                dangerouslySetInnerHTML={{ __html: description }}
                                            />
                                        )}
                                        <BulletList items={highlights} />
                                        {keywords?.length > 0 && (
                                            <p className={classes.meta}>{keywords.filter(Boolean).join(', ')}</p>
                                        )}
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

export default Work;
