import axios from 'axios'

const JOBS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_JOBS

export const fetchJobs = async () => {
  var responses = await axios
    .get(JOBS)
    .then((res) => ({
      message: 'OK',
      datas: res.data['hydra:member']
    }))
    .catch((e) => JSON.stringify(e))

  return responses = responses.datas === undefined ? {} : responses
}
