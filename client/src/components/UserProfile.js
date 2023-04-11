import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiHomeCircle } from "react-icons/bi";
import NavBar from "./NavBar";
import FeedPost from "./FeedPost";
import ChangePhoto from "./ChangePhoto";
import SinglePostFeed from "./SinglePostFeed";

const UserProfile = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [fetchSwitch, setFetchSwitch] = useState(false)
    const [picSwitch, setPicSwitch] = useState(false)
    const [userPosts, setUserPosts] = useState([])
    const [profImage, setProfImage] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser === null) {
            navigate("/")
        }
    }, [currentUser])


    useEffect(() => {
        const getUserPosts = async () => {
            try{
                const feedResponse = await fetch(`/api/get-userfeed/${currentUser.userName}`, { method: "GET" });
                const parsedData = await feedResponse.json();
                const feedData = parsedData.data

                setUserPosts(feedData)

            } catch (error) {
                console.log(error)
            }
        }
        getUserPosts()

    }, [fetchSwitch])

    useEffect(() => {
        setCurrentUser({profPic: profImage, ...currentUser})
        console.log("new pic is : " + profImage)
    }, [profImage])

    console.log("Log in UserProfile : " + currentUser.profPic)


    return (
        <div>
            <NavBar />
            <MainContainer>
                <SideBar>
                    <ProfBox>
                        <ProfImg src={currentUser.profPic} />
                    </ProfBox>
                    <EditBox>
                        <ChangePhoto setProfImage={setProfImage} picSwitch={picSwitch} setPicSwitch={setPicSwitch} />
                    </EditBox>
                    <ProfInfo>
                        <UserName>{currentUser.userName}</UserName>
                        <p>Add a bio!</p>
                        <p>Joined in April 2023</p>
                    </ProfInfo>
                    <LinkBox>
                        <StyledLink to="/userHome">
                            <HomeIcon>
                                <BiHomeCircle />
                            </HomeIcon>
                            <p>Home</p>
                        </StyledLink>
                        <ProfLink profile={true} to="/userProfile">
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
                        {userPosts.map((each) => {
                            return (
                                <SinglePostFeed fetchSwitch={fetchSwitch} setFetchSwitch={setFetchSwitch} currentUser={currentUser} postData={each} key={each._id}/>
                            )
                        })}
                    </FeedContainer>
                </FeedWrapper>
            </MainContainer>
        </div>
    )
}

const MainContainer = styled.div`
display: flex;
height: 82vh;
min-width: 917px;
`

const SideBar = styled.div`
display: flex;
flex-direction: column;
align-items: center;
/* row-gap: 10px; */
width: 20%;
min-width: 300px;
border-right: 2px solid #020B4A;
`

const ProfBox = styled.span`
/* background-color: skyblue; */
margin-top: 30px;
`

const EditBox = styled.span`
width: 175px;
/* background-color: skyblue; */
height: 20px;
`

const ProfImg = styled.img`
width: 175px;
height: 175px;
border-radius: 50%;
border: 3px solid gainsboro;
`

const ProfInfo = styled.div`
/* background-color: lightgoldenrodyellow; */
width: 80%;
border-top: 2px solid gainsboro;
padding: 5px 0px 10px 0px;
border-bottom: 2px solid gainsboro;
`

const UserName = styled.p`
font-size: 26px;
`

const LinkBox = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
/* align-items: center; */
font-size: 22px;
row-gap: 10px;
/* background-color: skyblue; */
margin-bottom: 75px;
padding-left: 25px;
width: 100%;
height: 100%;
`

const StyledLink = styled(Link)`
display: flex;
align-items: center;
column-gap: 5px;
margin-left: 10px;
text-decoration: none;
`

const HomeIcon = styled.span`
font-size: 24px;
padding-top: 5px;
`

const ProfLink = styled(Link)`
display: flex;
align-items: center;
column-gap: 7px;
text-decoration: none;
width: 130px;
padding: 5px 2px 0px 2px;
border-radius: 25px;
background-color: ${props => props.profile ? '#d9e6f2' : 'white'};
`

const SmallImg = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
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
/* background-color: gainsboro; */
margin: 30px 50px 0px 50px;
padding: 0px 30px;
padding-bottom: 10px;
width: 700px;
min-width: 550px;
overflow: scroll;
`

export default UserProfile;