import styled from "styled-components";
import NavBar from "./NavBar";

const LandingPage = () => {

    return (
        <div>
            <NavBar />
            <BannerImage />
            <OwlText>Short-eared owl in flight.</OwlText>
            <MainTextBox>
                <MainText>Build your own birding community</MainText>
                <Description>Log sightings, share photos, and collect birds - all in one place</Description>
                <Button>Get Started</Button>
            </MainTextBox>
        </div>
    )
}


const BannerImage = styled.div`
background-image: url("./images/owl_in_flight.jpg");
height: 681px;
background-size: cover;
background-position: right 55% top 30%;
`

const OwlText = styled.p`
position: absolute;
top: 160px;
right: 0px;
color: white;
background-color: rgba(0, 0, 0, 0.5);
width: 185px;
padding: 2px 10px;
`

const MainTextBox = styled.div`
position: absolute;
text-align: center;
top:325px;
left: 50px;
/* background-color: rgba(0, 0, 0, 0.5); */
border-radius: 5px;
height: 390px;
width: 500px;
border: 3px solid navy;
`

const MainText = styled.p`
color: white;
font-size: 40px;
padding: 35px 20px;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
`

const Description = styled.div`
font-size: 22px;
color: white;
padding: 5px 20px;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;
`

const Button = styled.button`
/* padding: 12px 40px; */
padding: 10px 50px;
margin-top: 30px;
border-radius: 30px;
font-size: 20px;
color: white;
background-color: transparent;
border: 2px solid white;
font-family: 'Helvetica', Arial, Helvetica, sans-serif;

&:hover {
    background-color: white;
    color: dodgerblue;
}

&:active {
    transform: scale(.99)
}
`

export default LandingPage;