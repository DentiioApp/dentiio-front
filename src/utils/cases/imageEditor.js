import mergeImages from 'merge-images';
import { IMAGE_EXAM_EDITION, IMAGE_TREAT_EDITION } from '../../store/actions'

var array_to_merge = [];

export const ModifyImage = async (censor_points, imageTodo, currentImgIndex, dispatch, type) => {
  let action = {
    'EXAM': IMAGE_EXAM_EDITION,
    'TREAT': IMAGE_TREAT_EDITION,
  }

  array_to_merge = [
    { 'src': imageTodo, x: 0, y: 0 }
  ].concat(censor_points)
  
  console.log('ARRAY MERGE IMAGES :', array_to_merge)
  /** PERMET DE COLLER DES IMAGES LES UNE SUR LES AUTRES A DES COORDONNÉE ET GÉNÉREER LE B64  */
  return await mergeImages(array_to_merge)
    .then((b64) => dispatch({ type: action[type], _img: b64, currentImgIndex: currentImgIndex }))

}

