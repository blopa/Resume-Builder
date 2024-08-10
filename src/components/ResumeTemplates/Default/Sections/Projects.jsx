import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeProjects: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    projects: {
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
    project: {
        fontWeight: 'bold',
    },
    highlights: {
        '& li': {
            marginBottom: '1px',
            fontStyle: 'italic',
        },
    },
    keywords: {
        flexWrap: 'wrap',
        listStyle: 'none',
        paddingLeft: 0,
        display: 'inline-flex',
        '& li': {
            fontStyle: 'italic',
            margin: '3px 3px 0 0',
            backgroundColor: theme.palette.type === 'dark' ? '#28407b' : '#dae4f4',
            borderRadius: '3px',
            padding: '1px 3px',
        },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    projectWrapper: {
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

const Projects = ({ projects }) => {
    const classes = useStyles();
    const intl = useIntl();
    const firstItem = useRef(null);
    const sectionTitle = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return (
        projects?.length > 0 && (
            <div className={classes.resumeProjects}>
                <h3 ref={sectionTitle} className={classes.title} style={titleStyle}>
                    {intl.formatMessage({ id: 'projects' })}
                </h3>
                <div className={classes.contentWrapper}>
                    <ul className={classes.projects}>
                        {projects.map((project) => {
                            if (project) {
                                const {
                                    name,
                                    description,
                                    highlights,
                                    keywords,
                                    startDate,
                                    endDate,
                                    url,
                                    roles,
                                    entity,
                                    type,
                                } = project || {};

                                let refProps = {};
                                if (!firstItem.current) {
                                    refProps = {
                                        ref: firstItem,
                                    };
                                }

                                return (
                                    <li
                                        className={classes.projectWrapper}
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        <p className={classes.project}>
                                            {name}
                                            {(startDate || endDate) && (
                                                <span className={classes.positionDate}>
                                                    {' ('}
                                                    {startDate}
                                                    {startDate && endDate && ' - '}
                                                    {endDate}
                                                    {')'}
                                                </span>
                                            )}
                                        </p>
                                        {type && <p>{type}</p>}
                                        {entity && <p>{entity}</p>}
                                        {url && <a href={url}>{url}</a>}
                                        {description && <span dangerouslySetInnerHTML={{ __html: description }} />}
                                        {highlights?.length > 0 && (
                                            <ul className={classes.highlights}>
                                                {highlights?.map(
                                                    (highlight) => highlight && <li key={uuid()}>{highlight}</li>
                                                )}
                                            </ul>
                                        )}
                                        {keywords?.length > 0 && (
                                            <ul className={classes.keywords}>
                                                {keywords?.map((keyword) => keyword && <li key={uuid()}>{keyword}</li>)}
                                            </ul>
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

export default Projects;
