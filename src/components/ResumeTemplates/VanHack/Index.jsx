import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createIntl, createIntlCache, RawIntlProvider, useIntl } from 'gatsby-plugin-intl';

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

const VanHack = ({
    customTranslations = {},
    togglableJsonResume: {
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
        coverLetter,
        certificates,
    },
}) => {
    const intl = useIntl();
    const classes = useStyles();
    const templateIntl = useMemo(() => {
        let newIntl = templateIntls.find(
            (tempIntl) => tempIntl.locale === intl.locale
        );

        if (!newIntl) {
            newIntl = templateIntls.find(
                (tempIntl) => tempIntl.locale === intl.defaultLocale
            );
        }

        if (isObjectNotEmpty(customTranslations)) {
            return createIntl({
                locale: newIntl.locale,
                messages: {
                    ...newIntl.messages,
                    ...customTranslations,
                },
            }, createIntlCache());
        }

        return newIntl;
    }, [customTranslations, intl.defaultLocale, intl.locale]);

    return (
        <RawIntlProvider
            value={templateIntl}
        >
            <div className={classes.resumeDefaultTemplate}>
                {(coverLetter?.enabled && coverLetter?.value) && (
                    <CoverLetter
                        coverLetter={coverLetter?.value}
                    />
                )}
                {basics?.enabled && (
                    <Basics
                        basics={basics?.value || {}}
                    />
                )}
                {(skills?.enabled && skills?.value.length) && (
                    <Skills
                        skills={skills?.value || []}
                    />
                )}
                {(work?.enabled && work?.value.length) && (
                    <Work
                        work={work?.value || []}
                    />
                )}
                {(education?.enabled && education?.value.length) && (
                    <Education
                        education={education?.value || []}
                    />
                )}
                {(awards?.enabled && awards?.value.length) && (
                    <Awards
                        awards={awards?.value || []}
                    />
                )}
                {(certificates?.enabled && certificates?.value.length) && (
                    <Certificates
                        certificates={certificates?.value || []}
                    />
                )}
                {(volunteer?.enabled && volunteer?.value.length) && (
                    <Volunteer
                        volunteer={volunteer?.value || []}
                    />
                )}
                {(publications?.enabled && publications?.value.length) && (
                    <Publications
                        publications={publications?.value || []}
                    />
                )}
                {(projects?.enabled && projects?.value.length) && (
                    <Projects
                        projects={projects?.value || []}
                    />
                )}
                {(languages?.enabled && languages?.value.length) && (
                    <Languages
                        languages={languages?.value || []}
                    />
                )}
                {(interests?.enabled && interests?.value.length) && (
                    <Interests
                        interests={interests?.value || []}
                    />
                )}
                {(references?.enabled && references?.value.length) && (
                    <References
                        references={references?.value || []}
                    />
                )}
            </div>
        </RawIntlProvider>
    );
};

export default VanHack;
