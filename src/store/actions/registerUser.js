import { REGISTER_USER } from '../actions'
import {tryCases} from '../../services/Cases'

export const registerUser = (register) => {
  tryCases({
    type: REGISTER_USER,
    username: register.pseudo,
    email: register.email,
    password: register.password,
    job: register.job
  })
}