export const checkPassword = (password) => {
  // speial chars , upper letter , lower letter, number more than 7 chars
  return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#'<>"#?¨áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ()),$%^+=\-_°\\:/&.;|*])(?=.{8,})/.test(password))
}
