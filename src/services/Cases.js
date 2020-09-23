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

export const postCase = (values) => {
  let symptome = []
  values.symptome.map((value)=>{
    return symptome.push("/api/symptomes/"+value)
  })

  let treatment = []
  values.treatment.map((value)=>{
    return treatment.push("/api/treatments/"+value)
  })

  let pathologie = []
  values.pathologie.map((value)=>{
    return pathologie.push("/api/pathologies/"+value)
  })

  let keyword = []
  values.keyword.map((value)=>{
    return keyword.push("/api/keywords/"+value)
  })

  const item = {
    age: values.ages,
    smoking: values.isASmoker,
    presentation: values.summary,
    treatmentPlan: "jctttttt",
    observation: values.global_desc,
    evolution: values.evolution,
    conclusion: values.conclusion,
    createdAt: new Date().toISOString(),
    notations: ["/api/notations/"+9754],
  
    isEnabled: true,

    patient:["api/patients/"+values.patient.id],
    symptome: symptome,
    treatment: treatment,
    pathologie: pathologie,
    /*"speciality": ["/api/specialities/"+<number>, /api/specialities/"+<number>],*/
    title: "Titrrreeeeeee",
    slug: "sluuuuuuggguueeee",
    /*
    "imageClinicalCases": [
      "string"
    ],*/
    keyword: keyword
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
