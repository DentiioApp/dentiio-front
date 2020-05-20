import { useState } from 'react'
import axios from 'axios'
export const CASES_LIST = 'CASES_LIST'

export const CLINICAL_CASES = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_CLINICAL_CASES

export const GetCases = () => {
  const [cases, setCases] = useState('')

  axios.get(CLINICAL_CASES)
    .then(res => setCases(res.data['hydra:member']))
    .catch(err => err)
  return ({
    type: CASES_LIST,
    datas: cases
  })
}

export default GetCases
