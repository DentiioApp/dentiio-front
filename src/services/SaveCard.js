import axios from 'axios'

const USERS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS

export const SaveCard = (userData) => {
  // const imgTo64 = btoa(userData.url)
  // ...
  return axios.put(USERS, userData)
    .then(res => res.statusText)
    .catch(console.warning)
}
