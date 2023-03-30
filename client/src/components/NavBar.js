import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import { FaBinoculars } from "react-icons/fa";
// import { AiOutlineUser } from "react-icons/ai";

const NavBar = () => {

    return (
        <div>
            <BarOne>
                <NavSignIn>
                    <SignInBox>
                        <LoginIcon>
                            <BiUserCircle />
                        </LoginIcon>
                        <LoginText>
                            <p>Sign In</p>
                        </LoginText>
                    </SignInBox>
                </NavSignIn>
            </BarOne>
            <BarTwo>
                <TitleBox>
                    <Logo to="/">BirdFeed</Logo>
                    <BinoBox>
                        <FaBinoculars />
                    </BinoBox>
                </TitleBox>
                <NavContent>
                    <NavItem to="/birds">Explore Birds</NavItem>
                    <SearchBar>
                        <SearchLabel for="BirdSearch"><HiOutlineSearch /></SearchLabel>
                        <SearchInput type="text" id="BirdSearch" placeholder="Bird Lookup"/>
                    </SearchBar>
                </NavContent>
            </BarTwo>
        </div>
    )
}


const BarOne = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
column-gap: 5px;
padding-right: 40px;
height: 50px;
background-color: whitesmoke;
`

const SignInBox = styled.div`
display: flex;
column-gap: 5px;
padding-top: 7px;
`

const LoginIcon = styled.span`
padding-top: 2px;
font-size: 22px;
`

const LoginText = styled.span`
font-size: 20px;
`

const NavSignIn = styled(NavLink)`
text-decoration: none;
font-size: 22px;

&:hover {
    color: gray;
}
`

const BarTwo = styled.div`
display: flex;
justify-content: space-between;
column-gap: 40px;
height: 100px;
margin: 0px 50px 0px 50px;
`

const TitleBox = styled.div`
display: flex;
column-gap: 10px;
`

const Logo = styled(NavLink)`
text-decoration: none;
align-self: center;
font-size: 60px;
color: black;
`

const BinoBox = styled.span`
display: flex;
align-items: center;
padding-top: 10px;
font-size: 32px;
`

const NavContent = styled.div`
display: flex;
column-gap: 20px;
align-items: flex-end;
margin-bottom: 10px;
`

const NavItem = styled(NavLink)`
text-decoration: none;
font-size: 26px;
color: black;
margin-bottom: 10px;
border-bottom: 3px solid transparent;

&:hover {
    border-bottom: 3px solid navy;
}
`

const SearchBar = styled.span`
display: flex;
column-gap: 7px;
margin-bottom: 3px;
`

const SearchInput = styled.input`
height: 27px;
width: 150px;
border: none;
font-size: 20px;
`
const SearchLabel = styled.label`
align-self: center;
font-size: 30px;
font-weight: bold;
padding-bottom: 0px;
`

export default NavBar;