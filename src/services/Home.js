import axios from 'axios'

const KEYWORDS =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_KEYWORDS

const SPECIALITIES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_SPECIALITIES

const TREATMENTS =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_TREATMENTS

const PATHOLOGIES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_PATHOLOGIES

const SYMPTOMES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_SYMPTOMES

export const fetchKeywords = () => {
  const reponses = axios
    .get(KEYWORDS)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}

export const fetchSpecialities = () => {
  const reponses = axios
    .get(SPECIALITIES)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}

export const fetchTreatments = () => {
  const reponses = axios
    .get(TREATMENTS)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}

export const fetchPathologies = () => {
  const reponses = axios
    .get(PATHOLOGIES)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}

export const fetchSymptomes = () => {
  const reponses = axios
    .get(SYMPTOMES)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}

export const tryKeywords = () => {
  const fetchDatas = fetchKeywords()

  if (fetchDatas.datas === undefined) {
    fetchDatas.datas = []
  }

  return fetchDatas
}
