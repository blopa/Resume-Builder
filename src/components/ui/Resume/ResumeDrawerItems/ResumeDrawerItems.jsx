import React from 'react';
import style from './resume-drawer-items.scss';
import uuid from 'uuid';

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
        {work && (
            <Work
                work={work.value}
            />
        )}
        {skills && (
            <Skills
                skills={skills.value}
            />
        )}
        {education && (
            <Education
                education={education.value}
            />
        )}
        {awards && (
            <Awards
                awards={awards.value}
            />
        )}
        {volunteer && (
            <Volunteer
                volunteer={volunteer.value}
            />
        )}
        {publications && (
            <Publications
                publications={publications.value}
            />
        )}
        {languages && (
            <Languages
                languages={languages.value}
            />
        )}
        {interests && (
            <Interests
                interests={interests.value}
            />
        )}
        {references && (
            <References
                references={references.value}
            />
        )}
    </div>
);

export default ResumeDrawerItems;
