import styled from "styled-components";
import NavBar from "./NavBar";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../UserContext";
import { BirdContext } from '../BirdContext';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiHomeCircle } from "react-icons/bi";


const BirdDetails = () => {

    const {birds} = useContext(BirdContext)
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [resetKeyWord, setResetKeyWord] = useState(false)
    const birdName = useParams();
    const [userObj, setUserObj] = useState({})

    const targetBird = birds.find(item => item.name === birdName.birdName)

    useEffect(() => {
        setResetKeyWord(!resetKeyWord)
    }, [birdName])

    const handleClick = async () => {

        try {
            const collectionObj = { user: currentUser.userName, bird: targetBird }

            const addBirdResponse = await fetch(`/api/add-bird`,
                {   
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(collectionObj)
                })
                const data = await addBirdResponse.json();
                if (data.status === 200) {
                    console.log(data.message)
                    setCurrentUser({birds: [...birds, data.data] ,...currentUser})
                }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        const getUser = async () => {

            try {
                const userResponse = await fetch(`/api/get-user/${currentUser.email}`, { method: "GET" });
                const parsedData = await userResponse.json();
                const userData = parsedData.data

                if (userData) {
                    setUserObj(userData)
                }

            } catch (error) {
                console.log(error)
            }
        }
        getUser()

    }, [])

    const usersBirds = userObj.birds
    let match = undefined

    if (usersBirds) {
        match = usersBirds.find(item => item.name === targetBird.name)
        console.log(match)
    }

    console.log(match)
    
    console.log(usersBirds)


    return (
        !targetBird ? <p>Loading...</p> :
        <>
            <NavBar resetKeyWord={resetKeyWord} />
            <Wrapper>
                <LeftContainer>
                    {currentUser && <LinkBox>
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
                    </LinkBox>}
                </LeftContainer>
                <MainContainer>
                    <DetailsContainer>
                        <TextWrapper>
                            <Content>
                                <P1>{`${targetBird.order} > ${targetBird.family}`}</P1>
                                <Name>{targetBird.name}</Name>
                                <P2>{targetBird.sciName}</P2>
                                <P3>{targetBird.status}</P3>
                                <span>
                                    {!match
                                    ? <Button onClick={handleClick}>
                                        <UnseenIcon>
                                            <BsFillCheckCircleFill />
                                        </UnseenIcon>
                                        <P4>SEEN</P4>
                                    </Button>
                                    : <span>
                                        <SeenIcon>
                                            <BsFillCheckCircleFill />
                                        </SeenIcon>
                                        <P4>SEEN</P4>
                                    </span>
                                    }
                                </span>
                            </Content>
                        </TextWrapper>
                    </DetailsContainer>
                    <RightContainer>
                        {targetBird.images.length > 0 && (
                        <BannerImage img={targetBird.images[0]}/>
                        )}
                    </RightContainer>
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
/* justify-content: center; */
width: 100vw;
`

const LeftContainer = styled.div`
/* background-color: skyblue; */
width: 250px;
`

const MainContainer = styled.div`
display: flex;
width: 70%;
height: 70vh;
`

const DetailsContainer = styled.div`
display: flex;
background-color: whitesmoke;
width: 50%;
padding: 30px;
border-left: 2px solid black;
min-width: 250px;
`

const TextWrapper = styled.div`
display: flex;
background-color: #E8E8E8;
width: 100%;
height: 100%;
`

const RightContainer = styled.div`
/* width: 50%; */
min-width: 550px;
height: 100%;
`

const Content = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
width: 50%;
height: 100%;
padding-left: 10px;
`

const P1 = styled.p`
font-size: 18px;
color: dimgray;
`

const P2 = styled.p`
font-size: 20px;
color: dimgray;
font-style: italic;
`

const P3 = styled.p`
font-size: 16px;
/* background-color: white; */
color: #538cc6;
padding: 2px 5px;
border-radius: 15px;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
margin: 15px 0px;
`

const P4 = styled.p`
font-size: 13px;
font-weight: 400;
color: dimgray;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
`

const Name = styled.p`
font-size: 50px;
font-weight: bold;
margin: 10px 0px;
`

const Button = styled.button`
border: none;
background-color: transparent;
font-weight: 100;
`

const UnseenIcon = styled.span`
font-size: 28px;
color: silver;

&:hover {
    color: gray;
}

&:active {
    color: darkgray;
}
`

const SeenIcon = styled.span`
font-size: 28px;
color: green;
`

const BannerImage = styled.div`
background-image: url(${props => props.img});
width: 100%;
height: 100%;
background-size: cover;
/* background-repeat: no-repeat; */
/* background-size: 100% 100%; */
background-position: right 55% top 30%;
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

const LinkBox = styled.div`
display: flex;
flex-direction: column;
font-size: 22px;
row-gap: 20px;
/* background-color: skyblue; */
margin-top: 30px;
padding-left: 25px;
width: 100%;
`

const StyledLink = styled(Link)`
display: flex;
column-gap: 5px;
/* margin-left: 10px; */
text-decoration: none;
/* background-color: ${props => props.home ? '#d9e6f2' : 'white'}; */
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

export default BirdDetails;