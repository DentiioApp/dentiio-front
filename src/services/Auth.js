import axios from 'axios'
import jwtDecode from 'jwt-decode'

const BEARER = 'Bearer '

export const login = (token) => {
  axios.defaults.headers.Authorization = BEARER + token
  localStorage.setItem('authToken', token)
}

export const logout = () => {
  window.localStorage.removeItem('authToken')
  localStorage.clear()
  delete axios.defaults.headers.Authorization
}

// Verifie si un token existe dans le localStorage
export const setup = () => {
  const token = window.localStorage.getItem('authToken')
  var connect = false

  if (token) {
    axios.defaults.headers.Authorization = BEARER + token

    window.localStorage.removeItem('authSubscribeMsg')

    const jwtData = jwtDecode(token)

    if (jwtData.exp * 1000 > new Date().getTime()) {
      connect = true
    } else {
      logout()
    }
  } else {
    logout()
  }

  return connect
}


