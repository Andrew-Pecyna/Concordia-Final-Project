import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiHomeCircle } from "react-icons/bi";
import NavBar from "./NavBar";
import SideBarButton from "./SideBarButton";
import ForumPost from "./ForumPost";
import SinglePostForum from "./SinglePostForum";

const Forum = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [forumPosts, setForumPosts] = useState([])
    const [fetchSwitch, setFetchSwitch] = useState(false)

    useEffect(() => {
        const getForumPosts = async () => {
            try{
                const forumResponse = await fetch(`/api/get-forum`, { method: "GET" });
                const parsedData = await forumResponse.json();
                const forumData = parsedData.data

                console.log("getForum data is : " + forumData)
                setForumPosts(forumData)

            } catch (error) {
                console.log(error)
            }
        }
        getForumPosts()

    }, [fetchSwitch])

    return(
        forumPosts === 0 ? <p>Loading...</p> :
        <>
        <NavBar />
        <MainContainer>
            <SideBar>
                {!currentUser
                ? (
                    <RegisterBox>
                        <p>Create an account to join the conversation and start adding to your bird collection! </p>
                    </RegisterBox>
                )
                : (
                    <LinkBox>
                        <StyledLink to="/userHome">
                            <HomeIcon>
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
                )
                }
                <ButtonBox>
                    <SideBarButton />
                </ButtonBox>
            </SideBar>
            <FeedWrapper>
                <FeedContainer>
                    <F>F o r u m</F>
                    {currentUser && <ForumPost fetchSwitch={fetchSwitch} setFetchSwitch={setFetchSwitch} />}
                    {forumPosts.map((each) => {
                        return (
                            <SinglePostForum fetchSwitch={fetchSwitch} setFetchSwitch={setFetchSwitch} currentUser={currentUser} postData={each} key={each._id}/>
                        )
                    })}
                </FeedContainer>
            </FeedWrapper>
        </MainContainer>
        </>
    )
}

// Media query to set button and feed in flex column when window shrinks - to do

const F = styled.p`
position: absolute;
color: white;
background-color: dodgerblue;
width: 70px;
padding: 2px 2px 2px 5px;
top: 156px;
opacity: 85%;
/* left: 220px; */
`

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
margin-left: 10px;
column-gap: 5px;
text-decoration: none;
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


const Img = styled.img`
width: 200px;
`

export default Forum;