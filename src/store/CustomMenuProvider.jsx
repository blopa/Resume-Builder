import React, { createContext, useState } from 'react';

export const CustomMenuContext = createContext(
    {
        isShowingDrawer: false,
        setIsShowingDrawer: () => {},
    }
);

// eslint-disable-next-line react/prop-types
const CustomMenuProvider = ({ children }) => {
    const [isShowingDrawer, setIsShowingDrawer] = useState(false);

    const contextValue = {
        isShowingDrawer,
        setIsShowingDrawer,
    };

    return (
        <CustomMenuContext.Provider value={contextValue}>
            {children}
        </CustomMenuContext.Provider>
    );
};

export default CustomMenuProvider;
