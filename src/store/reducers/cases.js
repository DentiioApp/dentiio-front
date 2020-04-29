import { CASES_LIST } from '../actions'

const INIT_STATE = ''

export const CasesList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CASES_LIST :
      var data = {
        cases: action.datas
      }

      return data

    default :
      return state
  }
}
