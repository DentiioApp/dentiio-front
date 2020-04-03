import { LOG_USER } from '../actions'
import {sha256} from 'js-sha256'

const INIT_STATE = ''

export const userName = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_USER :
      return  {
        username: action.username,
        email       : action.email,
        password    : sha256(action.password),
        currency    : action.currency,
      }

    default :
      return state
  }
}
