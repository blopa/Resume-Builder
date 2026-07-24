import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createIntl, createIntlCache, RawIntlProvider, useIntl } from 'gatsby-plugin-react-intl';

// local template translations
import templateIntls from './intl';

// Components
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
import CoverLetter from './Sections/CoverLetter';
import Certificates from './Sections/Certificates';
import Download from './Sections/Download';

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
    llmPromptText: {
        userSelect: 'none',
        opacity: 0.1,
        float: 'left',
        color: theme.palette.type === 'dark' ? '#424242' : '#ffffff',
    },
}));

const VanHack = ({
    customTranslations = {},
    isPrinting = false,
    isOnlineViewer = false,
    coverLetterVariables = [],
    jsonResume,
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
        // custom attributes
        coverLetter,
        llmPrompt,
        enableSourceDataDownload = false,
    },
}) => {
    const intl = useIntl();
    const classes = useStyles();
    const templateIntl = useMemo(() => {
        let newIntl = templateIntls.find((tempIntl) => tempIntl.locale === intl.locale);

        if (!newIntl) {
            newIntl = templateIntls.find((tempIntl) => tempIntl.locale === intl.defaultLocale);
        }

        if (isObjectNotEmpty(customTranslations)) {
            return createIntl(
                {
                    locale: newIntl.locale,
                    messages: {
                        ...newIntl.messages,
                        ...customTranslations,
                    },
                },
                createIntlCache()
            );
        }

        return newIntl;
    }, [customTranslations, intl.defaultLocale, intl.locale]);

    const showCoverLetterPageBreak = useMemo(
        () =>
            isObjectNotEmpty(basics) &&
            work?.length > 0 &&
            skills?.length > 0 &&
            education?.length > 0 &&
            awards?.length > 0 &&
            volunteer?.length > 0 &&
            publications?.length > 0 &&
            languages?.length > 0 &&
            interests?.length > 0 &&
            references?.length > 0 &&
            projects?.length > 0 &&
            certificates?.length > 0,
        [
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
        ]
    );

    return (
        <RawIntlProvider value={templateIntl}>
            <div className={classes.resumeVanHackTemplate}>
                {coverLetter && (
                    <CoverLetter
                        showPageBreak={showCoverLetterPageBreak}
                        coverLetterText={coverLetter}
                        coverLetterVariables={coverLetterVariables}
                    />
                )}
                {enableSourceDataDownload && <Download jsonResume={jsonResume} />}
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
                {llmPrompt && <p className={classes.llmPromptText}>{llmPrompt}</p>}
            </div>
        </RawIntlProvider>
    );
};

export default VanHack;
