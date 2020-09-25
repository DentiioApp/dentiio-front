import {
  LOG_USER,
  VALID_STATUS
} from '.'

import { SaveCard } from '../../services/SaveCard'

export const cardSave = (data) => {
  const response = SaveCard(data)
  let action = {}

  if (response.isTrue(true)) {
    action = { type: VALID_STATUS, saved: response }
  }

  return action
}

export const logUser = (datas) => { return { type: LOG_USER, datas: datas.data } }
