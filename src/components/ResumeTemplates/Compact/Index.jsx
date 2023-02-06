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
    resumeDefaultTemplate: {
        padding: '40px',
        '& h3': { margin: '0' },
        color: theme.palette.text.primary,
        '& a': {
            color: '#8da4f7',
        },
        '& a:visited': {
            color: '#48578a',
        },
        '& p': {
            margin: 0,
            marginBlockStart: 0,
            marginBlockEnd: 0,
        },
        '@media print': {
            padding: 0,
        },
    },
}));

const Compact = ({
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

    return (
        <RawIntlProvider value={templateIntl}>
            <div className={classes.resumeDefaultTemplate}>
                {coverLetter && (
                    <CoverLetter coverLetterText={coverLetter} coverLetterVariables={coverLetterVariables} />
                )}
                {enableSourceDataDownload && <Download jsonResume={jsonResume} />}
                {isObjectNotEmpty(basics) && <Basics basics={basics} />}
                {skills?.length > 0 && <Skills skills={skills} />}
                {work?.length > 0 && <Work work={work} />}
                {education?.length > 0 && <Education education={education} />}
                {awards?.length > 0 && <Awards awards={awards} />}
                {certificates?.length > 0 && <Certificates certificates={certificates} />}
                {volunteer?.length > 0 && <Volunteer volunteer={volunteer} />}
                {publications?.length > 0 && <Publications publications={publications} />}
                {projects?.length > 0 && <Projects projects={projects} />}
                {languages?.length > 0 && <Languages languages={languages} />}
                {interests?.length > 0 && <Interests interests={interests} />}
                {references?.length > 0 && <References references={references} />}
            </div>
        </RawIntlProvider>
    );
};

export default Compact;
