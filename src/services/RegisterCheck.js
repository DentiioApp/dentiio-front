import axios from 'axios'

const REGISTER_CHECK = 'http://localhost/api/users'
const response = localStorage.getItem('authSubscribe')

export const registerCheck = (user) => {
  axios.post(REGISTER_CHECK, user)
    .then(res => {
      if (res === 404) {
        return 'Une erreur est survenu à l\'inscription'
      } else {
        localStorage.setItem('authSubscribe', res.status)
      }
    })
  return response
}

export default registerCheck
