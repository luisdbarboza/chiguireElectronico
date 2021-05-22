import React, { createContext, useReducer } from "react";

export const SidebarContext = createContext();

const sidebarReducer = (state, action) => {
    switch(action.type) {
        case "SHOW_HIDE": {
            return {...state, show: action.close ? false : !state.show}
        }
        case "CHANGE_MODE":
            return {...state, mode: action.mode};
        default: 
            return state;
    }
}

const SidebarContextProvider = ({children}) => {
    const [sidebar, dispatchSidebar] = useReducer(sidebarReducer, {
        mode: "normal",
        show: false
    })
    
    return (
        <SidebarContext.Provider value={{sidebar, dispatchSidebar}}>
            {children}
        </SidebarContext.Provider>
    );
}
 
export default SidebarContextProvider;