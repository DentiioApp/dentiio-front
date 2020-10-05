import { combineReducers } from 'redux'
import { Cases } from './cases'
import { Home } from './home'
import { User } from './user'
import { Specialities } from './specialities'
import { Treatments } from './treatments'
import { Pathologies } from './pathologies'
import { CatPathologies } from './catPathologies'
import { CatTreatments } from './catTreatments'

export const adminReducer = combineReducers({
  cases: Cases,
  user: User,
  home: Home,
  specialities: Specialities,
  treatments: Treatments,
  pathologies: Pathologies,
  catPathologies: CatPathologies,
  catTreatments: CatTreatments

})
