import { combineReducers } from 'redux'
import { Cases } from './casesReducer'
import { Home } from './homeReducer'
import { User } from './userReducer'
import { Specialities } from './specialitiesReducer'
import { Treatments } from './treatmentsReducer'
import { Pathologies } from './pathologiesReducer'
import { CatPathologies } from './catPathologiesReducer'

export const adminReducer = combineReducers({
  cases: Cases,
  user: User,
  home: Home,
  specialities: Specialities,
  treatments: Treatments,
  pathologies: Pathologies,
  catPathologies: CatPathologies
})
