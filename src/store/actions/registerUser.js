import { REGISTER_USER } from '../actions'

export const registerUser = (register) => {
  const action = {
    type: REGISTER_USER,
    username: register.pseudo,
    email: register.email,
    password: register.password,
    job: register.job
  }

  return action
}
