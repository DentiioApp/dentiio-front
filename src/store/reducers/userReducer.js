import { LOG_USER, REGISTER_USER, VALID_STATUS, FREE_CREDENTIALS, SET_USER, BACK_LOGIN_FORM } from '../actions'
import jwtDecode from 'jwt-decode'
import { login } from '../../services/Auth'

const INIT_STATE = {
  id: 0,
  username: '',
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
  job: ''
}

export const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_USER :
      var details = jwtDecode(action.datas.data.token)
      login(action.datas.data.token)
      return { ...state, username: details.username, connected: true, id: details.userId }

    case SET_USER :
      return { ...state, current_user: action.datas }

    case FREE_CREDENTIALS :
      return { ...state, credentials: { email: '', passwd: '' } }

    case REGISTER_USER : return { ...state,
      subscribe: true,
      email: action.datas.email,
      password: action.datas.password,
      pseudo: action.datas.pseudo,
      licenceDoc: action.datas.licenceDoc ? action.datas.licenceDoc : state.licenceDoc,
      specialities: action.datas.specialities,
      job: action.datas.job ? action.datas.job : state.job,
      acceptCgu: action.datas.acceptCgu
    }
    case BACK_LOGIN_FORM :
      return { ...state, subscribe: false }

    case VALID_STATUS :
      return { ...state, subscribe: false }

    default :
      return state
  }
}
