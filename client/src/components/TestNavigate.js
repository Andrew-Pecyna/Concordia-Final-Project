import { useContext } from "react";
import { UserContext } from "../UserContext";
import NavBar from "./NavBar";

const TestNavigate = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext)

    console.log("current user is set to: " + currentUser.userName)
    return(
        <>
        <NavBar />
        <p>Navigation Test</p>
        </>
    )
}

export default TestNavigate