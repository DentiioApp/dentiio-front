import axios from 'axios'

const USERS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS

export const SaveCard = (userData) => {
  return axios.put(USERS, userData)
    .then(res => res.statusText)
    .catch(console.warning)
}
