import { LOG_USER, REGISTER_USER, VALID_STATUS } from '../actions'
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
          pseudo: action.email,
          password: action.password,
          isEnabled: true,
          job: '/api/jobs/' + action.job
        }
      )

      return {
        subscribe: true,
        message: localStorage.getItem('authSubscribeMsg')
      }

    case VALID_STATUS :
      return state.concat({
        isValidStatus: true,
        message: localStorage.getItem('pendingStatus')
      })

    default :
      return state
  }
}
