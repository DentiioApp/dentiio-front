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

export const fetchKeywords = async () => {
  let responses = await axios
    .get(KEYWORDS)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))

  return responses = responses.datas === undefined ? [] : responses
}

export const fetchSpecialities = () => {
  const responses = axios
    .get(SPECIALITIES)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return responses
}

export const fetchTreatments = () => {
  const responses = axios
    .get(TREATMENTS)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return responses
}

export const fetchPathologies = () => {
  const responses = axios
    .get(PATHOLOGIES)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return responses
}

export const fetchSymptomes = () => {
  const responses = axios
    .get(SYMPTOMES)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return responses
}
