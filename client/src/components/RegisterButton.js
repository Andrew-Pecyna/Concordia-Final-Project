import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const RegisterButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <Button onClick={() => loginWithRedirect({
                authorizationParams: {
                    redirect_uri: 'http://localhost:3000/login'
                }})}>
                Get Started
            </Button>
        )
    )
}

const Button = styled.button`
/* padding: 12px 40px; */
padding: 10px 50px;
margin-top: 30px;
border-radius: 30px;
font-size: 20px;
font-weight: 400;
color: white;
background-color: transparent;
border: 2px solid white;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
text-transform: uppercase;

&:hover {
    background-color: white;
    color: dodgerblue;
}

&:active {
    transform: scale(.99)
}
`

export default RegisterButton;