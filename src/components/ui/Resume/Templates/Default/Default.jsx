import React from 'react';
import style from './default-template.scss';

// Components
import Basics from '../../DefaultSections/Basics';
import Awards from '../../DefaultSections/Awards';
import Education from '../../DefaultSections/Education';
import Interests from '../../DefaultSections/Interests';
import Languages from '../../DefaultSections/Languages';
import Publications from '../../DefaultSections/Publications';
import References from '../../DefaultSections/References';
import Skills from '../../DefaultSections/Skills';
import Volunteer from '../../DefaultSections/Volunteer';
import Work from '../../DefaultSections/Work';

const Default = ({
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
    <div className={style['resume-default-template']}>
        {basics && basics.enabled && (
            <Basics
                basics={basics.value}
            />
        )}
        {work && work.enabled && (
            <Work
                work={work.value}
            />
        )}
        {skills && skills.enabled && (
            <Skills
                skills={skills.value}
            />
        )}
        {education && education.enabled && (
            <Education
                education={education.value}
            />
        )}
        {awards && awards.enabled && (
            <Awards
                awards={awards.value}
            />
        )}
        {volunteer && volunteer.enabled && (
            <Volunteer
                volunteer={volunteer.value}
            />
        )}
        {publications && publications.enabled && (
            <Publications
                publications={publications.value}
            />
        )}
        {languages && languages.enabled && (
            <Languages
                languages={languages.value}
            />
        )}
        {interests && interests.enabled && (
            <Interests
                interests={interests.value}
            />
        )}
        {references && references.enabled && (
            <References
                references={references.value}
            />
        )}
    </div>
);

export default Default;
