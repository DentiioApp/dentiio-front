import axios from 'axios'

const REGISTER_CHECK = process.env.REACT_APP_REGISTER_CHECK

const response = localStorage.getItem('authSubscribe')

export const registerCheck = (user) => {
  axios.post(REGISTER_CHECK, user)
    .then(res => localStorage.setItem('authSubscribe', res.status))

  return response
}

export default registerCheck
