/* eslint-disable react/prop-types, gatsby/purify-html, gatsby/use-gatsby-link */
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';
import BulletList from './BulletList';

// Utils
import { secondaryTextColor } from '../styles';

const useStyles = makeStyles((theme) => ({
    projects: {
        margin: 0,
        paddingLeft: '22px',
    },
    project: {
        pageBreakInside: 'avoid',
        paddingLeft: '1px',
        '& > p': {
            display: 'inline',
        },
        '& $highlights': {
            marginLeft: '-1px',
        },
    },
    name: {
        fontWeight: 700,
    },
    description: {
        display: 'inline',
        '& p': {
            display: 'inline',
        },
    },
    meta: {
        color: secondaryTextColor(theme),
    },
    highlights: {},
}));

const Projects = ({ projects }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Section title={intl.formatMessage({ id: 'projects' })}>
            <ul className={classes.projects}>
                {projects.map((item, index) => {
                    if (!item) {
                        return null;
                    }

                    const { name, description, highlights, keywords, startDate, endDate, url, roles, entity, type } =
                        item;
                    const dates = [startDate, endDate].filter(Boolean).join('—');
                    const meta = [type, entity, roles?.filter(Boolean).join(', '), dates].filter(Boolean).join(' · ');

                    return (
                        <li className={classes.project} key={index}>
                            {name && <span className={classes.name}>{url ? <a href={url}>{name}</a> : name} - </span>}
                            {description && (
                                <div
                                    className={classes.description}
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            )}
                            {meta && <span className={classes.meta}>{` ${meta}`}</span>}
                            <div className={classes.highlights}>
                                <BulletList items={highlights} />
                            </div>
                            {keywords?.length > 0 && (
                                <p className={classes.meta}>{keywords.filter(Boolean).join(', ')}</p>
                            )}
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
};

export default Projects;
