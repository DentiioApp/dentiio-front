import React from "react";
import ImageGallery from 'react-image-gallery';


const Gallery = (props) => {

    return (
        <ImageGallery items={props.images} />
    )
}

export default Gallery