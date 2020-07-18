import { 
LOG_USER, 
REGISTER_USER,
VALID_STATUS,
} from '.'

import { tryCases } from '../../services/Cases'
import { SaveCard } from '../../services/SaveCard'

export const cardSave = (data) => {
  const response = SaveCard(data)
  let action = {}

  if (response.isTrue(true)) {
    action = {type: VALID_STATUS, saved: response }
  }

  return action
}

export const logUser = (datas) => { return {type: LOG_USER, datas: datas.data} }

export const registerUser = (register) => {
  tryCases({
    type: REGISTER_USER,
    username: register.pseudo, email: register.email,
    password: register.password,
    job: register.job
  })
}