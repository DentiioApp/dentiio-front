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
      }

      return {
        connected: false
      }

    case REGISTER_USER :
      var response = registerCheck(
        {
          email: action.email,
          nom: 'Branis',
          prenom: action.username,
          password: action.password,
          isEnabled: true
        }
      )

      window.localStorage.removeItem('authSubscribe')

      if (response !== null) {
        return {
          subscribe: true,
          message: 'Bienvenue dans l\'univers Dentiio',
          connected: false
        }
      } else{
        return {
          subscribe: false,
          message: 'Un probleme est survenue lors de l\'inscription',
          connected: false
        }
      }

    default :
      return state
  }
}
