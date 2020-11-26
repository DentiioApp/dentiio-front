import axios from 'axios'
import { favOrCase } from '../utils'

const CLINICAL_CASES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES

const FAVORITES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_FAVORITES

const CLINICAL_CASES_BY_USER =
    process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS

export const fetchCases = (page = 1) => {
  return axios
    .get(CLINICAL_CASES + '?page=' + page)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member'],
      items: res.data['hydra:totalItems']
    }))
    .catch((e) => JSON.stringify(e))
}

export const addFavCase = async (data, userId) => {
  const item = {
    userId: '/api/users/' + userId,
    clinicalCaseId: data['@id'],
    createdAt: new Date().toISOString()
  }
  let responses = await axios
    .post(FAVORITES, item)
    .then((res) => ({
      datas: res.status
    }))
    .catch((e) => JSON.stringify(e))
  return responses.datas !== 201 ? 'Error' : 'Created'
}

export const removeFavCase = async (data, userId) => {
  const allFavCase = await fetchUserFav(userId)

  const favMatch = allFavCase.datas.filter((fav) => {
    let caseId = favOrCase(fav)
    return caseId === data.id
  })

  const favId = favMatch[0].id

  const responses = await axios
    .delete(FAVORITES + '/' + favId)
    .then((res) => ({
      datas: res.status
    }))
    .catch((e) => JSON.stringify(e))

  return responses.datas
}

export const getCaseById = (id) => {
  return axios
    .get(CLINICAL_CASES + '/' + id)
    .then((res) => ({
      message: 'OK',
      datas: res.data
    }))
    .catch((e) => JSON.stringify(e))
}

export const getCaseByUserId = (id) => {
  return axios
    .get(CLINICAL_CASES_BY_USER + '/' + id + '/' + process.env.REACT_APP_CLINICAL_CASES)
    .then((res) => ({
      message: 'OK',
      datas: res.data
    }))
    .catch((e) => JSON.stringify(e))
}

export const fetchUserFav = (userId) => {
  const USERFAVORITES =
    process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS + '/' + userId + '/' + process.env.REACT_APP_FAVORITES

  return axios
    .get(USERFAVORITES)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
}

export const postCase = (values, patient) => {
  const item = {
    age: values.ages,
    smoking: values.isASmoker,
    /* drinking: values.isDrinker, */
    presentation: values.summary,
    treatmentPlan: 'Plan de traitement',
    observation: values.global_desc,
    evolution: values.evolution,
    conclusion: values.conclusion,
    createdAt: new Date().toISOString(),

    isEnabled: true,

    patient: { patient },
    symptome: values.symptomes,
    treatment: values.treatment,
    pathologie: values.pathologie,
    speciality: values.specialities,
    title: values.title,
    slug: '/',
    /*
    "imageClinicalCases": [
      "string"
    ], */
    keyword: values.keywords
  }

  return axios
    .post(CLINICAL_CASES, item)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
}
