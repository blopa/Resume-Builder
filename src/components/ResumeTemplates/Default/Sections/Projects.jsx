import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    resumeProjects: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    projects: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': { margin: '0 0 10px 0', '&:last-child': { margin: '0' } },
    },
    project: { fontWeight: 'bold' },
    contentWrapper: {
        marginLeft: '4px',
    },
    projectWrapper: {
        pageBreakInside: 'avoid',
    },
}));

const Projects = ({ projects }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return projects.length > 0 && (
        <div className={classes.resumeProjects}>
            <h3>
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
                            return (
                                <li className={classes.projectWrapper} key={uuid()}>
                                    {name?.enabled && (
                                        <p className={classes.project}>
                                            {name?.value}
                                        </p>
                                    )}
                                    {description && description?.enabled && <p>{description?.value}</p>}
                                    {startDate && startDate?.enabled && <p>{startDate?.value}</p>}
                                    {endDate && endDate?.enabled && <p>{endDate?.value}</p>}
                                    {(url && url?.enabled && url?.value) && <a href={url.value}>{url.value}</a>}
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
