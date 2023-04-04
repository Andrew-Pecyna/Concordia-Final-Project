import { useContext } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import NavBar from "./NavBar";
import RegisterButton from "./RegisterButton";

const Forum = () => {
    // Context to check if user has account/access to forum - to do
    // const {currentUser, setCurrentUser} = useContext(UserContext)

    return(
        <>
        <NavBar />
        <MainContainer>
            <SideBar>
                <div>
                    <RegisterButton />
                </div>
                <RegisterBox>
                    <p>Create an account to join the conversation and start adding to your bird collection! </p>
                </RegisterBox>
            </SideBar>
            <FeedWrapper>
                <FeedContainer>
                    <p>FORUM</p>
                </FeedContainer>
            </FeedWrapper>
        </MainContainer>
        </>
    )
}

// Media query to set button and feed in flex column when window shrinks - to do

const MainContainer = styled.div`
display: flex;
height: 100vh;
`

const FeedWrapper = styled.div`
display: flex;
justify-content: center;
width: 60%;
background-color: lightskyblue;
`

const FeedContainer = styled.div`
background-color: gainsboro;
width: 800px;
/* width: 70%; */
min-width: 550px;
`

const SideBar = styled.div`
display: flex;
flex-direction: column;
align-items: center;
row-gap: 40px;
background-color: steelblue;
width: 20%;
min-width: 300px;
`

const RegisterBox = styled.div`
color: white;
font-size: 17px;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
margin: 0px 40px;
padding: 25px 0px;
border-bottom: 2px solid gainsboro;
border-top: 2px solid gainsboro;
`

export default Forum;