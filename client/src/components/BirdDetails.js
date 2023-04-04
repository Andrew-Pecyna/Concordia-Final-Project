import styled from "styled-components";
import NavBar from "./NavBar";
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { BirdContext } from '../BirdContext';
import { BsFillCheckCircleFill } from "react-icons/bs";


const BirdDetails = () => {

    const {birds} = useContext(BirdContext)
    const [resetKeyWord, setResetKeyWord] = useState(false)
    const birdName = useParams();

    const targetBird = birds.find(item => item.name === birdName.birdName)

    useEffect(() => {
        setResetKeyWord(!resetKeyWord)
    }, [birdName])

    console.log("my test" + targetBird.images[0])
    return (
        !targetBird ? <p>Loading...</p> :
        <>
            <NavBar resetKeyWord={resetKeyWord} />
            <Wrapper>
                <MainContainer>
                    <LeftContainer>
                        <TextWrapper>
                            <Content>
                                <p>{`${targetBird.order} > ${targetBird.family}`}</p>
                                <Name>{targetBird.name}</Name>
                                <p>{targetBird.sciName}</p>
                                <p>{targetBird.status}</p>
                                <span>
                                    <Button>
                                        <IconBox>
                                            <BsFillCheckCircleFill />
                                        </IconBox>
                                        <p>SEEN</p>
                                    </Button>
                                </span>
                            </Content>
                        </TextWrapper>
                    </LeftContainer>
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
justify-content: center;
width: 100vw;
/* background-color: #6695C0; */
/* background-color: #0C343D; */
/* background-color: #073763; */
/* border-top: 40px solid #515151; */
`

const MainContainer = styled.div`
display: flex;
width: 70%;
height: 70vh;
`

const LeftContainer = styled.div`
display: flex;
background-color: whitesmoke;
width: 50%;
padding: 30px;
border-left: 2px solid black;
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

const Name = styled.p`
font-size: 50px;
font-weight: bold;
`

const Button = styled.button`
border: none;
background-color: transparent;
font-weight: 100;
`

const IconBox = styled.span`
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

export default BirdDetails;