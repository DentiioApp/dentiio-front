const SUCCESS = 'Upload Ok'
const OVERCOUNT = 'Uniquement 2 images à la fois'
const OVERSIZE = 'Fichiers trops volumineux'

const checkMimeType = (event) => {
  // getting file object
  const files = event.target.files
  // define message container
  let err = ''
  // list allow mime type
  const types = ['image/png', 'image/jpeg', 'image/jpg']
  // loop access array
  for (var x = 0; x < files.length; x++) {
    // compare file type find doesn't matach
    if (types.every(type => files[x].type !== type)) {
      // create error message and assign to container
      err += 'les fichiers au format' + files[x].type + 'ne sont pas supportés\n'
    }
  };

  if (err !== '') { // if message not same old that mean has error
    event.target.value = null // discard selected file

    return { response: false, message: err }
  }

  return { response: true, message: err }
}

export const checkFiles = (event) => {
  const files = event.target.files // create file object
  let message = SUCCESS
  let existErr = false

  if (files.length > 2) {
    event.target.value = null // discard selected file
    message = OVERCOUNT
    existErr = true
  } else {
    for (var i = 0; i < 2; i++) {
      if (files[i].size > 3060342) {
        message = OVERSIZE
        existErr = false
      }

      if (checkMimeType(event).response === false) {
        message = checkMimeType(event).message
        existErr = false
      }
    }
  }

  return { response: existErr, message: message }
}
