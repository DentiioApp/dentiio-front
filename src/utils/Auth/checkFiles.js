const SUCCESS = 'Upload Ok'
const OVERCOUNT = 'Uniquement 2 images à la fois'
const FORMAT = 'Only 3 images can be uploaded at a time'
const OVERSIZE = 'Fichiers trops volumineux'

export const checkFiles = (event) => {
  /** ~ 3Mo */
  if (event.target.files[0].size < 3060342) { 
    maxSelectFile(event) 
  }
  return { response: false, message: OVERSIZE }
}

export const maxSelectFile = (event) => {
  const files = event.target.files // create file object
  const msg = SUCCESS
  if (files.length > 2) {
    event.target.value = null // discard selected file

    return { response: false, message: OVERCOUNT }
  }

  checkMimeType(event, msg)
}

export const checkMimeType = (event, msg) => {
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
      err += 'not a supported format\n'
    }
  };

  if (err !== '') { // if message not same old that mean has error
    event.target.value = null // discard selected file
    msg = FORMAT

    return { response: false, message: msg }
  }

  return { response: true, message: msg }
}
