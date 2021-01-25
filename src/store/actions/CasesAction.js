import {
  CASES_LIST,
  SET_EXAM_PICS,
  OPEN_SIDE_BAR,
  CLOSE_SIDE_BAR,
} from '.'

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
    Main(file).then((res_64) => {
      dispatch({type: SET_EXAM_PICS, data: {name : file.name,  _img : res_64  }})
    })
  });

}

