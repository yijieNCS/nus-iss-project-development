// import {useContext, useState} from "react";
// import UserContext from "./UserContext";

// export const UserProvider = ({ children }) => {
//     const context = useContext(UserContext)

//     return (
//         <UserContext.Provider value={context}>
//             {children}
//         </UserContext.Provider>
//     )
// }

import React, { createContext, useState } from 'react';
import UserContext from './UserContext';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        userId: 0,
        firstName: '',
        lastName: ''
    });

    const contextValue = {
        user,
        setUser
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
