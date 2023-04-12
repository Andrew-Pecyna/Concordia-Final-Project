import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../UserContext";
import { BirdContext } from '../BirdContext';
import styled from 'styled-components';
import NavBar from './NavBar';

const BirdTestPage = () => {

    const {birds} = useContext(BirdContext)

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