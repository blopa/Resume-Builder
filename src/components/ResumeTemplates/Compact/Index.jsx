import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RawIntlProvider, useIntl } from 'gatsby-plugin-intl';

import templateIntls from './intl';

// Components
import Basics from './Sections/Basics';
import Publications from './Sections/Publications';
import Education from './Sections/Education';
import Awards from './Sections/Awards';
import Skills from './Sections/Skills';

const useStyles = makeStyles((theme) => ({
    resumeDefaultTemplate: {
        // TODO
    },
    educationAndAwardsWrapper: {
        display: 'flex',
    },
    educationWrapper: {
        width: '50%',
        paddingRight: '20px',
    },
    awardsWrapper: {
        width: '50%',
    },
}));

const Compact = ({
    resume: {
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
    },
}) => {
    const intl = useIntl();
    const classes = useStyles();
    const templateIntl = useMemo(() => {
        const newIntl = templateIntls.find(
            (tempIntl) => tempIntl.locale === intl.locale
        );

        if (!newIntl) {
            return templateIntls.find(
                (tempIntl) => tempIntl.locale === intl.defaultLocale
            );
        }

        return newIntl;
    }, [intl.locale]);

    return (
        <RawIntlProvider
            value={templateIntl}
        >
            <div className={classes.resumeDefaultTemplate}>
                {basics?.enabled && (
                    <Basics
                        basics={basics?.value}
                    />
                )}
                {publications?.enabled && (
                    <Publications
                        publications={publications?.value}
                    />
                )}
                <div className={classes.educationAndAwardsWrapper}>
                    {education?.enabled && (
                        <Education
                            className={classes.educationWrapper}
                            education={education?.value}
                        />
                    )}
                    {awards?.enabled && skills?.enabled && (
                        <div>
                            {awards?.enabled && (
                                <Awards
                                    className={classes.awardsWrapper}
                                    awards={awards?.value}
                                />
                            )}
                            {skills?.enabled && (
                                <Skills
                                    skills={skills?.value}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </RawIntlProvider>
    );
};

export default Compact;
