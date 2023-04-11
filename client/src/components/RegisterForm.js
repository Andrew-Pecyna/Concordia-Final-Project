import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { FaBinoculars } from "react-icons/fa";

const RegisterForm = () => {
    const { user } = useAuth0();
    const navigate = useNavigate()

    const [LoadStatus, setLoadStatus] = useState(false)
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [formData, setFormData] = useState({})

    !user && navigate('/');

    useEffect(() => {
        const userLogin = async () => {

            try {
                const userResponse = await fetch(`/api/get-user/${user.name}`, { method: "GET" });
                const parsedData = await userResponse.json();
                const userData = parsedData.data

                if (userData) {
                    console.log("old user" + userData.name)
                    window.sessionStorage.setItem("currentUser", JSON.stringify(userData))
                    setCurrentUser(userData)
                    navigate('/userHome')
                }

                setLoadStatus(true)

            } catch (error) {
                console.log(error)
            }
        }

        if (user) {
            userLogin();
        }

    }, [user]);

    console.log("current user is: " + currentUser)

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value}) 
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formObject = { email: user.name, profPic: "./images/default_profile.png", ...formData }

            const newUserResponse = await fetch(`/api/post-user`,
                {   
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formObject)
                })
                const data = await newUserResponse.json();
                if (data.status === 200) {
                    window.sessionStorage.setItem("currentUser", JSON.stringify(data.data))
                    setCurrentUser(data.data)
                    navigate('/userHome')
                }
            } catch (error) {
                console.log(error)
            }

    }

    return (
        !LoadStatus ? <p>Loading...</p> :
        <>
            <HeaderBar>
                <TitleBox>
                    <Title>BirdFeed</Title>
                    <BinoBox>
                        <FaBinoculars />
                    </BinoBox>
                </TitleBox>
            </HeaderBar>
            <BannerImage>
            <Description>Cedar Waxwing</Description>
                <FormBox>
                    <form onSubmit={handleSubmit}>
                        <FormContents>
                            <FormHeader>
                                <p>Sign Up</p>
                            </FormHeader>
                            <InfoBox>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input type="text" id="firstName" name="firstName" onChange={handleChange} required></Input>
                            </InfoBox>
                            <InfoBox>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input type="text" id="lastName" name="lastName" onChange={handleChange} required></Input>
                            </InfoBox>
                            <InfoBox>
                                <Label htmlFor="userName">User Name</Label>
                                <Input type="text" id="userName" name="userName" onChange={handleChange} required></Input>
                            </InfoBox>
                            <BtnBox>
                                <Button type="submit">Create an Account</Button>
                            </BtnBox>
                        </FormContents>
                    </form>
                </FormBox>
            </BannerImage>
        </>
    )
}

const HeaderBar = styled.div`
display: flex;
align-items: center;
height: 125px;
padding: 0px 50px 0px 50px;
border-bottom: 2px solid navy;
`

const BannerImage = styled.div`
display: flex;
justify-content: flex-end;
background-image: url("./images/cedar_waxwing.jpg");
height: 100vh;
background-size: cover;
background-position: right 55% top 30%;
padding-top: 50px;
padding-right: 23%;

@media (max-width: 800px) {
    justify-content: center;
    padding-right: 0px;
}
`

const Description = styled.div`
position: absolute;
top: 740px;
left: 0px;
padding: 2px 10px;
color: white;
background-color: rgb(0, 0, 0, .5);
`

const FormBox = styled.div`
background-color: rgb(255, 255, 255, .7);
width: 450px;
height: 550px;
`

const FormContents = styled.div`
display: flex;
flex-direction: column;
align-items: center;
row-gap: 30px;
`

const FormHeader = styled.span`
font-size: 20px;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
padding: 50px 126px 20px 126px;
border-bottom: 2px solid silver;
`

const InfoBox = styled.span`
display: flex;
flex-direction: column;
align-items: flex-start;
row-gap: 5px;
color: gray;
font-weight: 300;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
`

const Input = styled.input`
width: 300px;
height: 35px;
font-size: 18px;
`

const Label = styled.label`
font-weight: 400;
font-size: 17px;
`

const TitleBox = styled.div`
display: flex;
column-gap: 10px;
`

const Title = styled.p`
font-size: 60px;
color: black;
`

const BinoBox = styled.span`
display: flex;
align-items: center;
padding-top: 10px;
font-size: 32px;
`

const BtnBox = styled.span`
border-top: 2px solid silver;
padding-top: 45px;
`

const Button = styled.button`
width: 326px;
height: 38px;
/* background-color: white; */
background-color: transparent;
border: 1px solid black;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
font-weight: 400;

&:hover {
    /* color: gray; */
    background: rgb(0, 0, 0, 0.5);
    color: white;
}

&:active {
    transform: scale(0.99)
}
`

export default RegisterForm;