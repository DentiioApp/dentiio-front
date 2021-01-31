import { checkText, checkPassword, checkEmail } from './fields/fieldsCheckRegister'
import { checkFiles } from './fields/checkFiles'
import { avgNotes } from './cases/notes'
import { ModifyImage } from './cases/imageEditor'
import { errorApi } from './api/api'
import { favOrCase } from './cases/filters'

export { avgNotes }
export { checkText }
export { checkEmail }
export { checkFiles }
export { checkPassword }
export { errorApi }
export { favOrCase }
export { ModifyImage }


export const SUCCESS = 'Vos fichiers on bien étés sauvergardés'
export const OVERCOUNT = 'Uniquement 2 images à la fois'
export const OVERSIZE = 'Fichiers trops volumineux'
export const SIZE_AVAILABLE = 3060342
