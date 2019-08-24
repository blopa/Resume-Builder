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
            default:
                return state;
        }
    },
});
