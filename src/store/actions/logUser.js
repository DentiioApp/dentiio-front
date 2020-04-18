export const LOG_USER = 'LOG_USER'

export const logUser = (logger) => {
  const action = {
    type: LOG_USER,
    pseudo: logger.pseudo,
    password: logger.password
  }

  return action
}