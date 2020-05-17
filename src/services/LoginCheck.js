import axios from 'axios'

const LOGIN_CHECK = process.env.REACT_APP_BACK_API_URL + process.env.REACT_APP_LOGIN_CHECK

export const loginCheck = (ident, pswd) => {
  async function main () {
    return await axios.post(
      LOGIN_CHECK, { username: ident, password: pswd }
    ).then(res => res)
  }

  return main()
}

export default loginCheck
