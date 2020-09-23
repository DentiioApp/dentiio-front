import axios from 'axios'

const CLINICAL_CASES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES
const FAVORITES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_FAVORITES

export const fetchCases = () => {
  const reponses = axios
    .get(CLINICAL_CASES)
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

export const postCase = (values, patient) => {
  const item = {
    age: values.ages, //
    smoking: values.isASmoker, //
    presentation: values.summary,
    treatmentPlan: 'jctttttt', //
    observation: values.global_desc,
    evolution: values.evolution, //
    conclusion: values.conclusion, //
    createdAt: new Date().toISOString(), //
    notations: ['/api/notations/' + 1], //

    isEnabled: true,

    patient: patient,
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
