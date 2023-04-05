import styled from "styled-components";
import { HiOutlineSearch } from "react-icons/hi";

const SearchBar = ({ keyWord, onChange }) => {

    return (
        <Container>
            <SearchLabel htmlFor="BirdSearch"><HiOutlineSearch /></SearchLabel>
            <SearchInput type="text" id="BirdSearch" value={keyWord} placeholder="Bird Lookup" onChange={(event) => onChange(event.target.value)}/>
        </Container>
    )
}

const Container = styled.span`
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

export default SearchBar;