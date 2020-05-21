import { LOG_USER, REGISTER_USER } from '../actions'
import { registerCheck } from '../../services/RegisterCheck'
import jwtDecode from 'jwt-decode'
import { login } from '../../services/Auth'

const INIT_STATE = ''

export const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_USER :
      var details = jwtDecode(action.datas.token)

      login(action.datas.token)

      return {
        username: details.username,
        connected: true
      }

    case REGISTER_USER :
      registerCheck(
        {
          email: action.email,
          nom: action.username,
          prenom: action.username,
          username: action.email,
          password: action.password,
          isEnabled: true
        }
      )

      return {
        subscribe: true,
        message: localStorage.getItem('authSubscribeMsg')
      }

    default :
      return state
  }
}
