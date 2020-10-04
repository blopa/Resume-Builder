import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
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
}));

const printDocument = () => {
    window.print();
};

const handleDownloadJson = (jsonResume) => {
    downloadJson(jsonResume);
};

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
}) => {
    const classes = useStyles();
    return (
        <div className={classes.resumeDrawerItemsWrapper}>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    disabled
                >
                    Download .doc
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDownloadJson(jsonResume)}
                >
                    Download .json
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={printDocument}
                >
                    Print
                </Button>
                <button
                    type="button"
                    onClick={onClose}
                >
                    <CloseIcon />
                </button>
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
