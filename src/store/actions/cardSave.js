import { SaveCard } from '../../services/SaveCard'
import { VALID_STATUS } from '.'

export const cardSave = (data) => {
  //promise return of send data to axios
  const isSaved = SaveCard(data)

  let response= isSaved.then((res)=> res.data)

  const action = {
    type: VALID_STATUS,
    saved: response === true ?  true : false
  }

  return action
}
