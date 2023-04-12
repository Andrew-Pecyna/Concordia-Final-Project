import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const SideBarButton = () => {
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
padding: 10px 40px;
margin-top: 30px;
border-radius: 30px;
font-size: 20px;
font-weight: 400;
color: #020B4A;
background-color: white;
border: 2px solid #020B4A;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
text-transform: uppercase;

&:hover {
    background-color: #020B4A;
    color: white;
}

&:active {
    transform: scale(.99)
}
`

export default SideBarButton;