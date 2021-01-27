import axios from 'axios'

const PATIENTS =
  process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_PATIENTS

export const postPatient = (values) => {
  const item = {
    age: values.age,
    gender: values.gender,
    isASmoker: values.isASmoker,
    isDrinker: values.isDrinker,
    allergie: values.allergies,
    problemHealth: values.problem_health,
    inTreatment: values.treatments,
    reasonConsult: values.reason_consultation,
  }

  const reponses = axios
    .post(PATIENTS, item)
    .then((res) => ({
      message: 'OK',
      datas: res.data
    }))
    .catch((e) => JSON.stringify(e))

  return reponses
}
