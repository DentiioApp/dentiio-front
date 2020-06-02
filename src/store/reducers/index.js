import { combineReducers } from 'redux'
import { CasesList } from './cases'
import { Home } from './home'
import { User } from './user'

export const adminReducer = combineReducers({
  caseslist: CasesList,
  user: User,
  home: Home
})
