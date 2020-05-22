import axios from 'axios';

export const USERS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS

export const SaveCard = (user) => {
  return axios.put(USERS, user)
    .then(res => res.statusText)
    .catch(console.warning)
}
