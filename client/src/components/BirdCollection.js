import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../UserContext";
import styled from "styled-components";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { BiHomeCircle } from "react-icons/bi";

const BirdCollection = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const userBirds = currentUser.birds


    return (
        <>
            <NavBar />
            <Wrapper>
                <LeftContainer>
                    <LinkBox>
                        <StyledLink to="/userHome">
                            <HomeIcon >
                                <BiHomeCircle />
                            </HomeIcon>
                            <p>Home</p>
                        </StyledLink>
                        <ProfLink to="/userProfile">
                            <span>
                                <SmallImg src={currentUser.profPic} />
                            </span>
                            <p>Profile</p>
                        </ProfLink>
                    </LinkBox>
                </LeftContainer>
                <MainContainer>
                    <Tab>C o l l e c t i o n</Tab>
                    <MiddleBox>
                        {userBirds.map((each) => {
                            return (
                                <Thumbnail key={each.id}>
                                    <Img src={each.images[0]} />
                                    <P1>{each.name}</P1>
                                </Thumbnail>
                            )
                        })}
                    </MiddleBox>
                </MainContainer>
            </Wrapper>
            <Footer>
                <FooterIcon>
                    <p>bf</p>
                </FooterIcon>
            </Footer>
        </>
    )
}

const Wrapper = styled.div`
display: flex;
width: 100vw;
`

const MainContainer = styled.div`
display: flex;
justify-content: center;
width: 70%;
height: 70vh;
min-width: 700px;
`

const MiddleBox = styled.div`
display: flex;
flex-wrap: wrap;
row-gap: 10px;
column-gap: 10px;
width: 60%;
min-width: 700px;
background-color: whitesmoke;
padding: 35px 25px 25px 35px;
overflow: scroll;
`

const LeftContainer = styled.div`
width: 20%;
min-width: 300px;
border-right: 2px solid black;
`

const LinkBox = styled.div`
display: flex;
flex-direction: column;
font-size: 22px;
row-gap: 20px;
margin-top: 30px;
padding-left: 25px;
width: 100%;
`

const StyledLink = styled(Link)`
display: flex;
column-gap: 5px;
text-decoration: none;
width: 115px;
padding: 10px 0px 5px 12px;
border-radius: 25px;
`

const HomeIcon = styled.span`
font-size: 24px;
`

const ProfLink = styled(Link)`
display: flex;
align-items: center;
column-gap: 7px;
text-decoration: none;
`

const SmallImg = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
`

const Footer = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: #020B4A;
height: 105px;
`

const FooterIcon = styled.span`
font-size: 20px;
padding: 10px;
color: #E8E8E8;
border: 1px solid #E8E8E8;
`

const Thumbnail = styled.div`
height: 260px;
background-color: white;
padding-bottom: 5px;
`

const Img = styled.img`
width: 200px;
height: 200px;
padding: 10px 10px 0px 10px;
`

const P1 = styled.p`
font-size: 16px;
margin: 0px 10px;
padding: 8px 0px;
max-width: 180px;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
`

const Tab = styled.p`
position: sticky;
background-color: dodgerblue;
opacity: 85%;
height: 25px;
min-width: 120px;
color: white;
left: 155px;
padding: 2px 2px 5px 9px;
`

export default BirdCollection;