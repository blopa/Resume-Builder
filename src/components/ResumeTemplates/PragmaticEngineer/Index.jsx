/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';

// local template translations
import templateIntls from './intl';

// Components
import TemplateShell from '../../ResumeTemplateShell';
import Basics from './Sections/Basics';
import Work from './Sections/Work';
import Education from './Sections/Education';
import Skills from './Sections/Skills';
import Projects from './Sections/Projects';
import Awards from './Sections/Awards';
import Volunteer from './Sections/Volunteer';
import Publications from './Sections/Publications';
import Interests from './Sections/Interests';
import References from './Sections/References';

// Utils
import { isObjectNotEmpty } from '../../../utils/utils';
import { accentColor } from './styles';

const useStyles = makeStyles((theme) => ({
    resumePragmaticEngineerTemplate: {
        padding: '10px 32px 32px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '0.76rem',
        lineHeight: 1.3,
        color: theme.palette.text.primary,
        '& h2, & h3, & p': {
            margin: 0,
        },
        '& a': {
            color: accentColor(theme),
            textDecoration: 'underline',
        },
        '& ul': {
            marginBlockStart: 0,
            marginBlockEnd: 0,
        },
        '@media print': {
            padding: 0,
        },
    },
}));

const PragmaticEngineer = ({
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
            className={classes.resumePragmaticEngineerTemplate}
            templateIntls={templateIntls}
            customTranslations={customTranslations}
            jsonResume={jsonResume}
            downloadableResume={downloadableResume}
            coverLetterVariables={coverLetterVariables}
        >
            {isObjectNotEmpty(basics) && <Basics basics={basics} />}
            {work?.length > 0 && <Work work={work} />}
            {(education?.length > 0 || certificates?.length > 0) && (
                <Education education={education} certificates={certificates} />
            )}
            {(skills?.length > 0 || languages?.length > 0) && <Skills skills={skills} languages={languages} />}
            {projects?.length > 0 && <Projects projects={projects} />}
            {awards?.length > 0 && <Awards awards={awards} />}
            {volunteer?.length > 0 && <Volunteer volunteer={volunteer} />}
            {publications?.length > 0 && <Publications publications={publications} />}
            {interests?.length > 0 && <Interests interests={interests} />}
            {references?.length > 0 && <References references={references} />}
        </TemplateShell>
    );
};

export default PragmaticEngineer;
