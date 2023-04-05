import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import NavBar from "./NavBar";
import SideBarButton from "./SideBarButton";
import MakePost from "./MakePost";

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
                {!currentUser && (
                    <RegisterBox>
                        <p>Create an account to join the conversation and start adding to your bird collection! </p>
                    </RegisterBox>
                )}
                <ButtonBox>
                    <SideBarButton />
                </ButtonBox>
            </SideBar>
            <FeedWrapper>
                <FeedContainer>
                    {currentUser && <MakePost fetchSwitch={fetchSwitch} setFetchSwitch={setFetchSwitch} />}
                    {forumPosts.map((each) => {
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

// Media query to set button and feed in flex column when window shrinks - to do

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

export default Forum;