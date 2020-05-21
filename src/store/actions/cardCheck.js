export const CARD_STATE = 'CARD_STATE'

export const cardCheck = (card) => {
  const action = {
    type: CARD_STATE,
    homeState: card.status
  }

  return action
}
