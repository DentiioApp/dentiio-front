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

export const postCase = (/*item*/) => {

  const item = {
    age: 0,
    smoking: true,
    presentation: "hgkgkhg",
    treatmentPlan: "jctttttt",
    observation: "zzzzzzz",
    evolution: "aaaaaaaa",
    conclusion: "ssssssssssss",
    createdAt: "2020-09-22T09:09:37.518Z",
    notations: ["/api/notations/"+9754],
  
    isEnabled: true,
    patient: {
      age: 0,
      gender: "Monsieur",
      isASmoker: true,
      isMedicalBackground: true,
      problemHealth: "yes",
      inTreatment: "yes"
    },
    symptome: ["/api/symptomes/"+66],
    treatment: ["/api/treatments/"+40],
    pathologie: ["/api/pathologies/"+40],
    /*"speciality": ["/api/specialities/"+<number>, /api/specialities/"+<number>],*/
    title: "Titrrreeeeeee",
    slug: "sluuuuuuggguueeee",
    /*
    "imageClinicalCases": [
      "string"
    ],*/
    keyword: ["/api/keywords/"+66]
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
