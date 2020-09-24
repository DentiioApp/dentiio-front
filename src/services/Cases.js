import axios from 'axios'

const CLINICAL_CASES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES

const FAVORITES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_FAVORITES

const CLINICAL_CASES_BY_USER =
    process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS

export const fetchCases = (page) => {
  const reponses = axios
    .get(CLINICAL_CASES + '?page=' + page)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member'],
      items: res.data['hydra:totalItems']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}

export const addFavCase = (data, userId) => {
  const item = {
    userId: '/api/users/' + userId,
    clinicalCaseId: data['@id'],
    createdAt: new Date().toISOString()
  }
  const reponses = axios
    .post(FAVORITES, item)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}

export const getCaseById = (id) => {
  const reponses = axios
    .get(CLINICAL_CASES + '/' + id)
    .then((res) => ({
      message: 'OK',
      datas: res.data
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}

export const getCaseByUserId = (id) => {
    const reponses = axios
        .get(CLINICAL_CASES_BY_USER + '/' + id + '/' + process.env.REACT_APP_CLINICAL_CASES)
        .then((res) => ({
            message: 'OK',
            datas: res.data
        }))
        .catch((e) => JSON.stringify(e))
    return reponses
}

export const fetchUserFav = (userId) => {
  const USERFAVORITES =
    process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS + '/' + userId + '/' + process.env.REACT_APP_FAVORITES

  const reponses = axios
    .get(USERFAVORITES)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}

export const postCase = (values, patient) => {
  const item = {
    age: values.ages,
    smoking: values.isASmoker,
    presentation: values.summary,
    treatmentPlan: 'jctttttt',
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

  const reponses = axios
    .post(CLINICAL_CASES, item)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return reponses
}
