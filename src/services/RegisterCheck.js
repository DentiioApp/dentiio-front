import axios from 'axios'

const USERS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS

const response = localStorage.getItem('authSubscribeMsg')

export const registerCheck = (user) => {
  axios.post(USERS, user)
    .then(res => localStorage.setItem('authSubscribeMsg', res.statusText))

  return response
}

export default registerCheck
