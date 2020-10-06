import axios from 'axios'
import jwtDecode from 'jwt-decode'
import randomstring from 'randomstring'

const LOGIN_CHECK = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_LOGIN_CHECK
const USERS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS

export const loginCheck = (email, passwd) => {
  const reponses = axios.post(
    LOGIN_CHECK, { username: email, password: passwd }
  ).then((res) =>{ return  {message: 'OK', datas: res}})
    .catch((e) => JSON.stringify(e))

  return reponses
}

export const registerCheck = (user) => {
  const pseudo = 'Dentiio-' + randomstring.generate({
    length: 6,
    charset: 'alphabetic'
  })

  user.pseudo = pseudo

  const reponses = axios
    .post(USERS, user)
    .then((res) => {
      localStorage.setItem('authSubscribeMsg', res.statusText)
      return { message: 'OK', datas: res.statusText }
    })
    .catch((e) => JSON.stringify(e))

  return reponses
}

export const tryRegister = (user) => {
  const fetchDatas = registerCheck(user)

  if (fetchDatas.datas === undefined) {
    fetchDatas.datas = []
  }

  return fetchDatas
}

export const getUserId = () => {
  const token = jwtDecode(localStorage.getItem('authToken'))
  return token.userId
}

export const getUserById = (id) => {
  const isUserGet = axios
    .get(USERS + '/' + id)
    .then((res) => ({
      message: 'OK',
      datas: res.data
    }))
    .catch((e) => JSON.stringify(e))
  return isUserGet
}

export const saveCard = async (data) => {
  const licenceDOC = { licenceDoc: data.image }
  const isCardPut = await axios.put(USERS + '/' + data.userId, licenceDOC)
    .then(res => res.statusText)
    .catch(console.warning)

  return isCardPut
}
