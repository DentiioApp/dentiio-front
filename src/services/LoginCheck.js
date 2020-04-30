import axios from 'axios'
import jwtDecode from 'jwt-decode'

const LOGIN_CHECK = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_LOGIN_CHECK

const BEARER = 'Bearer '
const token = localStorage.getItem('authToken')

export const loginCheck = (ident, pswd) => {
  axios.post(LOGIN_CHECK, { username: ident, password: pswd }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      localStorage.setItem('authToken', res.data.token)
    })
    .catch(err => err.message)

  if (token !== undefined) {
    axios.defaults.headers.Authorization = BEARER + token

    return token
  } else {
    return ''
  }
}

export const logout = () => {
  window.localStorage.removeItem('authToken')
  localStorage.clear()
  delete axios.defaults.headers.Authorization
}

// Verifie si un token existe dans le localStorage
export const setup = () => {
  const token = window.localStorage.getItem('authToken')

  if (token) {
    const jwtData = jwtDecode(token)
    if (jwtData.exp * 1000 > new Date().getTime()) {
      axios.defaults.headers.Authorization = BEARER + token
    } else {
      logout()
    }
  } else {
    logout()
  }
}

export default loginCheck
