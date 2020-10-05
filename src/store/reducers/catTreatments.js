import { SET_CAT_TREATMENTS } from '../actions'

const INIT_STATE = {
  catTreatments: []
}

export const CatTreatments = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_CAT_TREATMENTS:
      return { ...state, catTreatments: action.data }
    default:
      return state
  }
}
