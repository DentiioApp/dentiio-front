import { combineReducers } from 'redux'
import { casesList } from './cases'
import { User } from './log'

export const adminReducer = combineReducers({
  casesList: casesList,
  user: User
})
