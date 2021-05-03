import React, { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-intl';

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
                margin: '0',
            },
        },
    },
    project: {
        fontWeight: 'bold',
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

    return projects.length > 0 && (
        <div className={classes.resumeProjects}>
            <h3
                ref={sectionTitle}
                className={classes.title}
                style={titleStyle}
            >
                {intl.formatMessage({ id: 'projects' })}
            </h3>
            <div className={classes.contentWrapper}>
                <ul className={classes.projects}>
                    {projects.map((project) => {
                        if (project?.enabled) {
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
                            } = project?.value || {};

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
                                        {name?.enabled && name?.value}
                                        {(startDate?.enabled || endDate?.enabled) && (
                                            <span className={classes.positionDate}>
                                                {' ('}
                                                {startDate?.enabled && startDate?.value}
                                                {(startDate?.enabled && endDate?.enabled) && ' - '}
                                                {endDate?.enabled && endDate?.value}
                                                {')'}
                                            </span>
                                        )}
                                    </p>
                                    {type && type?.enabled && <p>{type?.value}</p>}
                                    {entity && entity?.enabled && <p>{entity?.value}</p>}
                                    {(url && url?.enabled && url?.value) && <a href={url.value}>{url.value}</a>}
                                    {description && description?.enabled && <p>{description?.value}</p>}
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

export default Projects;
