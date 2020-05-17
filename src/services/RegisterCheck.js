import axios from 'axios'

const REGISTER_CHECK = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_REGISTER_CHECK

const response = localStorage.getItem('authSubscribeMsg')

export const registerCheck = (user) => {
  axios.post(REGISTER_CHECK, user)
    .then(res => localStorage.setItem('authSubscribeMsg', res.statusText))

  return response
}

export default registerCheck
