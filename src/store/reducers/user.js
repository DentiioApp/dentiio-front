import { LOG_USER, REGISTER_USER, VALID_STATUS } from '../actions'
import jwtDecode from 'jwt-decode'
import { login } from '../../services/Auth'

const INIT_STATE = {
  id: 0,
  username: '',
  connected: false,
  isValidStatus: false,
  message: '',
  subscribe: false,
  credentials: {
    email: '',
    passwd: ''
  }
}

export const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_USER :
      var details = jwtDecode(action.datas.data.token)
      login(action.datas.data.token)
      return { username: details.username, connected: true, id: details.userId, subscribe: true}

    case REGISTER_USER : return { ...state, subscribe: true, isValidStatus: true, credentials: {email: action.email, passwd: action.passwd} }

    case VALID_STATUS :
      return { ...state, isValidStatus: true, message: localStorage.getItem('pendingStatus') }

    default :
      return state
  }
}
