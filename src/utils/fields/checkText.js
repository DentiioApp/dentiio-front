export const checkText = (pseudo) => {
  return ((/[a-zA-z]{3,10}/.test(pseudo) && pseudo !== ''))
}
