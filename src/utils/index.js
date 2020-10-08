import { checkText } from './fields/checkText'
import { checkEmail } from './fields/checkEmail'
import { checkFiles } from './fields/checkFiles'
import { checkPassword } from './fields/checkPassword'
import { avgNotes } from './cases/notes'
import { errorApi } from './api/api'

export { avgNotes }
export { checkText }
export { checkEmail }
export { checkFiles }
export { checkPassword }
export { errorApi }

export const SUCCESS = 'Vos fichiers on bien étés sauvergardés'
export const OVERCOUNT = 'Uniquement 2 images à la fois'
export const OVERSIZE = 'Fichiers trops volumineux'
export const SIZE_AVAILABLE = 3060342
