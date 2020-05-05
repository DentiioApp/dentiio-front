import axios from 'axios'

export const CASES_LIST = 'CASES_LIST'
export const CLINICAL_CASES = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES

export const casesServices = { fetchCases }

function fetchCases () {
  return axios.get(CLINICAL_CASES)
    .then(res => res || {})
    .catch(console.warning)
}
