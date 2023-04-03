import styled from "styled-components";
import NavBar from "./NavBar";
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { BirdContext } from '../BirdContext';


const BirdDetails = () => {

    const {birds} = useContext(BirdContext)
    const [resetKeyWord, setResetKeyWord] = useState(false)
    const birdName = useParams();

    const targetBird = birds.find(item => item.name === birdName.birdName)

    useEffect(() => {
        setResetKeyWord(!resetKeyWord)
    }, [birdName])

    
    return (
        !targetBird ? <p>Loading...</p> :
        <>
            <NavBar resetKeyWord={resetKeyWord} />
            <p>Single Bird Details Page</p>
            <p>{targetBird.name}</p>
            {targetBird.images.length > 0 && (
                <Image src={targetBird.images[0]} />
            )}
        </>
    )
}

const Image = styled.img`
width: 400px;
`

export default BirdDetails;