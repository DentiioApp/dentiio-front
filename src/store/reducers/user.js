import { LOG_USER, REGISTER_USER, VALID_STATUS } from '../actions'
import { registerCheck } from '../../services/Users'
import jwtDecode from 'jwt-decode'
import { login } from '../../services/Auth'

const INIT_STATE = ''

export const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_USER :
      var details = jwtDecode(action.datas.token)

      login(action.datas.token)

      return { username: details.username, connected: true }

    case REGISTER_USER :
      return { ...state, subscribe: true }

    case VALID_STATUS :
      return { ...state, isValidStatus: true, message: localStorage.getItem('pendingStatus') }

    default :
      return state
  }
}
