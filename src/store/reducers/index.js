import { combineReducers } from 'redux'
import { CasesList } from './cases'
import { CardState } from './cardform'
import { User } from './log'

export const adminReducer = combineReducers({
  caseslist: CasesList,
  user: User,
  cardstate: CardState
})
