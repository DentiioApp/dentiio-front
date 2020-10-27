import { openSideBar, closeSideBar } from './CasesAction'
import { fetchSpecialities } from './SpecialitiesAction'
import { fetchTreatments } from './TreatmentsAction'
import { fetchPathologies } from './PathologiesAction'
import { fetchCatPathologies } from './CatPathologiesAction'

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const INIT_FAV_CASE = 'INIT_FAV_CASE'
export const CASES_LIST = 'CASES_LIST'
export const CASE_FILTERED = 'CASE_FILTERED'
export const FREE_CREDENTIALS = 'FREE_CREDENTIALS'
export const JOB_LIST = 'JOB_LIST'
export const LOG_USER = 'LOG_USER'
export const LOGIN_FORM = 'LOGIN_FORM'
export const SUBSCRIBE_FORM = 'SUBSCRIBE_FORM'
export const REGISTER_USER = 'REGISTER_USER'
export const VALID_STATUS = 'VALID_STATUS'
export const UPDATE_AVATAR = 'UPDATE_AVATAR'
export const KEYWORDS_LIST = 'KEYWORDS_LIST'
export const UPDATE_LEVEL = 'UPDATE_LEVEL'
export const UPDATE_STEPPER_POSTCASE = 'UPDATE_STEPPER_POSTCASE'
export const SPECS_LIST = 'SPECS_LIST'
export const PATHO_LIST = 'PATHO_LIST'
export const TREATMENTS_LIST = 'TREATMENTS_LIST'
export const SYMPTOMES_LIST = 'SYMPTOMES_LIST'
export const OPEN_SIDE_BAR = 'OPEN_SIDE_BAR'
export const CLOSE_SIDE_BAR = 'CLOSE_SIDE_BAR'
export const SET_USER = 'SET_USER'
export const SET_SPECIALITIES = 'SET_SPECIALITIES'
export const SET_TREATMENTS = 'SET_TREATMENTS'
export const SET_PATHOLOGIES = 'SET_PATHOLOGIES'
export const SET_CAT_PATHOLOGIES = 'SET_CAT_PATHOLOGIES'
export const START_LOADER = 'START_LOADER'
export const STOP_LOADER = 'STOP_LOADER'
export const SET_NEW_USER = 'SET_NEW_USER'

export {
  openSideBar,
  closeSideBar,
  fetchSpecialities,
  fetchTreatments,
  fetchPathologies,
  fetchCatPathologies,
}
