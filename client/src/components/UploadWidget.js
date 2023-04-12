import { useEffect, useRef } from "react";
import styled from "styled-components";
import { SlPicture } from "react-icons/sl";

const UploadWidget = ({ setImage }) => {
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
            <SlPicture />
        </Button>
    )
};

const Button = styled.button`
font-size: 35px;
color: gray;
padding-bottom: 0px;
padding-top: 5px;
margin-bottom: 0px;
background-color: transparent;
border: none;

&:hover {
    color: silver;
}
`

export default UploadWidget;