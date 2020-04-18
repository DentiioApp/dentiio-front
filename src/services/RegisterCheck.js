import axios from 'axios'

const REGISTER_CHECK = 'http://localhost/api/users'

export const registerCheck = (user) => {
  axios.post(REGISTER_CHECK, user)
    .then(res => console.log('TESeeeeT :', res))
    .catch(err => console.log('errrr :', err))
}

export default registerCheck
