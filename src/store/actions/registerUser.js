import {REGISTER_USER} from '../actions'

export const registerUser = (register) => {
  const action = {
    type: REGISTER_USER,
    username: register.pseudo,
    email: register.email,
    password: register.password,
    function: register.function
  }

  return action
}
