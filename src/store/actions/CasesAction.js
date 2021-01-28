import {
  CASES_LIST,
  SET_EXAM_PICS,
  DROP_EXAM_PICS,
  DEL_EXAM_PICS,
  OPEN_SIDE_BAR,
  CLOSE_SIDE_BAR,
} from '.'

import { insertImage } from '../../services/Cases'

export const caseItem = (oCase) => { return { type: CASES_LIST, iCase: oCase.id } }
export const openSideBar = () => {
  return { type: OPEN_SIDE_BAR }
}
export const closeSideBar = () => {
  return { type: CLOSE_SIDE_BAR }
}

export const format_file = async (aFile, dispatch, exam_pics) => {

  if(aFile.length < exam_pics.length) {
    if(aFile.length < 1) {
      dispatch({ type: DROP_EXAM_PICS})
    } else {
      dispatch({ type: DEL_EXAM_PICS})
    }
  }


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

  let img_names = []

  exam_pics.forEach((oImage)=>{
    img_names.push(oImage.name)
  })

  aFile.forEach((file, index) => {
    Main(file).then((resp_64) => {
      if(!img_names.includes(file.name)) {
        dispatch({ type: SET_EXAM_PICS, data: { name: file.name, _img: resp_64, path: file.path, type: file.name.split('.').pop() } })
      }
    })
  });

}

export const post_images = async (files, id_clinical_omni) => {
  let incre_index_img = 0;
  let stop = false;
  let IS_PRINCIPAL = false;

  let intervalID = setInterval(() => {
    if (incre_index_img < files.length) {
      IS_PRINCIPAL = incre_index_img === 0 ? true : false;

      insertImage(files[incre_index_img], id_clinical_omni, IS_PRINCIPAL)
      incre_index_img += 1;
    } else {
      stop = true;
    }

    if (stop) clearInterval(intervalID);

  }, 2000)
}

