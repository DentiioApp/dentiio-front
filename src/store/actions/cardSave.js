import { SaveCard } from '../../services/SaveCard'
import {loginCheck} from '../../services/LoginCheck'
import { VALID_STATUS } from '.'

export const cardSave = (data, user) => {
  let ResponseLog = loginCheck(user.email, user.password)
  let token = ResponseLog.then((res) => res.data.token)

  console.log('TEST :', token)

  //promise return of send data to axios
  const isSaved = SaveCard(data)

  let response= isSaved.then((res)=> res.data)

  const action = {
    type: VALID_STATUS,
    saved: response === true ?  true : false
  }

  return action
}
