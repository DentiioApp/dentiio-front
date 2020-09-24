import axios from 'axios'

const CLINICAL_CASES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES
const FAVORITES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_FAVORITES

const USERFAVORITES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS + '/1/' +process.env.REACT_APP_FAVORITES

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

export const addFavCase = (data) => {
  //const user = jwtDecode(localStorage.getItem('authToken'))
  const item = {
    // userId: user['@id'],
    userId: "api/users/1",
    clinicalCaseId: data['@id'],
    createdAt: new Date().toISOString(),
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
        .get(CLINICAL_CASES + "/" + id)
        .then((res) => ({
            message: 'OK',
            datas: res.data
        }))
        .catch((e) => JSON.stringify(e))
    return reponses
}

export const fetchUserFav = () => {
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
    notations: ['/api/notations/' + 1],

    isEnabled: true,

    patient: {patient},
    symptome: values.symptomes,
    treatment: values.treatment,
    pathologie: values.pathologie,
    /* "speciality": ["/api/specialities/"+<number>, /api/specialities/"+<number>], */
    title: values.title, //
    slug: 'sluuuuuuggguueeee',
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
