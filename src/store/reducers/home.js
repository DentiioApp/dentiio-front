const INIT_STATE = ''

export const Home = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'CARD_STATE' :
      return {
        status: action.homeState
      }

    default :
      return state
  }
}
