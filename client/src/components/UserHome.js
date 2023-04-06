import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { BiHomeCircle } from "react-icons/bi";
import NavBar from "./NavBar";
import FeedPost from "./FeedPost";

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

    return (
        !currentUser ? <p>Loading...</p> :
        <>
        <NavBar />
        <MainContainer>
            <SideBar>
                <LinkBox>
                    <StyledLink to="/userHome">
                        <span>
                            <BiHomeCircle />
                        </span>
                        <p>Home</p>
                    </StyledLink>
                    <StyledLink to="/userProfile">
                        <span>
                        </span>
                        <p>Profile</p>
                    </StyledLink>
                </LinkBox>
            </SideBar>
            <FeedWrapper>
                <FeedContainer>
                    <FeedPost fetchSwitch={fetchSwitch} setFetchSwitch={setFetchSwitch} />
                    {homePosts.map((each) => {
                        return (
                            <SinglePost key={each._id}>
                                <p>{each.author}</p>
                                <p>{each.text}</p>
                                <Img src={each.image} />
                            </SinglePost>
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
text-decoration: none;
`

const ButtonBox = styled.div`
`

const RegisterBox = styled.div`
color: #020B4A;
font-size: 17px;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
margin: 40px 40px 0px 40px;
padding: 25px 0px 25px 0px;
border-bottom: 2px solid gainsboro;
border-top: 2px solid gainsboro;
`

const Img = styled.img`
width: 200px;
`

const SinglePost = styled.div`
border: 2px solid black;
background-color: white;
`

export default UserHome;