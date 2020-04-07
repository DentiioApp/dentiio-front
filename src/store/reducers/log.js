import { LOG_USER } from '../actions'
import { REGISTER_USER } from '../actions'
import {sha256} from 'js-sha256'

const suffix = '17e5a8ceda3289148f0ee33ccf78f888edd0a51cecdd584be8b697cb5814c6cc17e5a8ceda328'+
'9148f0ee33ccf78f888edd0a51cecdd584be8b697cb5814c6cc17e5a8ceda3289148f0ee33ccf78f888edd0a51cecdd584be8b697cb581'+
'4c6cc17e5a8ceda3289148f0ee33ccf78f888edd0a51cecdd584be8b697cb5814c6cc'

const DATABASE = [
  {
    email   :'loryleticee@gmail.com',
    pseudo  :'loryleticee',
    password: '17e5a8ceda3289148f0ee33ccf78f888edd0a51cecdd584be8b697cb5814c6cc'+suffix,
  },
  {
    email   :'lo@lo.com',
    pseudo  :'lo',
    password: '17e5a8ceda3289148f0ee33ccf78f888edd0a51cecdd584be8b697cb5814c6cc'+suffix,
  },
];

const INIT_STATE = ''

export const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_USER :
      const check = (element) => {
        if ((element.email === action.username || element.pseudo === action.username) 
          && sha256(action.password)+suffix === element.password
        ){
          return true 
        }else{
          return false
        }
      }

      let valid = DATABASE.some(check);

      if (valid === true) {
        return  {
          username    : action.username === '' ? action.pseudo : action.username ,
          connected   : true,
        }
      }else{
        return {
          connected   : false,
        }
      }

    case REGISTER_USER :
      return  {
        username    : action.username,
        email       : action.email,
        password    : sha256(action.password+suffix),
        function    : action.function,
        connected   : false,
      }

    default :
      return state
  }
}
