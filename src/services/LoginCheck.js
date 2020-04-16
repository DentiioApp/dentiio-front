import axios from 'axios'
import jwt_decode from 'jwt-decode'

const LOGIN_CHECK = 'http://localhost:8080/api/login_check'
const token = localStorage.getItem('authToken')

export const loginCheck = (ident, pswd) => {
  var Bearer = 'Bearer '

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
    axios.defaults.headers.Authorization = Bearer + token

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
    const jwtData = jwt_decode(token)
    if (jwtData.exp * 1000 > new Date().getTime()) {
      axios.defaults.headers.Authorization = token
    } else {
      logout()
    }
  } else {
    logout()
  }
}

export default loginCheck
