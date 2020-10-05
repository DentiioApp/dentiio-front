import axios from 'axios'

const PATHOLOGIES =
    process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_PATHOLOGIES

const fetchPathologiesData = () => {
  return axios
    .get(PATHOLOGIES)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
}

export default fetchPathologiesData
