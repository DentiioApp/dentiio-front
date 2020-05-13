export const LOG_USER = 'LOG_USER'

export const logUser = (datas) => {
  const action = {
    type: LOG_USER,
    datas: datas.data
  }

  return action
}
