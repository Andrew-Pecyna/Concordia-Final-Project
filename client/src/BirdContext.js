import { useState, createContext, useEffect } from "react";

export const BirdContext = createContext(undefined);

export const BirdProvider = ({ children }) => {
    const [birds, setBirds] = useState([])

    useEffect(() => {
        const getAllBirds = async () => {
            try {
                const birdResponse = await fetch("/birds", { method: "GET" });
                const birdData = await birdResponse.json();
    
                console.log("API call")
                console.log(birdData.data[0])
                setBirds(birdData.data);
    
            } catch (error) {
                console.log(error);
            }
        };

        if (birds.length === 0) {
            getAllBirds();
        }
    
        }, []);



    return (
        <BirdContext.Provider value={{birds, setBirds}}>
            {children}
        </BirdContext.Provider>
    )
};

