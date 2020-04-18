import axios from 'axios'
export const CASES_LIST = 'CASES_LIST'

export const CLINICAL_CASES = 'http://localhost/api/clinical_cases'

export const getCases = () => {
  return (dispatch) => {
    return axios.get(CLINICAL_CASES)
      .then(res => {
        dispatch({ type: CASES_LIST, datas: res.data['hydra:member'] })
      })
      .catch(err => err)
  }
}
