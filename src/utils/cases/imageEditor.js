import mergeImages from 'merge-images';
import censoring_img from '.svg'

var CENSORED_IMG = [{ src: censoring_img, x: 0, y: 0 }];
let array_to_merge = [];
export const imageEditor = async (images, aCoordonne = CENSORED_IMG) => {
  /** PERMET DE COLLER DES IMAGES LES UNE SUR LES AUTRES A DES COORDONNÉE ET GÉNÉREER LE B64  */
  aCoordonne.forEach(element => {
    array_to_merge.push()
  },(arr)=>{
    console.log('arr :',arr )
  }).mergeImages([
    { src: censoring_img, x: 0, y: 0 },
    { src: 'http://localhost:3000/logo192.png', x: 32, y: 0 },
    { src: 'http://localhost:3000/logo512.png', x: 16, y: 0 }
  ])
    .then((b64) => b64)

}
