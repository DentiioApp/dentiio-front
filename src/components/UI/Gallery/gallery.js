import React from "react";
import ImageGallery from 'react-image-gallery';

const images = [
    {
        original: 'https://dr-demonchaux-thierry.chirurgiens-dentistes.fr/wp-content/uploads/Encombrement-anterieur-Avant-Cas-Clinique.jpg',
        thumbnail: 'https://dr-demonchaux-thierry.chirurgiens-dentistes.fr/wp-content/uploads/Encombrement-anterieur-Avant-Cas-Clinique.jpg',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

const Gallery = () => {

    return (
        <ImageGallery items={images} />
    )
}

export default Gallery