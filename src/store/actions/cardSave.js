import { SaveCard } from '../../services/SaveCard'
import { VALID_STATUS } from '.'

export const cardSave = (data) => {
  const isSaved = SaveCard(data)

  const action = {
    type: VALID_STATUS,
    saved: isSaved
  }

  return action
}
