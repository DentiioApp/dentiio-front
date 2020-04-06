export const LOG_USER = 'LOG_USER'
export const REGISTER_USER = 'REGISTER_USER'

export const logUser = (logger) => {
  const action = {
    type        : LOG_USER,
    username    : logger.pseudo,
    password    : logger.password,
  };

  return action;
};

export const registerUser = (register) => {
  const action = {
    type        : REGISTER_USER,
    username    : register.pseudo,
    email       : register.email,
    password    : register.password,
    function    : register.function
  };

  return action;
};

