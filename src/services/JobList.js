import axios from 'axios'

const JOBS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_JOBS

export const fetchJobs = () => {
  return axios.get(JOBS)
    .then(res => res.data['hydra:member'])
    .catch(console.warning)
}
