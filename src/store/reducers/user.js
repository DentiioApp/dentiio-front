import { LOG_USER, REGISTER_USER, VALID_STATUS, FREE_CREDENTIALS } from '../actions'
import jwtDecode from 'jwt-decode'
import { login } from '../../services/Auth'

const INIT_STATE = {
  id: 0,
  username: '',
  connected: false,
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
      return { ...state, username: details.username, connected: true, id: details.userId }

    case FREE_CREDENTIALS :
      return { ...state, credentials: { email: '', passwd: '' } }

    case REGISTER_USER : return { ...state, subscribe: true, credentials: { email: action.email, passwd: action.passwd } }

    case VALID_STATUS :
      return { ...state, subscribe: false }

    default :
      return state
  }
}
