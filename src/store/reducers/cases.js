import { CASES_ITEM } from '../actions'

const INIT_STATE = ''

export const cases = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CASES_ITEM :
      var data = {
        cases: action.datas
      }

      return data

    default :
      return state
  }
}
