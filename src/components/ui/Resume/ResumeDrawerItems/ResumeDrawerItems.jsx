import React from 'react';
import style from './resume-drawer-items.scss';

// Utils
import { isObjectNotEmpty } from '../../../../utils/utils';

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
}) => (
    <div className={style['resume-drawer-items']}>
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
