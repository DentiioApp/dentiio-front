import { CASE_ITEM, ADD_FAVORITE, INIT_CURRENT_CASE, FILTERED_CASES, INIT_PATIENT } from '../actions'
import config from '../../config'

const INIT_STATE = {
  cases: {},
  favorites: {},
  currentCase: config.cache.currentCase,
  patient: {}
}

export const Cases = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CASE_ITEM:
      return { ...state, cases: action.datas }
    case ADD_FAVORITE:
      return { ...state, favorites: action.data }
    case FILTERED_CASES:
      return { ...state, cases: action.data }
    case INIT_CURRENT_CASE:
      // const {age, sexe, drinker, smoker, currentTreatment, oldAffect,allergen} = action.data;
      return {
        ...state,
        age: action.datas.age,
        sexe: action.datas.sexe,
        drinker: action.datas.drinker,
        smoker: action.datas.smoker,
        currentTreatment: action.datas.currentCase,
        oldAffect: action.datas.oldAffect,
        allergen: action.datas.allergen
      }

    case INIT_PATIENT:
      return { ...state, patient: action.data }

    default :
      return state
  }
}
