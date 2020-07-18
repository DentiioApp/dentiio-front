
import { registerUser , logUser, cardSave} from './Auth'
import { addFav } from './Cases'

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const CARD_STATE = 'CARD_STATE'
export const CASE_ITEM = 'CASE_ITEM'
export const CASES_LIST = 'CASES_LIST'
export const JOB_LIST = 'JOB_LIST'
export const LOG_USER = 'LOG_USER'
export const LOGIN_FORM = 'LOGIN_FORM'
export const REGISTER_USER = 'REGISTER_USER'
export const VALID_STATUS = 'VALID_STATUS'

export { logUser, registerUser, cardSave, addFav }
