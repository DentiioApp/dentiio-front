import axios from 'axios'
import conf from '../config'

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

export const registerCheck = (user) => {
  const reponses = axios
    .post(USERS, user)
    .then((res) => {
      localStorage.setItem('authSubscribeMsg', res.statusText);
      return {message: conf.messages.auth.register.success ,datas: res.statusText,}
    })
    .catch((e) => JSON.stringify(e));

  return reponses;
}

export const tryRegister = (user) => {
  const fetchDatas = registerCheck(user);

  if (fetchDatas.datas === undefined) {
    fetchDatas.datas = [];
  }

  return fetchDatas;
};



export const tryLogin = (ident, pswd) => {
  const fetchDatas = loginCheck(ident, pswd);

  if (fetchDatas.datas === undefined) {
    fetchDatas.datas = [];
  }

  return fetchDatas;
};