import axios from 'axios'
import CASES_LIST from '.'
const CLINICAL_CASES = 'http://localhost/api/clinical_cases'

export const getCases = () => {
  return (dispatch) => {
    return axios.get(CLINICAL_CASES)
      .then(res => {
        dispatch({ type: CASES_LIST, datas: res.data['hydra:member'] })
      })
      .catch(err => err)
  }
}