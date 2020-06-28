import { combineReducers } from 'redux'
import { Cases } from './cases'
import { Home } from './home'
import { User } from './user'

export const adminReducer = combineReducers({
  cases: Cases,
  user: User,
  home: Home,
  jobs: ''
})
