/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';

import templateIntls from './intl';
import TemplateShell from '../../ResumeTemplateShell';
import Basics from './Sections/Basics';
import Summary from './Sections/Summary';
import Work from './Sections/Work';
import Education from './Sections/Education';
import Skills from './Sections/Skills';
import Projects from './Sections/Projects';
import Additional from './Sections/Additional';
import { isObjectNotEmpty } from '../../../utils/utils';
import { inkColor } from './styles';

const useStyles = makeStyles((theme) => ({
    resumeProgrammerTemplate: {
        padding: '34px 30px 38px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '0.82rem',
        lineHeight: 1.25,
        color: inkColor(theme),
        '& h2, & h3, & p': {
            margin: 0,
        },
        '& a': {
            color: 'inherit',
            textDecoration: 'underline',
        },
        '& strong': {
            fontWeight: 700,
        },
        '@media print': {
            padding: 0,
        },
    },
    columns: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.72fr) minmax(0, 0.98fr)',
        alignItems: 'start',
        columnGap: '28px',
    },
    column: {
        minWidth: 0,
    },
}));

const Programmer = ({ customTranslations = {}, coverLetterVariables = {}, jsonResume, downloadableResume }) => {
    const classes = useStyles();
    const {
        basics,
        work = [],
        skills = [],
        education = [],
        projects = [],
        volunteer = [],
        publications = [],
        awards = [],
        certificates = [],
        languages = [],
        interests = [],
        references = [],
    } = jsonResume;

    return (
        <TemplateShell
            className={classes.resumeProgrammerTemplate}
            templateIntls={templateIntls}
            customTranslations={customTranslations}
            jsonResume={jsonResume}
            downloadableResume={downloadableResume}
            coverLetterVariables={coverLetterVariables}
        >
            {isObjectNotEmpty(basics) && <Basics basics={basics} />}
            <div className={classes.columns}>
                <main className={classes.column}>
                    {work.length > 0 && <Work work={work} />}
                    {projects.length > 0 && <Projects projects={projects} />}
                    {volunteer.length > 0 && <Additional type="volunteers" items={volunteer} />}
                    {publications.length > 0 && <Additional type="publications" items={publications} />}
                </main>
                <aside className={classes.column}>
                    {basics?.summary && <Summary summary={basics.summary} />}
                    {education.length > 0 && <Education education={education} />}
                    {skills.length > 0 && <Skills skills={skills} />}
                    {certificates.length > 0 && <Additional type="certificates" items={certificates} />}
                    {awards.length > 0 && <Additional type="awards" items={awards} />}
                    {languages.length > 0 && <Additional type="languages" items={languages} />}
                    {interests.length > 0 && <Additional type="interests" items={interests} />}
                    {references.length > 0 && <Additional type="references" items={references} />}
                </aside>
            </div>
        </TemplateShell>
    );
};

export default Programmer;
