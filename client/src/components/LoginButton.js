import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { BiUserCircle } from "react-icons/bi";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <Button onClick={() => loginWithRedirect({
                authorizationParams: {
                    redirect_uri: 'http://localhost:3000/login'
                }})}>
                <LoginIcon><BiUserCircle /></LoginIcon>
                <LoginText>Sign In</LoginText>
            </Button>
        )
    )
}

const Button = styled.button`
display: flex;
column-gap: 7px;
margin-top: 5px;
border-radius: 30px;
font-size: 16px;
color: black;
background-color: transparent;
border: none;

&:hover {
    color: gray;
}

&:active {
    color: dodgerblue;
}
`

const LoginIcon = styled.span`
padding-top: 6px;
font-size: 22px;
`

const LoginText = styled.span`
font-size: 20px;
font-weight: 400;
padding-top: 6px;
`

export default LoginButton;