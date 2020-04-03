export const LOG_USER = 'LOG_USER'

export const logUser = (register) => {
  const action = {
    type        : LOG_USER,
    username    : register.pseudo,
    email       : register.email,
    password    : register.password,
    currency    : register.currency
  };

    return action;
};
