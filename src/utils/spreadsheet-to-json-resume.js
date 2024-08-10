import { generateCoverLetterObject, generateLlmPromptObject, isObjectNotEmpty } from './utils';
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
    const llmPromptCategory = 'llm_prompt';
    const enableSourceDataDownloadCategory = 'enable_download';

    // base toggleable jsonResume
    const jsonResume = { ...toggleableResume };

    let profile = {};
    const profilesArray = [];
    let work = {};
    const worksArray = [];
    let volunteer = {};
    const volunteersArray = [];
    let education = {};
    const educationsArray = [];
    let award = {};
    const awardsArray = [];
    let publication = {};
    const publicationsArray = [];
    let project = {};
    const projectsArray = [];
    let certificate = {};
    const certificatesArray = [];
    let skill = {};
    const skillsArray = [];
    let language = {};
    const languagesArray = [];
    let interest = {};
    const interestsArray = [];
    let reference = {};
    const referencesArray = [];
    const translations = {};
    let coverLetter = '';
    let llmPrompt = '';
    let enableSourceDataDownload = false;

    jsonSpreadsheet.forEach((value) => {
        const enabled = !((value[disabledAttr] || '').toLowerCase() === 'true');

        const category = value[categoryAttr].toLowerCase();
        if (category === enableSourceDataDownloadCategory) {
            enableSourceDataDownload = value[contentAttr].toLowerCase() === 'true';
        } else if (category === coverLetterCategory) {
            coverLetter = generateCoverLetterObject(value[contentAttr] || '');
        } else if (category === llmPromptCategory) {
            llmPrompt = generateLlmPromptObject(value[contentAttr] || '');
        } else if (category === translationsCategory) {
            translations[value[typeAttr]] = value[contentAttr];
        } else if (category === basicsCategory) {
            jsonResume.basics.value[value[typeAttr]] = {
                enabled,
                value: value[contentAttr],
            };
        } else if (category === basicsLocationCategory) {
            jsonResume.basics.value = {
                ...jsonResume.basics.value,
                location: {
                    enabled: isObjectNotEmpty(jsonResume.basics.value.location.value),
                    value: {
                        ...jsonResume.basics.value.location.value,
                        [value[typeAttr]]: {
                            enabled,
                            value: value[contentAttr],
                        },
                    },
                },
            };
        } else if (category === basicsProfilesCategory) {
            if (value[typeAttr] === 'network') {
                if (isObjectNotEmpty(profile)) {
                    profilesArray.push({
                        enabled: Object.entries(profile).some((entry) => entry[1].enabled),
                        value: { ...profile },
                    });
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
                    worksArray.push({
                        enabled: Object.entries(work).some((entry) => entry[1].enabled),
                        value: { ...work },
                    });
                    work = {};
                }
            }

            if (value[typeAttr] === 'highlights' || value[typeAttr] === 'keywords') {
                work[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr].split(';').map((item) => ({
                        enabled,
                        value: item.trim(),
                    })),
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
                    volunteersArray.push({
                        enabled: Object.entries(volunteer).some((entry) => entry[1].enabled),
                        value: { ...volunteer },
                    });
                    volunteer = {};
                }
            }

            if (value[typeAttr] === 'highlights') {
                volunteer[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr].split(';').map((item) => ({
                        enabled,
                        value: item.trim(),
                    })),
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
                    educationsArray.push({
                        enabled: Object.entries(education).some((entry) => entry[1].enabled),
                        value: { ...education },
                    });
                    education = {};
                }
            }

            if (value[typeAttr] === 'courses') {
                education[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr].split(';').map((item) => ({
                        enabled,
                        value: item.trim(),
                    })),
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
                    awardsArray.push({
                        enabled: Object.entries(award).some((entry) => entry[1].enabled),
                        value: { ...award },
                    });
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
                    certificatesArray.push({
                        enabled: Object.entries(certificate).some((entry) => entry[1].enabled),
                        value: { ...certificate },
                    });
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
                    publicationsArray.push({
                        enabled: Object.entries(publication).some((entry) => entry[1].enabled),
                        value: { ...publication },
                    });
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
                    projectsArray.push({
                        enabled: Object.entries(project).some((entry) => entry[1].enabled),
                        value: { ...project },
                    });
                    project = {};
                }
            }

            if (value[typeAttr] === 'highlights' || value[typeAttr] === 'keywords' || value[typeAttr] === 'roles') {
                project[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr].split(';').map((item) => ({
                        enabled,
                        value: item.trim(),
                    })),
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
                    skillsArray.push({
                        enabled: Object.entries(skill).some((entry) => entry[1].enabled),
                        value: { ...skill },
                    });
                    skill = {};
                }
            }

            if (value[typeAttr] === 'keywords') {
                skill[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr].split(';').map((item) => ({
                        enabled,
                        value: item.trim(),
                    })),
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
                    languagesArray.push({
                        enabled: Object.entries(language).some((entry) => entry[1].enabled),
                        value: { ...language },
                    });
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
                    interestsArray.push({
                        enabled: Object.entries(interest).some((entry) => entry[1].enabled),
                        value: { ...interest },
                    });
                    interest = {};
                }
            }

            if (value[typeAttr] === 'keywords') {
                interest[value[typeAttr]] = {
                    enabled,
                    value: value[contentAttr].split(';').map((item) => ({
                        enabled,
                        value: item.trim(),
                    })),
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
                    referencesArray.push({
                        enabled: Object.entries(reference).some((entry) => entry[1].enabled),
                        value: { ...reference },
                    });
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
        profilesArray.push({
            enabled: Object.entries(profile).some((entry) => entry[1].enabled),
            value: profile,
        });
    }

    const profileEnabled = profilesArray.some((value) => value.enabled);
    jsonResume.basics = {
        enabled: profileEnabled || Object.entries(jsonResume.basics.value).some((entry) => entry[1].enabled),
        value: {
            ...jsonResume.basics.value,
            profiles: {
                enabled: profileEnabled,
                value: profilesArray,
            },
        },
    };

    if (isObjectNotEmpty(work)) {
        worksArray.push({
            enabled: Object.entries(work).some((entry) => entry[1].enabled),
            value: work,
        });
    }
    jsonResume.work = {
        enabled: worksArray.some((value) => value.enabled),
        value: worksArray,
    };

    if (isObjectNotEmpty(volunteer)) {
        volunteersArray.push({
            enabled: Object.entries(volunteer).some((entry) => entry[1].enabled),
            value: volunteer,
        });
    }
    jsonResume.volunteer = {
        enabled: volunteersArray.some((value) => value.enabled),
        value: volunteersArray,
    };

    if (isObjectNotEmpty(education)) {
        educationsArray.push({
            enabled: Object.entries(education).some((entry) => entry[1].enabled),
            value: education,
        });
    }
    jsonResume.education = {
        enabled: educationsArray.some((value) => value.enabled),
        value: educationsArray,
    };

    if (isObjectNotEmpty(award)) {
        awardsArray.push({
            enabled: Object.entries(award).some((entry) => entry[1].enabled),
            value: award,
        });
    }
    jsonResume.awards = {
        enabled: awardsArray.some((value) => value.enabled),
        value: awardsArray,
    };

    if (isObjectNotEmpty(publication)) {
        publicationsArray.push({
            enabled: Object.entries(publication).some((entry) => entry[1].enabled),
            value: publication,
        });
    }
    jsonResume.publications = {
        enabled: publicationsArray.some((value) => value.enabled),
        value: publicationsArray,
    };

    if (isObjectNotEmpty(project)) {
        projectsArray.push({
            enabled: Object.entries(project).some((entry) => entry[1].enabled),
            value: project,
        });
    }
    jsonResume.projects = {
        enabled: projectsArray.some((value) => value.enabled),
        value: projectsArray,
    };

    if (isObjectNotEmpty(certificate)) {
        certificatesArray.push({
            enabled: Object.entries(certificate).some((entry) => entry[1].enabled),
            value: certificate,
        });
    }
    jsonResume.certificates = {
        enabled: certificatesArray.some((value) => value.enabled),
        value: certificatesArray,
    };

    if (isObjectNotEmpty(skill)) {
        skillsArray.push({
            enabled: Object.entries(skill).some((entry) => entry[1].enabled),
            value: skill,
        });
    }
    jsonResume.skills = {
        enabled: skillsArray.some((value) => value.enabled),
        value: skillsArray,
    };

    if (isObjectNotEmpty(language)) {
        languagesArray.push({
            enabled: Object.entries(language).some((entry) => entry[1].enabled),
            value: language,
        });
    }
    jsonResume.languages = {
        enabled: languagesArray.some((value) => value.enabled),
        value: languagesArray,
    };

    if (isObjectNotEmpty(interest)) {
        interestsArray.push({
            enabled: Object.entries(interest).some((entry) => entry[1].enabled),
            value: interest,
        });
    }
    jsonResume.interests = {
        enabled: interestsArray.some((value) => value.enabled),
        value: interestsArray,
    };

    if (isObjectNotEmpty(reference)) {
        referencesArray.push({
            enabled: Object.entries(reference).some((entry) => entry[1].enabled),
            value: reference,
        });
    }
    jsonResume.references = {
        enabled: referencesArray.some((value) => value.enabled),
        value: referencesArray,
    };

    return {
        ...jsonResume,
        __translation__: translations,
        coverLetter,
        llmPrompt,
        enableSourceDataDownload,
    };
}
