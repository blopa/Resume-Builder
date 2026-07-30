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
    resumeCompactTemplate: {
        padding: '36px 40px',
        // the whole point of this template: small type and tight leading fit far
        // more on a page than Default does
        fontSize: '0.8rem',
        lineHeight: '1.35',
        color: theme.palette.text.primary,
        '& h3': { margin: '0' },
        '& p': {
            margin: 0,
            marginBlockStart: 0,
            marginBlockEnd: 0,
        },
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
}));

const Compact = ({
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
            className={classes.resumeCompactTemplate}
            templateIntls={templateIntls}
            customTranslations={customTranslations}
            jsonResume={jsonResume}
            downloadableResume={downloadableResume}
            coverLetterVariables={coverLetterVariables}
        >
            {isObjectNotEmpty(basics) && <Basics basics={basics} />}
            {work?.length > 0 && <Work work={work} />}
            {education?.length > 0 && <Education education={education} />}
            {skills?.length > 0 && <Skills skills={skills} />}
            {projects?.length > 0 && <Projects projects={projects} />}
            {certificates?.length > 0 && <Certificates certificates={certificates} />}
            {awards?.length > 0 && <Awards awards={awards} />}
            {volunteer?.length > 0 && <Volunteer volunteer={volunteer} />}
            {publications?.length > 0 && <Publications publications={publications} />}
            {languages?.length > 0 && <Languages languages={languages} />}
            {interests?.length > 0 && <Interests interests={interests} />}
            {references?.length > 0 && <References references={references} />}
        </TemplateShell>
    );
};

export default Compact;
