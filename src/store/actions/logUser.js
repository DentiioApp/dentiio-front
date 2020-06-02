import { LOG_USER } from '.'

export const logUser = (datas) => {
  const action = {
    type: LOG_USER,
    datas: datas.data
  }

  return action
}
