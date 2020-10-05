import axios from 'axios'

const CAT_PATHOLOGIES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CAT_PATHOLOGIES

const fetchCatPathologiesData = () => {
  return axios
    .get(CAT_PATHOLOGIES)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
}

export default fetchCatPathologiesData
