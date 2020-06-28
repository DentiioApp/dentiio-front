import { CASE_ITEM } from '../actions'

const INIT_STATE = ''

export const Cases = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CASE_ITEM :
      var data = {
        cases: action.datas
      }

      return data

    default :
      return state
  }
}
