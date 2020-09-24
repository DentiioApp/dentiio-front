import {
  ADD_FAVORITE,
  INIT_CURRENT_CASE,
  FILTERED_CASES,
  CLOSE_SIDE_BAR,
  OPEN_SIDE_BAR,
  INIT_FAV_CASE,
  CASE_ITEM,
} from "../actions";

import config from '../../config'

const INIT_STATE = {
  cases: {},
  currentCase: config.cache.currentCase,
  patient: {},
  openSideBar: false,
  favorites: []
}

export const Cases = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CASE_ITEM:
      return { ...state, cases: action.datas };
    case ADD_FAVORITE:
      return { ...state, favorites: action.data };
     case INIT_FAV_CASE: 
      return { ...state, favorites: action.data };
    case FILTERED_CASES:
      return { ...state, cases: action.data };
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
        allergen: action.datas.allergen,
      };

    case OPEN_SIDE_BAR:
      return { ...state, openSideBar: true };

    case CLOSE_SIDE_BAR:
      return { ...state, openSideBar: false };

    default:
      return state;
  }
}
