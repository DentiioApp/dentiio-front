
import {logUser, cardSave } from './Auth'
import { openSideBar, closeSideBar } from "./Cases";
import { fetchSpecialities } from './Specialities';
import { fetchTreatments } from "./Treatments";

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const INIT_FAV_CASE = 'INIT_FAV_CASE'
export const CARD_STATE = 'CARD_STATE'
export const CASE_ITEM = 'CASE_ITEM'
export const CASES_LIST = 'CASES_LIST'
export const JOB_LIST = 'JOB_LIST'
export const LOG_USER = 'LOG_USER'
export const LOGIN_FORM = 'LOGIN_FORM'
export const SUBSCRIBE_FORM = 'SUBSCRIBE_FORM'
export const REGISTER_USER = 'REGISTER_USER'
export const VALID_STATUS = 'VALID_STATUS'
export const INIT_CURRENT_CASE = 'INIT_CURRENT_CASE'
export const KEYWORDS_LIST = 'KEYWORDS_LIST'
export const FILTERED_CASES = 'FILTERED_CASES'
export const STATUS_FORM = 'STATUS_FORM'
export const UPDATE_LEVEL = 'UPDATE_LEVEL'
export const SPECS_LIST = 'SPECS_LIST'
export const PATHO_LIST = 'PATHO_LIST'
export const TREATMENTS_LIST = 'TREATMENTS_LIST'
export const SYMPTOMES_LIST = 'SYMPTOMES_LIST'
export const OPEN_SIDE_BAR = "OPEN_SIDE_BAR";
export const CLOSE_SIDE_BAR = "CLOSE_SIDE_BAR";
export const SET_SPECIALITIES = "SET_SPECIALITIES";
export const SET_TREATMENTS = "SET_TREATMENTS";

export {
  logUser,
  cardSave,
  openSideBar,
  closeSideBar,
  fetchSpecialities,
  fetchTreatments,
};
