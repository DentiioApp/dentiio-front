import {
  CASES_LIST,
  SET_EXAM_PICS,
  UPDATE_EXAM_PICS,
  DROP_EXAM_PICS,
  DEL_EXAM_PICS,
  SET_TREAT_PICS,
  UPDATE_TREAT_PICS,
  DROP_TREAT_PICS,
  DEL_TREAT_PICS,
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

export const format_file = async (aFiles = [], dispatch, pics = [], type) => {
  let newPics = [];
  let action = {
   'EXAM' : {'drop': DROP_EXAM_PICS, 'del': DEL_EXAM_PICS, 'set': SET_EXAM_PICS, 'update': UPDATE_EXAM_PICS},
   'TREAT': {'drop': DROP_TREAT_PICS, 'del': DEL_TREAT_PICS , 'set': SET_TREAT_PICS, 'update': UPDATE_TREAT_PICS}
  }
  if(aFiles.length < pics.length) {
    if(aFiles.length < 1) {
      dispatch({ type: action[type].drop})
    } else {
      let new_paths = [];
      aFiles.forEach((item)=> {new_paths.push(item.path)})
      newPics = pics.filter((f)=>(
        new_paths.includes(f.path)
      ));
      dispatch({ type: action[type].update, 'datas': newPics})
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

  pics.forEach((oImage)=>{
    img_names.push(oImage.name)
  })

  aFiles.forEach((file, index) => {
    Main(file).then((resp_64) => {
      if(!img_names.includes(file.name) && newPics.length === 0) {
        dispatch({ type: action[type].set, data: { name: file.name, _img: resp_64, path: file.path, type: file.name.split('.').pop() } })
      }
    })
  });

}

export const post_images = async (files, id_clinical_omni, type) => {
  let incre_index_img = 0;
  let stop = false;
  let IS_PRINCIPAL = false;

  let intervalID = setInterval(() => {
    if (incre_index_img < files.length) {
      IS_PRINCIPAL = incre_index_img === 0 ? true : false;

      insertImage(files[incre_index_img], id_clinical_omni, IS_PRINCIPAL, type)
      incre_index_img += 1;
    } else {
      stop = true;
    }

    if (stop) clearInterval(intervalID);

  }, 2000)
}

