import {
  CASES_LIST,
  SET_EXAM_PICS,
  OPEN_SIDE_BAR,
  CLOSE_SIDE_BAR,
} from '.'

import {insertImage} from '../../services/Cases'

export const caseItem = (oCase) => { return { type: CASES_LIST, iCase: oCase.id } }
export const openSideBar = () => {
  return { type: OPEN_SIDE_BAR }
}
export const closeSideBar = () => {
  return { type: CLOSE_SIDE_BAR }
}

export const format_file = async (aFile, dispatch) => {
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const Main = async (file) => {
    let b64 = await toBase64(file);
    return b64
  }

  aFile.forEach((file, index) => {
    Main(file).then((resp_64) => {
      dispatch({type: SET_EXAM_PICS, data: {name : file.name,  _img : resp_64, path: file.path, type: file.name.split('.').pop() }})
    })
  });

}

export const  insert_image = async(files) => {
  files.forEach((image, step)=>{
    insertImage(image)
  })
}

