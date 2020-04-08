import { CASES_LIST } from '../actions'

const INIT_STATE = ''

export const casesList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CASES_LIST :
      const newData = (aCase, index) =>(
          state.concat(aCase)
      );
      action.cases.forEach(newData);

      return state;
    
    default :
      return state;
  }
}
