import { LOG_USER, REGISTER_USER } from '../actions'
import { registerCheck } from '../../services/RegisterCheck'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const BEARER = 'Bearer '
const INIT_STATE = ''

export const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_USER :
        var details = jwtDecode(action.datas.token)
        axios.defaults.headers.Authorization = BEARER + action.datas.token
        return {
          username: details.username,
          connected: true
        }

    case REGISTER_USER :
      var response = registerCheck(
        {
          email: action.email,
          nom: 'Branis',
          prenom: action.username,
          password: action.password,
          isEnabled: true
        }
      )

      if (response !== null) {
        return {
          subscribe: true,
          message: 'Bienvenue dans l\'univers Dentiio',
          connected: false
        }
      } else {
        return {
          subscribe: false,
          message: 'Un probleme est survenue lors de l\'inscription',
          connected: false
        }
      }

    default :
      return state
  }
}
