import { useState, createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const userInStorage = window.sessionStorage.getItem("currentUser")
        return !userInStorage ? null : JSON.parse(userInStorage)
    })

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
};