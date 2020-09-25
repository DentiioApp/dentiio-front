import axios from 'axios'

const SPECILITIES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_SPECIALITIES

const fetchSpecialitesData = () => {
  const reponses = axios
    .get(SPECILITIES)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}

export default fetchSpecialitesData
