import { LOG_USER, REGISTER_USER } from '../actions'
import { loginCheck } from '../../services/LoginCheck'
import { registerCheck } from '../../services/RegisterCheck'
import jwtDecode from 'jwt-decode'

const INIT_STATE = ''

export const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_USER :
      var tokenUser = loginCheck(action.pseudo, action.password)
      if (tokenUser !== '') {
        var details = jwtDecode(tokenUser)

        return {
          details: details,
          connected: true
        }
      } else {
        return {
          connected: false
        }
      }

    case REGISTER_USER :
      var aUser = registerCheck(
        {
          email: action.email,
          nom: 'Branis',
          prenom: action.username,
          password: action.password,
          isEnabled: true
        }
      )

      if (aUser.status === 201) {
        return {
          subscribe: true,
          connected: false
        }
      }
      return (state)

    default :
      return state
  }
}
