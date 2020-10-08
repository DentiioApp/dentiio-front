import axios from 'axios'
import jwtDecode from 'jwt-decode'
import randomstring from 'randomstring'

const LOGIN_CHECK = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_LOGIN_CHECK
const USERS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS
const AVATAR = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_AVATAR

export const loginCheck = (email, passwd) => {
  let reponses = axios.post(
    LOGIN_CHECK, { username: email, password: passwd }
  ).then((res) =>{ return  {message: 'OK', datas: res}})
    .catch((e) => JSON.stringify(e))

  return reponses
}

export const registerCheck =  async (user) => {
  const pseudo = 'Dentiio-' + randomstring.generate({
    length: 6,
    charset: 'alphabetic'
  })

  user.pseudo = pseudo

  let responses = await axios
    .post(USERS, user)
    .then((res) => {
      localStorage.setItem('authSubscribeMsg', res.statusText)
      return { message: 'OK', datas: res.statusText }
    })
    .catch((e) => JSON.stringify(e))

  return responses = responses.datas !== 'Created' ? {} : responses
}

export const getUserId = () => {
  const token = jwtDecode(localStorage.getItem('authToken'))
  return token.userId
}

export const getUserById = (id) => {
  let isUserGet = axios
    .get(USERS + '/' + id)
    .then((res) => ({
      message: 'OK',
      datas: res.data
    }))
    .catch((e) => JSON.stringify(e))
  return isUserGet
}

export const saveCard = async (data) => {
  let licenceDOC = { licenceDoc: data.image }
  let isCardPut = await axios.put(USERS + '/' + data.userId, licenceDOC)
    .then(res => res.statusText)
    .catch(console.warning)

  return isCardPut
}

export const saveAvatar = async (data) => {
  const avatarId = data["avatarId"]
  delete data['avatarId']
  let isAvatarPut = await axios.put(AVATAR + '/' + avatarId, data)
      .then(res => res.statusText)
      .catch(console.warning)
  return isAvatarPut
}
