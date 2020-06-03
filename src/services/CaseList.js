import axios from 'axios'

const CLINICAL_CASES = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES

export const fetchCases = (signal) => {
  return axios.get(CLINICAL_CASES, { signal: signal })
    .then(res => res.data['hydra:member'])
    .catch(console.warning)
}
