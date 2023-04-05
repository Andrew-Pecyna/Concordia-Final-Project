import { useEffect, useRef } from "react";
import styled from "styled-components";

const UploadWidget = ({ setImage }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dciwywexh',
            uploadPreset: 'ytssaned'}, (error, result) => {
            console.log("My POST : " + result.info.url)
            if (result.info.url) {
                setImage(result.info.url)
            }
        })

    }, [])

    return (
        <Button onClick={() => widgetRef.current.open()}>
            UPLOAD
        </Button>
    )
};

const Button = styled.button`
height: 36px;
`

export default UploadWidget;