import {
  LOG_USER,
  REGISTER_USER,
  VALID_STATUS,
  FREE_CREDENTIALS,
  SET_USER,
  UPLOAD_LICENCE,
  TOKEN_REGENERATE,
  SET_PASSWORD, UNSET_PASSWORD
} from '../actions'
import jwtDecode from 'jwt-decode'
import { login } from '../../services/Auth'
import {loginCheck} from "../../services/Users";

const INIT_STATE = {
  id: 0,
  current_user: {},
  connected: false,
  message: '',
  subscribe: false,

  pseudo: '',
  email: '',
  password: '',
  licenceDoc: null,
  acceptCgu: false,
  specialities: [],
  job: '',
  notifUpload: false
}

export const User = (state = INIT_STATE, action) => {
  const details = action.datas && jwtDecode(action.datas.token)
  switch (action.type) {
    case LOG_USER :
      login(action.datas.token)
        console.log(action.password)
      return { ...state, email: details.username, connected: true, id: details.userId, password: action.password }

    case REGISTER_USER :
      login(action.datas.token)
      return { ...state, email: details.username, connected: false, id: details.userId, subscribe: true, password: action.password }

    case SET_USER :
      return { ...state, current_user: action.datas }

    case FREE_CREDENTIALS :
      return { ...state, credentials: { email: '', passwd: '' } }

    case UPLOAD_LICENCE :
      return { ...state, subscribe: true, connected: false, notifUpload: true }

    case VALID_STATUS :
      return { ...state, subscribe: false }

    case TOKEN_REGENERATE :
      return { ...state, connected: true, subscribe: false, password: null }


    default :
      return state
  }
}
