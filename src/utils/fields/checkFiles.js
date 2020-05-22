const SUCCESS = 'Vos fichiers on bien étés sauvergardés'
const OVERCOUNT = 'Uniquement 2 images à la fois'
const OVERSIZE = 'Fichiers trops volumineux'
const SIZE_AVAILABLE = 3060342

const resetInput = (event) => {
  event.target.value = null // discard selected file
}

const checkMimeType = (file, event) => {
  let err = ''
  const types_available = ['image/png', 'image/jpeg', 'image/jpg']
  if (types_available.every(goodType => file.type !== goodType)) {
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
  let message = SUCCESS
  let existErr = false

  // if max upload files selected not accross
  if (files.length < 3) {
    for (var i = 0; i < 2; i++) {
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
