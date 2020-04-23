const INIT_STATE = ''

export const CardState = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'CARD_STATE' :
      return {
        card: action.cardstate
      }

    default :
      return state
  }
}
