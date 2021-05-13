export default (state, action) => {
    switch (action.type) {
        case 'SET_TOGGLEABLE_JSON_RESUME':
            return {
                ...state,
                toggleableJsonResume: {
                    ...action.resume,
                },
            };
        case 'SET_ENABLE_SOURCE_DATA_DOWNLOAD':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    enableSourceDataDownload: action.enableSourceDataDownload,
                },
            };
        case 'SET_RESUME_COVER_LETTER':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    coverLetter: {
                        ...action.coverLetter,
                    },
                },
            };
        case 'SET_RESUME_BASICS':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    basics: {
                        ...action.basics,
                    },
                },
            };
        case 'SET_RESUME_WORK':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    work: {
                        ...action.work,
                    },
                },
            };
        case 'SET_RESUME_SKILLS':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    skills: {
                        ...action.skills,
                    },
                },
            };
        case 'SET_RESUME_EDUCATION':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    education: {
                        ...action.education,
                    },
                },
            };
        case 'SET_RESUME_AWARDS':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    awards: {
                        ...action.awards,
                    },
                },
            };
        case 'SET_RESUME_CERTIFICATES':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    certificates: {
                        ...action.certificates,
                    },
                },
            };
        case 'SET_RESUME_VOLUNTEER':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    volunteer: {
                        ...action.volunteer,
                    },
                },
            };
        case 'SET_RESUME_PUBLICATIONS':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    publications: {
                        ...action.publications,
                    },
                },
            };
        case 'SET_RESUME_PROJECTS':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    projects: {
                        ...action.projects,
                    },
                },
            };
        case 'SET_RESUME_LANGUAGES':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    languages: {
                        ...action.languages,
                    },
                },
            };
        case 'SET_RESUME_INTERESTS':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    interests: {
                        ...action.interests,
                    },
                },
            };
        case 'SET_RESUME_REFERENCES':
            return {
                ...state,
                toggleableJsonResume: {
                    ...state.toggleableJsonResume,
                    references: {
                        ...action.references,
                    },
                },
            };
        case 'SET_RESUME_TEMPLATE':
            return {
                ...state,
                resumeTemplate: action.resumeTemplate,
            };
        default:
            return state;
    }
};
