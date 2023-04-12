import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { BirdContext } from "../BirdContext";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import NavBar from "./NavBar";
import RegisterButton from "./RegisterButton";

const LandingPage = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const { birds } = useContext(BirdContext)
    const navigate = useNavigate();

    
    useEffect(() => {
        if (currentUser) {
            navigate("/userHome")
        }
    }, [])

    return (
        !birds ? <p>Loading...</p> :
        <div>
            <NavBar />
            <BannerImage />
            <OwlText>Short-eared owl in flight.</OwlText>
            <MainTextBox>
                <MainText>Build your own birding community</MainText>
                <Description>Log sightings, share photos, and collect birds - all in one place</Description>
                <RegisterButton />
            </MainTextBox>
        </div>
    )
}


const BannerImage = styled.div`
background-image: url("./images/owl_in_flight.jpg");
height: 100vh;
background-size: cover;
background-position: right 55% top 30%;
`

const OwlText = styled.p`
position: absolute;
top: 200px;
right: 0px;
color: white;
background-color: rgba(0, 0, 0, 0.5);
width: 185px;
padding: 2px 10px;
`

const MainTextBox = styled.div`
position: absolute;
text-align: center;
top:325px;
left: 50px;
border-radius: 5px;
height: 390px;
width: 500px;
border: 3px solid #020B4A;
`

const MainText = styled.p`
color: white;
font-size: 40px;
padding: 35px 20px;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
`

const Description = styled.div`
font-size: 22px;
color: white;
padding: 5px 20px;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
`

export default LandingPage;