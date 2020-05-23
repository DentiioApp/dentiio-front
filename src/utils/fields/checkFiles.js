import { SUCCESS, OVERCOUNT, OVERSIZE, SIZE_AVAILABLE } from '../'

const resetInput = (event) => {
  event.target.value = null // discard selected file
}

const checkMimeType = (file, event) => {
  let err = ''
  const typesAvailable = ['image/png', 'image/jpeg', 'image/jpg']
  if (typesAvailable.every(goodType => file.type !== goodType)) {
    err += 'les fichiers au format ' + file.type + ' ne sont pas supportés\n'
  }

  if (err !== '') { // if message not same old that mean has error
    resetInput(event)// discard selected file

    return { error: err, message: err }
  }

  return { error: err, message: err }
}

export const checkFiles = (event) => {
  const files = event.target.files // create file object
  const filesNumber = files.length
  let message = SUCCESS
  let existErr = false

  // if max upload files selected not accross
  if (filesNumber < 3) {
    for (var i = 0; i < filesNumber; i++) {
      if (files[i].size <= SIZE_AVAILABLE) {
        const checkType = checkMimeType(files[i], event)
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
