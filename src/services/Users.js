import axios from 'axios'
import jwtDecode from 'jwt-decode'
import randomstring from 'randomstring'

const LOGIN_CHECK = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_LOGIN_CHECK
const USERS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS
const AVATAR = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_AVATAR

export const loginCheck = (email, passwd) => {
    return axios.post(
        LOGIN_CHECK, { username: email, password: passwd }
    ).then((res) =>{ return  {message: 'OK', datas: res}})
        .catch((e) => JSON.stringify(e))
}

export const registerCheck =  async (user) => {
console.log(user, 'USER SEND')
    let responses = await axios
        .post(USERS, user)
        .then((res) => {
            localStorage.setItem('authSubscribeMsg', res.statusText)
            return { message: 'OK', datas: res.statusText }
        })
        .catch((e) => JSON.stringify(e))

    return responses.datas !== 'Created' ? {} : responses
}

export const getUserId = () => {
    const token = jwtDecode(localStorage.getItem('authToken'))
    return token.userId
}

export const getUserById = (id) => {
    return axios
        .get(USERS + '/' + id)
        .then((res) => ({
            message: 'OK',
            datas: res.data
        }))
        .catch((e) => JSON.stringify(e))
}

export const saveCard = async (data) => {
    let licenceDOC = { licenceDoc: data.image }
    return await axios.put(USERS + '/' + data.userId, licenceDOC)
        .then(res => res.statusText)
        .catch(console.warning)
}

export const saveAvatar = async (data) => {
    const avatarId = data["avatarId"]
    delete data['avatarId']
    return await axios.put(AVATAR + '/' + avatarId, data)
        .then(res => res.statusText)
        .catch(console.warning)
}

export const editUser = async (data) => {
    const userId = data["userId"]
    delete data['userId']
    return await axios.put(USERS + '/' + userId, data)
        .then(res => res.statusText)
        .catch(console.warning)
}