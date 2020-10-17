import { SET_CAT_PATHOLOGIES } from '../actions'

const INIT_STATE = {
  catPathologies: []
}

export const CatPathologies = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_CAT_PATHOLOGIES:
      return { ...state, catPathologies: action.data }
    default:
      return state
  }
}
