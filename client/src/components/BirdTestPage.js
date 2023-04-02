import React from 'react';
import { useState, useEffect } from 'react';
import { UserContext } from "../UserContext";
import { useContext } from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';

const BirdTestPage = () => {

    const [birds, setBirds] = useState([])
    const {currentUser, setCurrentUser} = useContext(UserContext)

    useEffect(() => {
        const getAllBirds = async () => {
            try {
                const birdResponse = await fetch("/birds", { method: "GET" });
                const birdData = await birdResponse.json();
    
                console.log(birdData.data[0].images[0])
                setBirds(birdData.data);
    
            } catch (error) {
                console.log(error);
            }
        };
        getAllBirds();
    
        }, []);

        console.log(currentUser)

        return(
            birds.length === 0 ? <p>loading...</p> :
            <div>
                <NavBar />
                <StyledImage src={birds[0].images[0]} />
            </div>
        )

}

const StyledImage = styled.img`
width: 100%;
`

export default BirdTestPage;