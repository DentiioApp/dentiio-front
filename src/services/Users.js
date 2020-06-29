import axios from 'axios'

const LOGIN_CHECK = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_LOGIN_CHECK
const USERS = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_USERS

export const loginCheck = (ident, pswd) => {
  const reponses =  axios.post(
      LOGIN_CHECK, { username: ident, password: pswd }
    ).then(res => res)
    .catch((e) => JSON.stringify(e));
 
  return reponses
 }

export const tryLogin = (ident, pswd) => {
  const fetchDatas = loginCheck(ident, pswd);
console.log('TEST :', fetchDatas)
  if (fetchDatas.datas === undefined) {
    fetchDatas.datas = [];
  }

  return fetchDatas;
};

export const registerCheck = (user) => {
  const reponses = axios
    .post(USERS, user)
    .then((res) => { 
      localStorage.setItem('authSubscribeMsg', res.statusText);
      return {message: "OK" ,datas: res.statusText,}
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
