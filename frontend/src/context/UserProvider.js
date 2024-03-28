import {useContext, useState} from "react";
import UserContext from "./UserContext";

export const UserProvider = ({ children }) => {
    const context = useContext(UserContext)

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )
}

