import { CASE_ITEM, ADD_FAVORITE } from '../actions'

const INIT_STATE = {
  cases: {},
  favorites: {},

  currentCase: {
    age,
    sexe,
    drinker,
    smoker,
    currentTreatment,
    oldAffect,
    allergen
  }
}

export const Cases = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CASE_ITEM : return { ...state, cases: action.datas }
    case ADD_FAVORITE: return { ...state, favorites: action.data }

    default :
      return state
  }
}
