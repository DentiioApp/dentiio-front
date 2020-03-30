export const LOG_USER               = "LOG_USER";

export const logUser = (username) => ({
    type    : LOG_USER,
    username,
});