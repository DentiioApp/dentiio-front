export const checkEmail = (email) => {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
}

export const checkPassword = (password) => {
  // speial chars , upper letter , lower letter, number more than 7 chars
  return password.length > 5;

  //return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#'<>"#?¨áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ()),$%^+=\-_°\\:/&.;|*])(?=.{8,})/.test(password))
}
export const checkText = (pseudo) => {
  return (/[a-zA-z]{3,10}/.test(pseudo) && pseudo !== '')
}

export const checkPseudo = (pseudo) => {
  return (/[a-zA-z]{3,10}/.test(pseudo) && pseudo !== '')
}
