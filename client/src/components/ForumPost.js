import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import UploadWidget from "./UploadWidget";

const ForumPost = ({fetchSwitch, setFetchSwitch}) => {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [message, setMessage] = useState("")
    const [image, setImage] = useState([])

    const handleChange = (event) => {
        setMessage(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (image === "") {
            setImage([])
        }

        const postObject = {
            author: currentUser.userName,
            text: message,
            image: image}

        try {
            const forumPostResponse = await fetch(`/api/forum-post`,
                {   
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postObject)
                })
                const data = await forumPostResponse.json();
                if (data.status === 200) {
                    console.log(data.message)
                }

            setImage([])
            setMessage("")
            setFetchSwitch(!fetchSwitch);
            event.target.reset()

        } catch (error) {
            console.log(error)
        }
    }

    return (
            !currentUser ? <p>Loading...</p> :
            <PostContainer>
                <UserPic>Pic</UserPic>
                <Form onSubmit={handleSubmit}>
                    <Textarea onChange={handleChange} placeholder="Create a Post" required/>
                    <button type="submit">POST</button>
                </Form>
                <UploadWidget setImage={setImage} />
            </PostContainer>
    )
};

const PostContainer = styled.div`
display: flex;
align-items: center;
/* width: 100%; */
column-gap: 20px;
background-color: gray;
padding: 10px 30px;
`

const UserPic = styled.div`
padding: 4px;
border: 1px solid black;
border-radius: 50%;
`

const Form = styled.form`
display: flex;
column-gap: 20px;
width: 100%;
`

const Textarea = styled.textarea`
width: 100%;
`

export default ForumPost;