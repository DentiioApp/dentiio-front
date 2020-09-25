import { SET_PATHOLOGIES } from '../actions'

const INIT_STATE = {
  pathologies: []
}

export const Pathologies = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_PATHOLOGIES:
      return { ...state, pathologies: action.data }
    default:
      return state
  }
}
