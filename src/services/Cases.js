import axios from 'axios'

const CLINICAL_CASES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES

const FAVORITES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_FAVORITES

const CLINICAL_CASES_BY_USER =
    process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS

export const fetchCases = (page = 1) => {
  let responses = axios
    .get(CLINICAL_CASES + '?page=' + page)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member'],
      items: res.data['hydra:totalItems']
    }))
    .catch((e) => JSON.stringify(e))
  return responses
}

export const addFavCase = (data, userId) => {
  let item = {
    userId: '/api/users/' + userId,
    clinicalCaseId: data['@id'],
    createdAt: new Date().toISOString()
  }
  let responses = axios
    .post(FAVORITES, item)
    .then((res) => ({
      datas: res.status
    }))
    .catch((e) => JSON.stringify(e))
console.log('TEST :', responses)
  return responses = responses.datas !== 201 ? 'Error' : 'Created'
}

export const removeFavCase = async (data, userId) => {
  let allFavCase = await fetchUserFav(userId)

  let favMatch =  allFavCase.datas.filter((fav)=>{
    //On compare l'id du cas clinique dans la chaine de caractère de la clé clinicalCaseId  du favorie 
    let slashIndex = fav.clinicalCaseId !== undefined ? fav.clinicalCaseId.lastIndexOf('/') : false;
    let caseId = slashIndex ? Number(fav.clinicalCaseId.substr(slashIndex).substr(1, slashIndex.length)) : 0;
     //et l'id du cas clinique passé en paramettre 
    return caseId === data.id 
  })

  let favId = favMatch[0].id

  let responses = await axios
    .delete(FAVORITES + '/' + favId)
    .then((res) => ({
      datas: res.status
    }))
    .catch((e) => JSON.stringify(e))

  return responses.datas
}

export const getCaseById = (id) => {
  let responses = axios
    .get(CLINICAL_CASES + '/' + id)
    .then((res) => ({
      message: 'OK',
      datas: res.data
    }))
    .catch((e) => JSON.stringify(e))
  return responses
}

export const getCaseByUserId = (id) => {
  let responses = axios
    .get(CLINICAL_CASES_BY_USER + '/' + id + '/' + process.env.REACT_APP_CLINICAL_CASES)
    .then((res) => ({
      message: 'OK',
      datas: res.data
    }))
    .catch((e) => JSON.stringify(e))
  return responses
}

export const fetchUserFav = (userId) => {
  const USERFAVORITES =
    process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS + '/' + userId + '/' + process.env.REACT_APP_FAVORITES

  let responses = axios
    .get(USERFAVORITES)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return responses
}

export const postCase = (values, patient) => {
  let item = {
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

  let responses = axios
    .post(CLINICAL_CASES, item)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))
  return responses
}
