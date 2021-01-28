import {
  ADD_FAVORITE,
  CLOSE_SIDE_BAR,
  OPEN_SIDE_BAR,
  INIT_FAV_CASE,
  CASES_LIST,
  CASE_FILTERED,
  REMOVE_FAVORITE,
  SET_EXAM_PICS,
  DEL_EXAM_PICS,
  DROP_EXAM_PICS,
  SET_TREAT_PICS,
  DROP_TREAT_PICS,
  DEL_TREAT_PICS,
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
  favorites: [],
  exam_pics: [],
  treat_pics: [],
}

// const person = {
//   isHuman: false,
// };

// const me = Object.create(person);
// const f = 'f';
// const 
// me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
// me.isHuman = true;

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
      let newobject = state

      state.favorites.map((favType, index) => {
        let caseIndex = null

        if (favType["@type"] === 'ClinicalCase') {
          caseIndex = favType.id
        }
        if (favType["@type"] === 'Favorite') {
          caseIndex = favOrCase(favType)
        }

        if (caseIndex === data) {
          state.favorites.splice(index, 1)
          newobject = { ...state, favorites: state.favorites }
        }

        return null
      })

      return newobject

    case INIT_FAV_CASE:
      return { ...state, favorites: action.datas }

    case OPEN_SIDE_BAR:
      return { ...state, openSideBar: true }

    case CLOSE_SIDE_BAR:
      return { ...state, openSideBar: false }

    case SET_EXAM_PICS:
      return { ...state, exam_pics: state.exam_pics.concat(action.data) }

    case DEL_EXAM_PICS:
      return { ...state, exam_pics: state.exam_pics.splice(-1, 1) }

    case DROP_EXAM_PICS:
      return { ...state, exam_pics: [] }

    case SET_TREAT_PICS:
      return { ...state, treat_pics: state.treat_pics.concat(action.data) }

    case DROP_TREAT_PICS:
      return { ...state, treat_pics: state.treat_pics.splice(-1, 1) }

    case DEL_TREAT_PICS:
      return { ...state, treat_pics: [] }

    default:
      return state
  }
}
