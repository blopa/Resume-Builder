import { makeStyles } from '@material-ui/core/styles';

// local template translations
import templateIntls from './intl';

// Components
import TemplateShell from '../../ResumeTemplateShell';
import Basics from './Sections/Basics';
import Awards from './Sections/Awards';
import Education from './Sections/Education';
import Interests from './Sections/Interests';
import Languages from './Sections/Languages';
import Publications from './Sections/Publications';
import References from './Sections/References';
import Skills from './Sections/Skills';
import Volunteer from './Sections/Volunteer';
import Work from './Sections/Work';
import Projects from './Sections/Projects';
import Certificates from './Sections/Certificates';

// Utils
import { isObjectNotEmpty } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
    resumeVanHackTemplate: {
        padding: '40px',
        fontSize: '0.95rem',
        lineHeight: '1.45',
        color: theme.palette.text.primary,
        '& h3': { margin: '0' },
        '& p': {
            margin: 0,
            marginBlockStart: 0,
            marginBlockEnd: 0,
        },
        // the template is print-first, so links carry no colour of their own
        '& a': {
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
        '@media print': {
            padding: 0,
        },
    },
    topRule: {
        borderTop: `1px solid ${theme.palette.type === 'dark' ? '#5a5a5a' : '#bdbdbd'}`,
        marginBottom: '26px',
    },
}));

const VanHack = ({
    customTranslations = {},
    coverLetterVariables = {},
    jsonResume,
    downloadableResume,
    jsonResume: {
        basics,
        work,
        skills,
        education,
        awards,
        volunteer,
        publications,
        languages,
        interests,
        references,
        projects,
        certificates,
    },
}) => {
    const classes = useStyles();

    return (
        <TemplateShell
            className={classes.resumeVanHackTemplate}
            templateIntls={templateIntls}
            customTranslations={customTranslations}
            jsonResume={jsonResume}
            downloadableResume={downloadableResume}
            coverLetterVariables={coverLetterVariables}
        >
            <div className={classes.topRule} />
            {isObjectNotEmpty(basics) && <Basics basics={basics} />}
            {work?.length > 0 && <Work work={work} />}
            {projects?.length > 0 && <Projects projects={projects} />}
            {education?.length > 0 && <Education education={education} />}
            {awards?.length > 0 && <Awards awards={awards} />}
            {certificates?.length > 0 && <Certificates certificates={certificates} />}
            {volunteer?.length > 0 && <Volunteer volunteer={volunteer} />}
            {publications?.length > 0 && <Publications publications={publications} />}
            {skills?.length > 0 && <Skills skills={skills} />}
            {languages?.length > 0 && <Languages languages={languages} />}
            {interests?.length > 0 && <Interests interests={interests} />}
            {references?.length > 0 && <References references={references} />}
        </TemplateShell>
    );
};

export default VanHack;
