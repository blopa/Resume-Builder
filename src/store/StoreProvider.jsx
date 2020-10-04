import React, { createContext, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
    jsonResume: {},
    togglableJsonResume: {},
    resumeTemplate: 'Default',
};

export const StoreContext = createContext(
    initialState
);

// eslint-disable-next-line react/prop-types
const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = {
        state,
        dispatch,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
