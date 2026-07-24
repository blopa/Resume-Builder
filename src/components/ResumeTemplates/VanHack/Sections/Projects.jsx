import { Fragment, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import SectionTitle from './SectionTitle';
import BulletList from './BulletList';

// Hooks
import useAntiPageBreakTitle from '../../../hooks/useAntiPageBreakTitle';

const useStyles = makeStyles((theme) => ({
    resumeProjects: {
        padding: '15px 0',
    },
    projects: {
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
    // the project name and its description share a single line: "Speakasso: web-based generative art"
    projectHeader: {
        '& p': {
            display: 'inline',
            margin: '0',
        },
    },
    project: {
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
    meta: {
        color: theme.palette.type === 'dark' ? '#b0b0b0' : '#7d7d7d',
    },
    contentWrapper: {
        marginTop: '8px',
        marginLeft: '10px',
    },
    projectWrapper: {
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
                <SectionTitle ref={sectionTitle} style={titleStyle}>
                    {intl.formatMessage({ id: 'projects' })}
                </SectionTitle>
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

                                const dates = [startDate, endDate].filter(Boolean).join(' - ');
                                const meta = [type, entity, roles?.filter(Boolean).join(', ')]
                                    .filter(Boolean)
                                    .join(' - ');

                                return (
                                    <li
                                        className={classes.projectWrapper}
                                        key={uuid()}
                                        // eslint-disable-next-line react/jsx-props-no-spreading
                                        {...refProps}
                                    >
                                        <div className={classes.projectHeader}>
                                            {name &&
                                                (url ? (
                                                    <a className={classes.project} href={url}>
                                                        {name}
                                                    </a>
                                                ) : (
                                                    <span className={classes.project}>{name}</span>
                                                ))}
                                            {dates && (
                                                <span className={classes.meta}>
                                                    {name && ' - '}
                                                    {dates}
                                                </span>
                                            )}
                                            {description && (
                                                <Fragment>
                                                    {name && ': '}
                                                    <span dangerouslySetInnerHTML={{ __html: description }} />
                                                </Fragment>
                                            )}
                                        </div>
                                        {meta && <p className={classes.meta}>{meta}</p>}
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

export default Projects;
