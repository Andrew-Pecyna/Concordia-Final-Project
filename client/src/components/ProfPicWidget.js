import { useEffect, useRef } from "react";
import styled from "styled-components";
import { IoCameraSharp } from "react-icons/io5";

const ProfPicWidget = ({ setImage }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dciwywexh',
            uploadPreset: 'ytssaned'}, (error, result) => {
            if (result.info.url) {
                setImage(result.info.url)
            }
        })

    }, [])

    return (
        <Button onClick={() => widgetRef.current.open()}>
            <IoCameraSharp />
        </Button>
    )
};

const Button = styled.button`
position: relative;
top: -30px;
left: -20px;
height: 20px;
font-size: 20px;
font-weight: 100;
padding: 8px 10px 28px 10px;
border: 1px solid black;
border-radius: 50%;
background-color: transparent;

&:hover {
    background-color: whitesmoke;
}

&:active {
    transform: scale(.95);
}
`

export default ProfPicWidget;