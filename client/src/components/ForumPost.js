import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import UploadWidget from "./UploadWidget";
import { TbPhotoCheck } from "react-icons/tb";

const ForumPost = ({fetchSwitch, setFetchSwitch}) => {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [message, setMessage] = useState("")
    const [image, setImage] = useState("")

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
            email: currentUser.email,
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

            setImage("")
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
                <SmallImg src={currentUser.profPic} />
                <Form onSubmit={handleSubmit}>
                    <Textarea onChange={handleChange} placeholder="Create a Post" required/>
                    <Button type="submit">Post</Button>
                </Form>
                {!image && <UploadWidget setImage={setImage} />}
                {image && <IconSpan>
                    <TbPhotoCheck />
                </IconSpan>}
            </PostContainer>
    )
};

const PostContainer = styled.div`
position: sticky;
top: 0px;
display: flex;
align-items: center;
column-gap: 10px;
background-color: white;
padding: 10px 30px;
border: 2px solid gainsboro;
border-radius: 3px;
`

const Form = styled.form`
display: flex;
column-gap: 20px;
width: 100%;
`

const Textarea = styled.textarea`
width: 100%;
background-color: whitesmoke;
border: none;
resize: none;
`

const Button = styled.button`
height: 31px;
background-color: white;
font-weight: 400;
color: gray;
border: 2px solid gray;
border-radius: 3px;
margin-top: 1px;

&:hover {
    color: white;
    background-color: gray;
}
`

const SmallImg = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
margin-right: 10px;
`

const IconSpan = styled.span`
display: flex;
font-size: 32px;
color: green;
padding: 0px;
margin: 0px;
`

export default ForumPost;