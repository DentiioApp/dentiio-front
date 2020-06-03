import { CARD_STATE } from '.'

export const cardCheck = (card) => {
  const action = {
    type: CARD_STATE,
    homeState: card.status
  }

  return action
}
