import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'gatsby-plugin-intl';
import style from './resumeDrawerStyles';

// Utils

// Components
import Awards from './Items/Awards';
import Basics from './Items/Basics';
import Education from './Items/Education';
import Interests from './Items/Interests';
import Languages from './Items/Languages';
import Publications from './Items/Publications';
import References from './Items/References';
import Skills from './Items/Skills';
import Volunteer from './Items/Volunteer';
import Work from './Items/Work';
import { isObjectNotEmpty } from '../../utils/utils';
import { downloadJson } from '../../utils/json-parser';

const useStyles = makeStyles((theme) => ({
    ...style,
    actionButtons: {
        display: 'block',
        margin: '10px 10px 10px 0',
    },
}));

const ResumeDrawerItems = ({
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
    onClose,
    jsonResume,
    onPrint,
}) => {
    const classes = useStyles();
    const intl = useIntl();

    const printDocument = () => {
        window.print();
    };

    const handleDownloadJson = useCallback(() => {
        downloadJson(jsonResume);
    }, [jsonResume]);

    return (
        <div className={classes.resumeDrawerItemsWrapper}>
            <button
                type="button"
                onClick={onClose}
            >
                <CloseIcon />
            </button>
            <div>
                <Button
                    className={classes.actionButtons}
                    variant="contained"
                    color="primary"
                    disabled
                >
                    {intl.formatMessage({ id: 'download_doc' })}
                </Button>
                <Button
                    className={classes.actionButtons}
                    variant="contained"
                    color="primary"
                    onClick={handleDownloadJson}
                >
                    {intl.formatMessage({ id: 'download_json' })}
                </Button>
                <Button
                    className={classes.actionButtons}
                    variant="contained"
                    color="secondary"
                    onClick={onPrint || printDocument}
                >
                    {intl.formatMessage({ id: 'print' })}
                </Button>
            </div>
            {isObjectNotEmpty(basics) && (
                <Basics
                    basics={basics}
                />
            )}
            {isObjectNotEmpty(work) && (
                <Work
                    work={work}
                />
            )}
            {isObjectNotEmpty(skills) && (
                <Skills
                    skills={skills}
                />
            )}
            {isObjectNotEmpty(education) && (
                <Education
                    education={education}
                />
            )}
            {isObjectNotEmpty(awards) && (
                <Awards
                    awards={awards}
                />
            )}
            {isObjectNotEmpty(volunteer) && (
                <Volunteer
                    volunteer={volunteer}
                />
            )}
            {isObjectNotEmpty(publications) && (
                <Publications
                    publications={publications}
                />
            )}
            {isObjectNotEmpty(languages) && (
                <Languages
                    languages={languages}
                />
            )}
            {isObjectNotEmpty(interests) && (
                <Interests
                    interests={interests}
                />
            )}
            {isObjectNotEmpty(references) && (
                <References
                    references={references}
                />
            )}
        </div>
    );
};

export default ResumeDrawerItems;
