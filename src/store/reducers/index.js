import { combineReducers } from 'redux'
// import {cases} from "";
import { userName } from './log'

export const adminReducer = combineReducers({
  // caseList : caseList,
  username: userName
})
