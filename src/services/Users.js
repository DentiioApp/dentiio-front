import axios from 'axios'

const LOGIN_CHECK = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_LOGIN_CHECK
const USERS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS

export const loginCheck = (ident, pswd) => {
  async function main () {
    return await axios.post(
      LOGIN_CHECK, { username: ident, password: pswd }
    ).then(res => res)
  }

  return main()
}

const response = localStorage.getItem('authSubscribeMsg')

export const registerCheck = (user) => {
  axios.post(USERS, user)
    .then(res => localStorage.setItem('authSubscribeMsg', res.statusText))

  return response
}

