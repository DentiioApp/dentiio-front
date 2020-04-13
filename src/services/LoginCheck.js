import axios from 'axios'

const LOGIN_CHECK = 'http://localhost:8080/api/login_check'
const token =  localStorage.getItem('token');

export const loginCheck = (ident, pswd) => {
   var Bearer = 'Bearer '
   axios.post(LOGIN_CHECK, {username : ident, password: pswd}, {headers: {
        'Content-Type': 'application/json'
    }})
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        axios.defaults.headers.Authorization = Bearer + token
      })
      .catch(err => err)

  return token
}

export default loginCheck