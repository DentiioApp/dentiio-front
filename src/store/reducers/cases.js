import { CASE_ITEM, ADD_FAVORITE, INIT_CURRENT_CASE } from '../actions'

const INIT_STATE = {
  cases: {},
  favorites: {},

  currentCase: {
    id:false,
    age:0,
    sexe:'F',
    drinker:false,
    smoker:false,
    currentTreatment:'',
    oldAffect:'',
    allergen:''
  }
}
/*
const fullyfy=(state)=>{
  const currCase = currentCase.map((prop)=> prop = state.prop)
  return {...state, currentCase: currCase} 
}
*/
export const Cases = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CASE_ITEM : return { ...state, cases: action.datas }
    case ADD_FAVORITE: return { ...state, favorites: action.data }

    case INIT_CURRENT_CASE: 
     // const {age, sexe, drinker, smoker, currentTreatment, oldAffect,allergen} = action.data;
     return { ...state, age: action.datas.age, sexe: action.datas.sexe, drinker:action.datas.drinker, smoker: action.datas.smoker, currentTreatment:action.datas.currentCase, oldAffect:action.datas.oldAffect, allergen: action.datas.allergen }
    
    default :
      return state
  }
}
