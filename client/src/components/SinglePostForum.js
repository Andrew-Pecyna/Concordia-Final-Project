import { useEffect, useState } from "react";
import styled from "styled-components";

const SinglePostForum = ({fetchSwitch, setFetchSwitch, currentUser, postData}) => {
    const [userObj, setUserObj] = useState({})

    useEffect(() => {

        const getUser = async () => {

            try {
                const userResponse = await fetch(`/api/get-user/${postData.email}`, { method: "GET" });
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

    const handleDelete = async (event) => {

        try {

            const deletePostResponse = await fetch(`/api/delete-forum-post/${postData._id}`, { method: "DELETE" });
            const parsedData = await deletePostResponse.json();

            console.log("deletion id : " + postData._id)
            console.log(parsedData)

            if (parsedData.status === 200) {
                console.log(parsedData.message)
            }

            setFetchSwitch(!fetchSwitch);

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Container>
            <ProfBox>
                <ProfImg src={userObj.profPic} />
            </ProfBox>
            <OuterBox>
                <span>
                    <InnerBox>
                        <Author>{postData.author}</Author>
                        <Delete onClick={handleDelete} >x</Delete>        
                    </InnerBox>
                    <Text>{postData.text}</Text>
                </span>
                <Img src={postData.image} />
            </OuterBox>
        </Container>
    )
}

const Container = styled.div`
display: flex;
border: 2px solid gainsboro;
border-radius: 3px;
background-color: white;
`

const ProfBox = styled.div`
padding: 10px 10px;
/* background-color: skyblue; */
`

const ProfImg = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`

const OuterBox = styled.div`
width: 100%;
overflow: scroll;
`

const InnerBox = styled.span`
display: flex;
/* width: 100%; */
/* background-color: skyblue; */
justify-content: space-between;
`

const Delete = styled.button`
background-color: white;
margin: 0px 5px 0px 0px;
padding: 0px 5px 2px 6px;

border-radius: 50%;
border: none;
color: gray;
font-weight: 400;
align-self: center;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;

&:hover {
    background-color: gainsboro;
    color: white;
}

&:active {
    background-color: gray;
}
`

const Author = styled.p`
font-size: 18px;
font-weight: 700;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
padding: 10px 0px 0px 0px;
`

const Text = styled.p`
/* background-color: lightgoldenrodyellow; */
font-size: 16px;
font-weight: 400;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
padding: 5px 5px 5px 0px;
overflow: scroll;
`

const Img = styled.img`
width: 100%;
`

export default SinglePostForum;