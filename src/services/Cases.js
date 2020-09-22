import axios from 'axios'

const CLINICAL_CASES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES
const FAVORITES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_FAVORITES

export const fetchCases = (signal) => {
  const reponses = axios
    .get(CLINICAL_CASES, { signal: signal })
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}

export const tryCases = () => {
  const fetchDatas = fetchCases()

  if (fetchDatas.datas === undefined) {
    fetchDatas.datas = []
  }

  return fetchDatas
}

export const addFavCase = (iUser, iItem) => {
  const reponses = axios
    .post(FAVORITES, { userId: iUser, clinicalCaseId: iItem })
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}

export const postCase = (item) => {
    const reponses = axios
      .post(CLINICAL_CASES, item)
      .then((res) => ({
        message: 'OK',
        datas: res.data['hydra:member']
      }))
      .catch((e) => JSON.stringify(e))
    return reponses
  }

export const getCaseById = (id) => {
    const reponses = axios
        .get(CLINICAL_CASES+"/"+id)
        .then((res) => ({
            message: 'OK',
            datas: res.data
        }))
        .catch((e) => JSON.stringify(e))
    return reponses
}
