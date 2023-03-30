import React from 'react';
import { useState, useEffect } from 'react';

const BirdTestPage = () => {

    const [birds, setBirds] = useState([])

    useEffect(() => {
        const getAllBirds = async () => {
            try {
                const birdResponse = await fetch("/birds", { method: "GET" });
                const birdData = await birdResponse.json();
    
                console.log(birdData.data)
                setBirds(birdData.data);
    
            } catch (error) {
                console.log(error);
            }
        };
        getAllBirds();
    
        }, []);

        console.log(birds)

        return(
            birds.length === 0 ? <p>loading...</p> :
            <div>
                <span>{birds[0].name}</span>
            </div>
        )

}

export default BirdTestPage;