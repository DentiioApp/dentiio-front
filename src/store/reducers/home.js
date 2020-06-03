const INIT_STATE = ''

export const Home = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'CARD_STATE' :
      return {
        status: action.homeState
      }

    case 'JOB_LIST' :
      return {
        ...state,
        djobs: action.data
      }

    default :
      return state
  }
}
