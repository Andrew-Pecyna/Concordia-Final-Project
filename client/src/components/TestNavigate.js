import { useContext } from "react";
import { UserContext } from "../UserContext";
import { BirdContext } from "../BirdContext";
import NavBar from "./NavBar";

const TestNavigate = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const { birds } = useContext(BirdContext)

    console.log(birds[0])

    currentUser && console.log("current user is set to: " + currentUser.userName)
    return(
        <>
        <NavBar />
        <p>Navigation Test</p>
        </>
    )
}

export default TestNavigate;