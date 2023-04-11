import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { FaBinoculars } from "react-icons/fa";
import LoginButton from './LoginButton';
import LogoutButton from "./LogoutButton";
import SearchBar from './SearchBar';
import { BirdContext } from "../BirdContext";
import SearchList from './SearchList';

const NavBar = ({resetKeyWord}) => {

    const { birds } = useContext(BirdContext)
    const [keyWord, setKeyWord] = useState("")
    const [filteredSearch, setFilteredSearch] = useState("")

        const updateKeyword = (keyWord) => {
            const filtered = birds.filter((bird) => {
                return bird.name.toLowerCase().includes(keyWord.toLowerCase())
            })
            setKeyWord(keyWord)
            keyWord.length === 0 ? setFilteredSearch([]) : setFilteredSearch(filtered)
        }

        useEffect(() => {
            setKeyWord("")
            setFilteredSearch("")
        }, [resetKeyWord])

    return (
        !birds ? <p>Loading...</p> :
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
                    <NavItem to="/forum">Forum</NavItem>
                    <ExploreLink to="/birds">Explore Birds</ExploreLink>
                    <SearchBar keyWord={keyWord} onChange={updateKeyword}/>
                    <SearchWrapper>
                        {filteredSearch && <SearchList filteredSearch={filteredSearch}/>}
                    </SearchWrapper>
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

const ExploreLink = styled(NavLink)`
text-decoration: none;
font-size: 26px;
color: black;
width: 146px;
margin-bottom: 10px;
border-bottom: 3px solid transparent;

&:hover {
    border-bottom: 3px solid navy;
}
`

// media query - switch search position with forum
const SearchWrapper = styled.span`
background-color: gainsboro;
position: absolute;
z-index: 1;
width: 173px;
top: 130px;
right: 49px;
`

export default NavBar;