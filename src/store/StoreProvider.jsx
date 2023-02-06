import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
    toggleableJsonResume: {},
    resumeTemplate: 'Default',
};

export const StoreContext = createContext(initialState);

export const useSelector = (func) => {
    const { state } = useContext(StoreContext);
    return func(state);
};

export const useDispatch = () => {
    const { dispatch } = useContext(StoreContext);
    return dispatch;
};

// eslint-disable-next-line react/prop-types
const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = {
        state,
        dispatch,
    };

    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
