import { combineReducers } from 'redux';
import initialState from '../initialState';

export default combineReducers({
    resume: (state = initialState, action) => {
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
                        skills: {
                            ...action.education,
                        },
                    },
                };
            case 'SET_RESUME_AWARDS':
                return {
                    ...state,
                    togglableJsonResume: {
                        ...state.togglableJsonResume,
                        skills: {
                            ...action.awards,
                        },
                    },
                };
            case 'SET_RESUME_VOLUNTEER':
                return {
                    ...state,
                    togglableJsonResume: {
                        ...state.togglableJsonResume,
                        skills: {
                            ...action.volunteer,
                        },
                    },
                };
            case 'SET_RESUME_PUBLICATIONS':
                return {
                    ...state,
                    togglableJsonResume: {
                        ...state.togglableJsonResume,
                        skills: {
                            ...action.publications,
                        },
                    },
                };
            case 'SET_RESUME_LANGUAGES':
                return {
                    ...state,
                    togglableJsonResume: {
                        ...state.togglableJsonResume,
                        skills: {
                            ...action.languages,
                        },
                    },
                };
            case 'SET_RESUME_INTERESTS':
                return {
                    ...state,
                    togglableJsonResume: {
                        ...state.togglableJsonResume,
                        skills: {
                            ...action.interests,
                        },
                    },
                };
            case 'SET_RESUME_REFERENCES':
                return {
                    ...state,
                    togglableJsonResume: {
                        ...state.togglableJsonResume,
                        skills: {
                            ...action.references,
                        },
                    },
                };
            default:
                return state;
        }
    },
});
