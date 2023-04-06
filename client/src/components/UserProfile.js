import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import NavBar from "./NavBar";
import FeedPost from "./FeedPost";

const UserProfile = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [fetchSwitch, setFetchSwitch] = useState(false)
    const [userPosts, setUserPosts] = useState([])
    const userName = useParams();
    const navigate = useNavigate();

    console.log(currentUser.userName)

    useEffect(() => {
        if (currentUser === null) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        const getUserPosts = async () => {
            try{
                const feedResponse = await fetch(`/api/get-userfeed/${currentUser.userName}`, { method: "GET" });
                const parsedData = await feedResponse.json();
                const feedData = parsedData.data

                console.log("the USER Feed data is : " + feedData)
                setUserPosts(feedData)

            } catch (error) {
                console.log(error)
            }
        }
        getUserPosts()

    }, [fetchSwitch])

    return (
        <div>
            <NavBar />
            <MainContainer>
                <SideBar>
                    <div>
                        <Link to="/userHome">
                            <p>Home</p>
                        </Link>
                        <Link to="/userProfile">
                            <p>Profile</p>
                        </Link>
                    </div>
                </SideBar>
                <FeedWrapper>
                    <FeedContainer>
                        <FeedPost fetchSwitch={fetchSwitch} setFetchSwitch={setFetchSwitch} />
                        {userPosts.map((each) => {
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
            <Footer>
                <FooterIcon>
                    <p>bf</p>
                </FooterIcon>
            </Footer>
        </div>
    )
}

const MainContainer = styled.div`
display: flex;
height: 70vh;
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

const Img = styled.img`
width: 200px;
`

const SinglePost = styled.div`
border: 2px solid black;
background-color: white;
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

export default UserProfile;