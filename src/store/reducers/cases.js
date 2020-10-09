import {
  ADD_FAVORITE,
  CLOSE_SIDE_BAR,
  OPEN_SIDE_BAR,
  INIT_FAV_CASE,
  CASES_LIST,
  CASE_FILTERED,
  REMOVE_FAVORITE,
} from '../actions'

import { favOrCase } from '../../utils'

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
      let data = favOrCase(action.datas)
      let newFavs = state.favorites.filter(favType =>{
          let caseIndex = null 
          if (favType["@type"] === 'ClinicalCase') {
            caseIndex = caseIndex.id
          }
          if (favType["@type"] === 'Favorite') {
            caseIndex = favOrCase(favType)
          }
          console.log('TEST :',data,  caseIndex)
          return data === caseIndex
    
      })
      console.log('newFavs :', newFavs)
      return { ...state, favorites: newFavs }

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
