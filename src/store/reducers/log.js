import { LOG_USER } from '../actions'

const INIT_STATE = ''

export const userName = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_USER :
      return state = action.username
    default :
      return state
  }
}
