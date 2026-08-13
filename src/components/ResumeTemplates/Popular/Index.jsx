/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';

import templateIntls from './intl';
import TemplateShell from '../../ResumeTemplateShell';
import Basics from './Sections/Basics';
import Work from './Sections/Work';
import Education from './Sections/Education';
import Skills from './Sections/Skills';
import Additional from './Sections/Additional';
import { isObjectNotEmpty } from '../../../utils/utils';
import { inkColor, linkColor } from './styles';

const useStyles = makeStyles((theme) => ({
    resumePopularTemplate: {
        padding: '8px 40px 28px',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '0.78rem',
        lineHeight: 1.2,
        color: inkColor(theme),
        '& h2, & h3, & p': { margin: 0 },
        '& a': { color: linkColor(theme), textDecoration: 'underline' },
        '& ul': { marginBlockStart: 0, marginBlockEnd: 0 },
        '@media print': { padding: 0 },
    },
}));

const Popular = ({ customTranslations = {}, coverLetterVariables = {}, jsonResume, downloadableResume }) => {
    const classes = useStyles();
    const { basics, work = [], skills = [], education = [], languages = [], interests = [] } = jsonResume;
    const additionalSections = [
        ['certificates', jsonResume.certificates],
        ['projects', jsonResume.projects],
        ['awards', jsonResume.awards],
        ['volunteers', jsonResume.volunteer],
        ['publications', jsonResume.publications],
        ['references', jsonResume.references],
    ];

    return (
        <TemplateShell
            className={classes.resumePopularTemplate}
            templateIntls={templateIntls}
            customTranslations={customTranslations}
            jsonResume={jsonResume}
            downloadableResume={downloadableResume}
            coverLetterVariables={coverLetterVariables}
        >
            {isObjectNotEmpty(basics) && <Basics basics={basics} />}
            {work.length > 0 && <Work work={work} />}
            {education.length > 0 && <Education education={education} />}
            {(skills.length > 0 || languages.length > 0 || interests.length > 0) && (
                <Skills skills={skills} languages={languages} interests={interests} />
            )}
            {additionalSections.map(
                ([type, items]) => items?.length > 0 && <Additional key={type} type={type} items={items} />
            )}
        </TemplateShell>
    );
};

export default Popular;
