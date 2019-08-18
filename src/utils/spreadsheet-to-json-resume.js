export default function spreadsheetToJsonResume(jsonSpreadsheet) {
    // attribute names
    const categoryAttr = 'category'.toUpperCase();
    const contentAttr = 'content'.toUpperCase();
    const typeAttr = 'type'.toUpperCase();
    const disabledAttr = 'disabled'.toUpperCase();

    // categories
    const basicsCategory = 'basics';
    const basicsLocationCategory = 'basics_location';
    const basicsProfilesCategory = 'basics_profiles';
    const workCategory = 'work';
    const volunteerCategory = 'volunteer';
    const educationCategory = 'education';
    const awardsCategory = 'awards';
    const publicationsCategory = 'publications';
    const skillsCategory = 'skills';
    const languagesCategory = 'languages';
    const interestsCategory = 'interests';
    const referencesCategory = 'references';

    // base jsonResume
    const jsonResume = {
        basics: {
            location: {},
            profiles: [],
        },
        work: [],
        volunteer: [],
        education: [],
        awards: [],
        publications: [],
        skills: [],
        languages: [],
        interests: [],
        references: [],
    };

    let profiles = {};
    const profilesArray = [];
    let work = {};
    const workArray = [];
    let volunteer = {};
    const volunteerArray = [];
    let education = {};
    const educationArray = [];
    let awards = {};
    const awardsArray = [];
    let publications = {};
    const publicationsArray = [];
    let skills = {};
    const skillsArray = [];
    let languages = {};
    const languagesArray = [];
    let interests = {};
    const interestsArray = [];
    let references = {};
    const referencesArray = [];

    // console.log(jsonSpreadsheet);
    for (const value of jsonSpreadsheet) {
        if (value[disabledAttr]) {
            continue;
        }

        const category = value[categoryAttr].toLowerCase();
        if (category === basicsCategory) {
            jsonResume.basics[value[typeAttr]] = value[contentAttr];
        } else if (category === basicsLocationCategory) {
            jsonResume.basics.location[value[typeAttr]] = value[contentAttr];
        } else if (category === basicsProfilesCategory) {
            if (value[typeAttr] === 'network') {
                if (Object.keys(profiles).length > 0 && profiles.constructor === Object) {
                    profilesArray.push({ ...profiles });
                    profiles = {};
                }
            }

            profiles[value[typeAttr]] = value[contentAttr];
        } else if (category === workCategory) {
            if (value[typeAttr] === 'company') {
                if (Object.keys(work).length > 0 && work.constructor === Object) {
                    workArray.push({ ...work });
                    work = {};
                }
            }

            work[value[typeAttr]] = value[contentAttr];
        } else if (category === volunteerCategory) {
            if (value[typeAttr] === 'organization') {
                if (Object.keys(volunteer).length > 0 && volunteer.constructor === Object) {
                    volunteerArray.push({ ...volunteer });
                    volunteer = {};
                }
            }

            volunteer[value[typeAttr]] = value[contentAttr];
        } else if (category === educationCategory) {
            if (value[typeAttr] === 'institution') {
                if (Object.keys(education).length > 0 && education.constructor === Object) {
                    educationArray.push({ ...education });
                    education = {};
                }
            }

            education[value[typeAttr]] = value[contentAttr];
        } else if (category === awardsCategory) {
            if (value[typeAttr] === 'title') {
                if (Object.keys(awards).length > 0 && awards.constructor === Object) {
                    awardsArray.push({ ...awards });
                    awards = {};
                }
            }

            awards[value[typeAttr]] = value[contentAttr];
        } else if (category === publicationsCategory) {
            if (value[typeAttr] === 'name') {
                if (Object.keys(publications).length > 0 && publications.constructor === Object) {
                    publicationsArray.push({ ...publications });
                    publications = {};
                }
            }

            publications[value[typeAttr]] = value[contentAttr];
        } else if (category === skillsCategory) {
            if (value[typeAttr] === 'name') {
                if (Object.keys(skills).length > 0 && skills.constructor === Object) {
                    skillsArray.push({ ...skills });
                    skills = {};
                }
            }

            skills[value[typeAttr]] = value[contentAttr];
        } else if (category === languagesCategory) {
            if (value[typeAttr] === 'language') {
                if (Object.keys(languages).length > 0 && languages.constructor === Object) {
                    languagesArray.push({ ...languages });
                    languages = {};
                }
            }

            languages[value[typeAttr]] = value[contentAttr];
        } else if (category === interestsCategory) {
            if (value[typeAttr] === 'name') {
                if (Object.keys(interests).length > 0 && interests.constructor === Object) {
                    interestsArray.push({ ...interests });
                    interests = {};
                }
            }

            interests[value[typeAttr]] = value[contentAttr];
        } else if (category === referencesCategory) {
            if (value[typeAttr] === 'name') {
                if (Object.keys(references).length > 0 && references.constructor === Object) {
                    referencesArray.push({ ...references });
                    references = {};
                }
            }

            references[value[typeAttr]] = value[contentAttr];
        }
    }

    jsonResume.basics.profiles = [...profilesArray, profiles];
    jsonResume.work = [...workArray, work];
    jsonResume.volunteer = [...volunteerArray, volunteer];
    jsonResume.education = [...educationArray, education];
    jsonResume.awards = [...awardsArray, awards];
    jsonResume.publications = [...publicationsArray, publications];
    jsonResume.skills = [...skillsArray, skills];
    jsonResume.languages = [...languagesArray, languages];
    jsonResume.interests = [...interestsArray, interests];
    jsonResume.references = [...referencesArray, references];

    // console.log(jsonResume);
    return jsonResume;
}
