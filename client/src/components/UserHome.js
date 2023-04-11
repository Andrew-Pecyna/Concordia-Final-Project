import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { BiHomeCircle } from "react-icons/bi";
import NavBar from "./NavBar";
import FeedPost from "./FeedPost";
import SinglePostFeed from "./SinglePostFeed";

const UserHome = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [homePosts, setHomePosts] = useState([])
    const [fetchSwitch, setFetchSwitch] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser === null) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        const getHomePosts = async () => {
            try{
                const feedResponse = await fetch(`/api/get-homefeed`, { method: "GET" });
                const parsedData = await feedResponse.json();
                const feedData = parsedData.data

                console.log("getHomeFeed data is : " + feedData)
                setHomePosts(feedData)

            } catch (error) {
                console.log(error)
            }
        }
        getHomePosts()

    }, [fetchSwitch])

    console.log(currentUser)
    console.log("example post: " + homePosts)

    return (
        !currentUser ? <p>Loading...</p> :
        <>
        <NavBar />
        <MainContainer>
            <SideBar>
                <LinkBox>
                    <StyledLink home={true} to="/userHome">
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
            </SideBar>
            <FeedWrapper>
                <FeedContainer>
                    <FeedPost fetchSwitch={fetchSwitch} setFetchSwitch={setFetchSwitch} />
                    {homePosts.map((each) => {
                        return (
                            <SinglePostFeed fetchSwitch={fetchSwitch} setFetchSwitch={setFetchSwitch} currentUser={currentUser} postData={each} key={each._id} />
                        )
                    })}
                </FeedContainer>
            </FeedWrapper>
        </MainContainer>
        </>
    )
}

const MainContainer = styled.div`
display: flex;
height: 82vh;
min-width: 917px;
`

const FeedWrapper = styled.div`
display: flex;
justify-content: center;
width: 60%;
background-color: whitesmoke;
`

const FeedContainer = styled.div`
display: flex;
flex-direction: column;
row-gap: 15px;
background-color: gainsboro;
margin: 30px 50px 0px 50px;
padding: 0px 30px;
padding-bottom: 10px;
width: 700px;
min-width: 550px;
overflow: scroll;
`

const SideBar = styled.div`
display: flex;
flex-direction: column;
align-items: center;
row-gap: 10px;
width: 20%;
min-width: 300px;
border-right: 2px solid #020B4A;
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
background-color: ${props => props.home ? '#d9e6f2' : 'white'};
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

export default UserHome;