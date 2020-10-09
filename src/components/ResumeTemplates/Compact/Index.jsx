import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RawIntlProvider, useIntl } from 'gatsby-plugin-intl';

// Components
import Basics from './Sections/Basics';
import templateIntls from './intl';

const useStyles = makeStyles((theme) => ({
    resumeDefaultTemplate: {
        // TODO
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
                        basics={basics.value}
                    />
                )}
            </div>
        </RawIntlProvider>
    );
};

export default Compact;
