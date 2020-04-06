import { LOG_USER } from '../actions'
import { REGISTER_USER } from '../actions'

import {sha256} from 'js-sha256'

const INIT_STATE = ''

export const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_USER :
      return  {
        username    : action.username,
        password    : sha256(action.password),
        connected   : true,
      }

    case REGISTER_USER :
      return  {
        username    : action.username,
        email       : action.email,
        password    : sha256(action.password),
        function    : action.function,
        connected   : false,
      }

    default :
      return state
  }
}
