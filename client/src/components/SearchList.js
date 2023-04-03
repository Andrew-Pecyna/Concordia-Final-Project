import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchList = ({filteredSearch}) => {

    const searchArray = filteredSearch

    return (
        searchArray.length > 0 &&
        <ListBox>
            <ul>
                {searchArray.map((each) => {
                    return (
                        <StyledLink to={`/singleBird/${each.name}`} key={each.name}>
                            <Item>{each.name}</Item>
                        </StyledLink>
                    )
                })}
            </ul>
        </ListBox>
    )
}

const ListBox = styled.div`
background-color: whitesmoke;
max-height: 300px;
overflow: scroll;
border: 1px solid black;
`

const StyledLink = styled(Link)`
text-decoration: none;
`

const Item = styled.li`
padding: 7px 5px;

&:hover {
    background-color: gainsboro;
}
`

export default SearchList;
