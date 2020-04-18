import axios from 'axios'

const REGISTER_CHECK = 'http://localhost/api/users'

export const registerCheck = (user) => {

  axios.post(REGISTER_CHECK, user)
    .then((res) => {
      //return res
    })
    .catch(err => err.message)
}

export default registerCheck
