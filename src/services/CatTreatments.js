import axios from 'axios'

const CAT_TREATMENTS =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CAT_TREATMENTS

const fetchCatTreatmentsData = () => {
  return axios
    .get(CAT_TREATMENTS)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
}

export default fetchCatTreatmentsData
