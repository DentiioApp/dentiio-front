import {
  ADD_FAVORITE,
  CLOSE_SIDE_BAR,
  OPEN_SIDE_BAR,
  INIT_FAV_CASE,
  CASES_LIST,
  CASE_FILTERED,
  REMOVE_FAVORITE,
} from '../actions'

import config from '../../config'

const INIT_STATE = {
  cases: {},
  casesFiltred: [],
  casesList: [],
  nbrCases: 1,
  casesLoaded: false,
  currentCase: config.cache.currentCase,
  patient: {},
  openSideBar: false,
  favorites: {}
}

export const Cases = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CASES_LIST:
      return { ...state, casesList: action.datas, casesLoaded: true, nbrCases: action.nbrItems }

    case CASE_FILTERED:
      return { ...state, casesFiltred: action.datas }

    case ADD_FAVORITE:
      return { ...state, favorites: state.favorites.concat(action.datas) }

    case REMOVE_FAVORITE:
      return { ...state, favorites: state.favorites.concat(action.datas) }

    case INIT_FAV_CASE:
      return { ...state, favorites: action.datas }

    case OPEN_SIDE_BAR:
      return { ...state, openSideBar: true }

    case CLOSE_SIDE_BAR:
      return { ...state, openSideBar: false }

    default:
      return state
  }
}
