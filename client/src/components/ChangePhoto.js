import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import ProfPicWidget from "./ProfPicWidget";

const ChangePhoto = ({picSwitch, setPicSwitch}) => {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [image, setImage] = useState("")

    const handlePicChange = async (event) => {
        event.preventDefault();

        const picObject = {
            image: image,
            userName: currentUser.userName 
        }

        try {
            const picChangeResponse = await fetch(`/api/change-photo`,
                {   
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(picObject)
                })
                const data = await picChangeResponse.json();
                if (data.status === 200) {
                    setCurrentUser(data.data) 
                }

            setImage("")
            setPicSwitch(!picSwitch);

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            {!image && <ProfPicWidget setImage={setImage} />}
            {image && <Button onClick={handlePicChange} >Change</Button>}
        </div>
    )

}

const Button = styled.button`
position: relative;
top: -20px;
left: -25px;
height: 22px;
font-size: 16px;
font-weight: 200;
border: none;
padding: 0px 2px;
border: 1px solid black;
border-radius: 15px;
background-color: transparent;

&:hover {
    background-color: black;
    color: white;
    border: none;
}

&:active {
    transform: scale(0.97);
}
`

export default ChangePhoto;