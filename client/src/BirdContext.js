import { useState, createContext } from "react";

export const BirdContext = createContext(undefined);

export const BirdProvider = ({ children }) => {
    const [birds, setBirds] = useState([])

    return (
        <BirdContext.Provider value={{birds, setBirds}}>
            {children}
        </BirdContext.Provider>
    )
};

