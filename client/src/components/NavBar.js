import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import { FaBinoculars } from "react-icons/fa";
import LoginButton from './LoginButton';
import LogoutButton from "./LogoutButton";
// import { AiOutlineUser } from "react-icons/ai";

const NavBar = () => {

    return (
        <div>
            <BarOne>
                <HeaderPhrase>
                    <p>"What's that bird?" - Ask others in the community forum!</p>
                </HeaderPhrase>
                <LoginBox>
                    <LoginButton />
                    <LogoutButton />
                </LoginBox>
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
                        <SearchLabel htmlFor="BirdSearch"><HiOutlineSearch /></SearchLabel>
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
justify-content: center;
column-gap: 5px;
padding-right: 40px;
height: 50px;
background-color: whitesmoke;
border-bottom: 2px solid gainsboro;
`

const HeaderPhrase = styled.div`
color: gray;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
font-weight: bold;
padding-top: 7px;
padding-right: 100px;
padding-left: 100px;
`

const LoginBox = styled.div`
position: absolute;
right: 40px;
`

const BarTwo = styled.div`
display: flex;
justify-content: space-between;
column-gap: 40px;
height: 100px;
padding: 0px 50px 0px 50px;
border-bottom: 2px solid navy;
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
font-size: 23px;
`
const SearchLabel = styled.label`
align-self: center;
font-size: 30px;
font-weight: bold;
padding-bottom: 0px;
`

export default NavBar;