import { generateCoverLetterObject, isObjectNotEmpty } from './utils';
import toggleableResume from '../store/toggleable-resume.json';

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
    const projectsCategory = 'projects';
    const certificatesCategory = 'certificates';
    const skillsCategory = 'skills';
    const languagesCategory = 'languages';
    const interestsCategory = 'interests';
    const referencesCategory = 'references';
    const translationsCategory = '__translation__';
    const coverLetterCategory = 'cover_letter';
    const enableSourceDataDownloadCategory = 'enable_download';

    // base toggleable jsonResume
    const jsonResume = { ...toggleableResume };

    let profile = {
        enabled: false,
        value: {},
    };
    const profilesArray = [];
    let work = {
        enabled: false,
        value: {},
    };
    const worksArray = [];
    let volunteer = {
        enabled: false,
        value: {},
    };
    const volunteersArray = [];
    let education = {
        enabled: false,
        value: {},
    };
    const educationsArray = [];
    let award = {
        enabled: false,
        value: {},
    };
    const awardsArray = [];
    let publication = {
        enabled: false,
        value: {},
    };
    const publicationsArray = [];
    let project = {
        enabled: false,
        value: {},
    };
    const projectsArray = [];
    let certificate = {
        enabled: false,
        value: {},
    };
    const certificatesArray = [];
    let skill = {
        enabled: false,
        value: {},
    };
    const skillsArray = [];
    let language = {
        enabled: false,
        value: {},
    };
    const languagesArray = [];
    let interest = {
        enabled: false,
        value: {},
    };
    const interestsArray = [];
    let reference = {
        enabled: false,
        value: {},
    };
    const referencesArray = [];
    const translations = {};
    let coverLetter = '';
    let enableSourceDataDownload = false;

    jsonSpreadsheet.forEach((value) => {
        const enabled = !(value[disabledAttr].toLowerCase() === 'true');

        const category = value[categoryAttr].toLowerCase();
        if (category === enableSourceDataDownloadCategory) {
            enableSourceDataDownload = value[contentAttr].toLowerCase() === 'true';
        } else if (category === coverLetterCategory) {
            coverLetter = generateCoverLetterObject(value[contentAttr] || '');
        } else if (category === translationsCategory) {
            translations[value[typeAttr]] = value[contentAttr];
        } else if (category === basicsCategory) {
            jsonResume.basics[value[typeAttr]] = {
                enabled,
                value: value[contentAttr],
            };
        } else if (category === basicsLocationCategory) {
            jsonResume.basics.location[value[typeAttr]] = {
                enabled,
                value: value[contentAttr],
            };
        } else if (category === basicsProfilesCategory) {
            if (value[typeAttr] === 'network') {
                if (isObjectNotEmpty(profile)) {
                    profilesArray.push({ ...profile });
                    profile = {};
                }
            }

            profile[value[typeAttr]] = {
                enabled,
                value: value[contentAttr],
            };
        } else if (category === workCategory) {
            if (value[typeAttr] === 'name') {
                if (isObjectNotEmpty(work)) {
                    worksArray.push({ ...work });
                    work = {};
                }
            }

            if (value[typeAttr] === 'highlights' || value[typeAttr] === 'keywords') {
                work[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr].split(';').map((item) => item.trim()),
                };
            } else {
                work[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr],
                };
            }
        } else if (category === volunteerCategory) {
            if (value[typeAttr] === 'organization') {
                if (isObjectNotEmpty(volunteer)) {
                    volunteersArray.push({ ...volunteer });
                    volunteer = {};
                }
            }

            if (value[typeAttr] === 'highlights') {
                volunteer[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr].split(';').map((item) => item.trim()),
                };
            } else {
                volunteer[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr],
                };
            }
        } else if (category === educationCategory) {
            if (value[typeAttr] === 'institution') {
                if (isObjectNotEmpty(education)) {
                    educationsArray.push({ ...education });
                    education = {};
                }
            }

            if (value[typeAttr] === 'courses') {
                education[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr].split(';').map((item) => item.trim()),
                };
            } else {
                education[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr],
                };
            }
        } else if (category === awardsCategory) {
            if (value[typeAttr] === 'title') {
                if (isObjectNotEmpty(award)) {
                    awardsArray.push({ ...award });
                    award = {};
                }
            }

            award[value[typeAttr]] = {
                enabled,
                value: value[contentAttr],
            };
        } else if (category === certificatesCategory) {
            if (value[typeAttr] === 'name') {
                if (isObjectNotEmpty(certificate)) {
                    certificatesArray.push({ ...certificate });
                    certificate = {};
                }
            }

            certificate[value[typeAttr]] = {
                enabled,
                value: value[contentAttr],
            };
        } else if (category === publicationsCategory) {
            if (value[typeAttr] === 'name') {
                if (isObjectNotEmpty(publication)) {
                    publicationsArray.push({ ...publication });
                    publication = {};
                }
            }

            publication[value[typeAttr]] = {
                enabled,
                value: value[contentAttr],
            };
        } else if (category === projectsCategory) {
            if (value[typeAttr] === 'name') {
                if (isObjectNotEmpty(project)) {
                    projectsArray.push({ ...project });
                    project = {};
                }
            }

            if (
                value[typeAttr] === 'highlights'
                || value[typeAttr] === 'keywords'
                || value[typeAttr] === 'roles'
            ) {
                project[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr].split(';').map((item) => item.trim()),
                };
            } else {
                project[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr],
                };
            }
        } else if (category === skillsCategory) {
            if (value[typeAttr] === 'name') {
                if (isObjectNotEmpty(skill)) {
                    skillsArray.push({ ...skill });
                    skill = {};
                }
            }

            if (value[typeAttr] === 'keywords') {
                skill[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr].split(';').map((item) => item.trim()),
                };
            } else {
                skill[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr],
                };
            }
        } else if (category === languagesCategory) {
            if (value[typeAttr] === 'language') {
                if (isObjectNotEmpty(language)) {
                    languagesArray.push({ ...language });
                    language = {};
                }
            }

            language[value[typeAttr]] = {
                enabled,
                value: value[contentAttr],
            };
        } else if (category === interestsCategory) {
            if (value[typeAttr] === 'name') {
                if (isObjectNotEmpty(interest)) {
                    interestsArray.push({ ...interest });
                    interest = {};
                }
            }

            if (value[typeAttr] === 'keywords') {
                interest[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr].split(';').map((item) => item.trim()),
                };
            } else {
                interest[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr],
                };
            }
        } else if (category === referencesCategory) {
            if (value[typeAttr] === 'name') {
                if (isObjectNotEmpty(reference)) {
                    referencesArray.push({ ...reference });
                    reference = {};
                }
            }

            reference[value[typeAttr]] = {
                enabled,
                value: value[contentAttr],
            };
        }
    });

    if (isObjectNotEmpty(profile)) {
        profilesArray.push(profile);
    }
    jsonResume.basics.profiles = {
        enabled: profilesArray.length > 0,
        value: profilesArray,
    };

    if (isObjectNotEmpty(work)) {
        worksArray.push(work);
    }
    jsonResume.work = {
        enabled: worksArray.length > 0,
        value: worksArray,
    };

    if (isObjectNotEmpty(volunteer)) {
        volunteersArray.push(volunteer);
    }
    jsonResume.volunteer = {
        enabled: volunteersArray.length > 0,
        value: volunteersArray,
    };

    if (isObjectNotEmpty(education)) {
        educationsArray.push(education);
    }
    jsonResume.education = {
        enabled: educationsArray.length > 0,
        value: educationsArray,
    };

    if (isObjectNotEmpty(award)) {
        awardsArray.push(award);
    }
    jsonResume.awards = {
        enabled: awardsArray.length > 0,
        value: awardsArray,
    };

    if (isObjectNotEmpty(publication)) {
        publicationsArray.push(publication);
    }
    jsonResume.publications = {
        enabled: publicationsArray.length > 0,
        value: publicationsArray,
    };

    if (isObjectNotEmpty(project)) {
        projectsArray.push(project);
    }
    jsonResume.projects = {
        enabled: projectsArray.length > 0,
        value: projectsArray,
    };

    if (isObjectNotEmpty(certificate)) {
        certificatesArray.push(certificate);
    }
    jsonResume.certificates = {
        enabled: certificatesArray.length > 0,
        value: certificatesArray,
    };

    if (isObjectNotEmpty(skill)) {
        skillsArray.push(skill);
    }
    jsonResume.skills = {
        enabled: skillsArray.length > 0,
        value: skillsArray,
    };

    if (isObjectNotEmpty(language)) {
        languagesArray.push(language);
    }
    jsonResume.languages = {
        enabled: languagesArray.length > 0,
        value: languagesArray,
    };

    if (isObjectNotEmpty(interest)) {
        interestsArray.push(interest);
    }
    jsonResume.interests = {
        enabled: interestsArray.length > 0,
        value: interestsArray,
    };

    if (isObjectNotEmpty(reference)) {
        referencesArray.push(reference);
    }
    jsonResume.references = {
        enabled: referencesArray.length > 0,
        value: referencesArray,
    };

    return {
        ...jsonResume,
        __translation__: translations,
        coverLetter,
        enableSourceDataDownload,
    };
}
