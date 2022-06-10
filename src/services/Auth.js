import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {useDispatch} from "react-redux";
import {UPLOAD_LICENCE} from "../store/actions";
import {useToasts} from "react-toast-notifications";
import {_config} from "../config/index";

const BEARER = 'Bearer '


export const login = (token) => {
  axios.defaults.headers.Authorization = BEARER + token
  localStorage.setItem('authToken', token)
}

export const logout = () => {
  window.localStorage.removeItem('authToken')
  localStorage.clear()
  delete axios.defaults.headers.Authorization
}

// Verifie si un token existe dans le localStorage
export const setup = (tk) => {
  const token = window.localStorage.getItem('authToken') || tk
  var connect = false
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {addToast} = useToasts()
  const messages = _config.messages.auth


  if (token) {
    axios.defaults.headers.Authorization = BEARER + token
    window.localStorage.removeItem('authSubscribeMsg')
    const jwtData = jwtDecode(token)

    if (jwtData.exp * 1000 > new Date().getTime() ) {
      connect = true
    } else {
      logout()
    }
    if (jwtData.licenceDoc === null){
      connect = false
      addToast(messages.signin.licenceDoc, {appearance: 'info'})
      dispatch({type: UPLOAD_LICENCE})
    }
  } else {
    logout()
  }

  return connect
}

