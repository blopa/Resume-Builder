import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-react-intl';

// Components
import Section from './Section';
import Entry from './Entry';
import BulletList from './BulletList';

// Utils
import { mutedColor } from '../styles';
import { toDisplayUrl } from '../../../ResumeTemplateShell/utils';

const useStyles = makeStyles((theme) => ({
    meta: {
        color: mutedColor(theme),
    },
    body: {
        '& p': {
            margin: '0',
        },
    },
}));

const Projects = ({ projects }) => {
    const classes = useStyles();
    const intl = useIntl();

    return (
        projects?.length > 0 && (
            <Section title={intl.formatMessage({ id: 'projects' })}>
                {projects.map((project, index) => {
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

                        const dates = [startDate, endDate].filter(Boolean).join(' – ');
                        const meta = [type, entity, roles?.filter(Boolean).join(', '), url && toDisplayUrl(url)]
                            .filter(Boolean)
                            .join(' · ');

                        return (
                            <Entry key={index} title={name} dates={dates}>
                                {meta && <p className={classes.meta}>{url ? <a href={url}>{meta}</a> : meta}</p>}
                                {description && (
                                    <div className={classes.body} dangerouslySetInnerHTML={{ __html: description }} />
                                )}
                                <BulletList items={highlights} />
                                {keywords?.length > 0 && (
                                    <p className={classes.meta}>{keywords.filter(Boolean).join(' · ')}</p>
                                )}
                            </Entry>
                        );
                    }

                    return null;
                })}
            </Section>
        )
    );
};

export default Projects;
