import axios from 'axios'

const PATIENTS =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_PATIENTS


export const postPatient= (item) => {
  const reponses = axios
    .post(PATIENTS, item)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}
