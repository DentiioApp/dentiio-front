import { combineReducers } from 'redux'
// import {cases} from "";
import { User } from './log'

export const adminReducer = combineReducers({
  // caseList : caseList,
  user: User
})
