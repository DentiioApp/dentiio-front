import axios from 'axios';
import { favOrCase } from '../utils';
import {EXAM_TYPE} from '../store/actions';
import jwtDecode from 'jwt-decode';

const CLINICAL_CASES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES;

const FAVORITES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_FAVORITES;

const CLINICAL_CASES_BY_USER =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS;

const IMAGE_CLINICAL_CASES =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_IMAGE_CLINICAL_CASES;

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

export const setNotenabled = async (caseId) => {
  return await axios
      .put(CLINICAL_CASES + '/' + caseId, {isEnable: false})
      .then((res) => ({
        datas: res.status
      }))
      .catch((e) => JSON.stringify(e))
}

export const addFavCase = async (data, userId) => {
  const item = {
    userId: '/api/users/' + userId,
    createdAt: new Date().toISOString(),
    clinicalCaseOmnipratique: data['@id']
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
//  console.table([{'patient.patient :' :jwtDecode(localStorage.getItem('authToken'))}])
  const details = jwtDecode(localStorage.getItem('authToken'))
  const item = {
    title: values.title,
    patient: patient,
    createdAt: new Date().toISOString(),
    user: `/api/users/${details.userId}`,
    ExamDescription: values.summary,
    // age: values.ages,
    // smoking: values.isASmoker,
    /* drinking: values.isDrinker, */
    presentation: values.summary,
    observation: values.global_desc,
    evolution: values.evolution,
    conclusion: values.conclusion,

    isEnable: true,
    TreatmentDescription: values.treatment_desc,
    symptome: values.symptomes,
    treatment: values.treatment,
    pathologie: values.pathologie,
    speciality: values.specialities,
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
      datas: res.data
    }))
    .catch((e) => JSON.stringify(e))

  return reponses

}


export const insertImage = async (img_datas, id_clinical_omni, is_principal, type) => {
  let typeImgCaseOmni = EXAM_TYPE === type ? 'examen' : 'treatment';

  const updateClinicCase = {
    "type": typeImgCaseOmni, //img_datas.type.toUpperCase()
    "clinicalsCaseOmnipratique": id_clinical_omni,
    "path": 'images/'+id_clinical_omni + img_datas.path,
    "image64" : img_datas._img,
    "isPrincipal": is_principal
  }
  
  axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('authToken')

  return await axios
    .post(IMAGE_CLINICAL_CASES , updateClinicCase)
    .then((res) => {
      return { message: 'OK', datas: res.data }
    })
    .catch(error => {
      return ({ valid: false, datas: error.response && error.response.data["hydra:description"] })
    })
}



