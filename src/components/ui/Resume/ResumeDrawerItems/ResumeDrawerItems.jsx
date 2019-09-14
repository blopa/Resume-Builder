import React from 'react';
import style from './resume-drawer-items.scss';
import ReactGA from 'react-ga';

// Utils
import { isObjectNotEmpty } from '../../../../utils/utils';
import { downloadJson } from '../../../../utils/json-parser';

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
import MuiButton from '../../MuiButton/MuiButton';
import CloseIcon from '../../Icons/CloseIcon';

const printDocument = () => {
    ReactGA.event({
        category: 'Print',
        action: 'Print Button Click',
    });

    window.print();
};

const handleDownloadJson = (jsonResume) => {
    ReactGA.event({
        category: 'Download',
        action: 'Download JSON Button Click',
    });

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
}) => (
    <div className={style['resume-drawer-items']}>
        <div>
            <MuiButton
                variant="contained"
                color="primary"
                disabled
            >
                Download .doc
            </MuiButton>
            <MuiButton
                variant="contained"
                color="primary"
                onClick={() => handleDownloadJson(jsonResume)}
            >
                Download .json
            </MuiButton>
            <MuiButton
                variant="contained"
                color="secondary"
                onClick={printDocument}
            >
                Print
            </MuiButton>
            <CloseIcon
                onClick={onClose}
            />
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

export default ResumeDrawerItems;
