export const checkPseudo = (pseudo) => {
  return (/[a-zA-z]{3,10}/.test(pseudo))
}
