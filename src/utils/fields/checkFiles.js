const SUCCESS = 'Upload Ok'
const OVERCOUNT = 'Uniquement 2 images à la fois'
const OVERSIZE = 'Fichiers trops volumineux'
const SIZE_AVAILABLE = 3060342

const resetInput = (event) => {
  event.target.value = null // discard selected file
}


const checkMimeType = (file, event) => {
  // define message container
  let err = ''
  // list allow mime type
  const types_available = ['image/png', 'image/jpeg', 'image/jpg']

  // compare file type find doesn't matach
  if (types_available.every(goodType => file.type !== goodType)) {
    // create error message and assign to container
    err += 'les fichiers au format ' + file.type + ' ne sont pas supportés\n'
  }

  if (err !== '') { // if message not same old that mean has error
    resetInput(event)// discard selected file

    return { error: err, message: err }
  }

  return { error: err, message: err }
}

export const checkFiles = (event) => {
  let files = event.target.files // create file object
  let message = SUCCESS
  let existErr = false
  
  // if max upload files selected not accross 
  if (files.length < 3) {
    for (var i = 0; i < 2; i++) {
      if (files[i].size <= SIZE_AVAILABLE) {
        let checkType = checkMimeType(files[i], event)
        if (checkType.error !== '') {
          message = checkType.message
          existErr = true
          resetInput(event)

          return { error: existErr, message: message }
        }
      } else {
        message = OVERSIZE
        existErr = true
        resetInput(event)

        return { error: existErr, message: message }
      }
    }
  } else {
    event.target.value = null // discard selected file
    message = OVERCOUNT
    existErr = true

    resetInput(event)
  }

  return { error: existErr, message: message }
}
