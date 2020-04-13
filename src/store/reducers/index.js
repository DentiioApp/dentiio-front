import { combineReducers } from 'redux'
import { CasesList } from './cases'
import { User } from './log'

export const adminReducer = combineReducers({
  caseslist: CasesList,
  user: User
})
