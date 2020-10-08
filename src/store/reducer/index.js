export default (state, action) => {
    switch (action.type) {
        case 'SET_JSON_RESUME':
            return {
                ...state,
                jsonResume: {
                    ...action.resume,
                },
            };
        case 'SET_TOGGLABLE_JSON_RESUME':
            return {
                ...state,
                togglableJsonResume: {
                    ...action.resume,
                },
            };
        case 'SET_RESUME_BASICS':
            return {
                ...state,
                togglableJsonResume: {
                    ...state.togglableJsonResume,
                    basics: {
                        ...action.basics,
                    },
                },
            };
        case 'SET_RESUME_WORK':
            return {
                ...state,
                togglableJsonResume: {
                    ...state.togglableJsonResume,
                    work: {
                        ...action.work,
                    },
                },
            };
        case 'SET_RESUME_SKILLS':
            return {
                ...state,
                togglableJsonResume: {
                    ...state.togglableJsonResume,
                    skills: {
                        ...action.skills,
                    },
                },
            };
        case 'SET_RESUME_EDUCATION':
            return {
                ...state,
                togglableJsonResume: {
                    ...state.togglableJsonResume,
                    education: {
                        ...action.education,
                    },
                },
            };
        case 'SET_RESUME_AWARDS':
            return {
                ...state,
                togglableJsonResume: {
                    ...state.togglableJsonResume,
                    awards: {
                        ...action.awards,
                    },
                },
            };
        case 'SET_RESUME_VOLUNTEER':
            return {
                ...state,
                togglableJsonResume: {
                    ...state.togglableJsonResume,
                    volunteer: {
                        ...action.volunteer,
                    },
                },
            };
        case 'SET_RESUME_PUBLICATIONS':
            return {
                ...state,
                togglableJsonResume: {
                    ...state.togglableJsonResume,
                    publications: {
                        ...action.publications,
                    },
                },
            };
        case 'SET_RESUME_LANGUAGES':
            return {
                ...state,
                togglableJsonResume: {
                    ...state.togglableJsonResume,
                    languages: {
                        ...action.languages,
                    },
                },
            };
        case 'SET_RESUME_INTERESTS':
            return {
                ...state,
                togglableJsonResume: {
                    ...state.togglableJsonResume,
                    interests: {
                        ...action.interests,
                    },
                },
            };
        case 'SET_RESUME_REFERENCES':
            return {
                ...state,
                togglableJsonResume: {
                    ...state.togglableJsonResume,
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
