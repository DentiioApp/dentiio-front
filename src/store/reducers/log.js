import { LOG_USER } from '../actions'
import { REGISTER_USER } from '../actions'
import axios from 'axios'
//import jwt_decode from 'jwt-decode'

const INIT_STATE = ''

export const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_USER :
      //let token_user  = postUser(action.username, action.password)
      let token_user  = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1ODYzODE2MTksImV4cCI6MTU4NjM4NTIxOSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibm1leWVyQHRpc2NhbGkuZnIifQ.WrfD9Jx_t7LlKOd4ybJ1R7dNd35ic2uAqCmZxnqZOS2iDX_PKya91U_6LPSjmEwvXr8fEmXPCEXG8GSjyV3rsTo6XAzaskkNAWy-Euto1N6-QcwuxPcloLyHiYUx-0e24fi4HU88kO9aJ_0VzveiFoLUwSYlY2jj5iNdkhkWk4vwR3dIP9x1_Vt5O91O1rBcIOwnokMnfxMVVLJrlw-YKCmHjYqvMB2HhJSLCjYP2rQ6yojmI5KH4oETSdXnig33hHk0nDGfTP8m_C5-Bm6Sk5XyW0eTgvdxOFSLXfmgj0NuRqydmPOQPc5kuwRlusKw5Jd7zQ4FYuOPTGLDQIcxVQA0iv0KeSMP-ZHpVLWgZAkHyzF4k9Mo2PoIwU7b7uH2p-tWjhucJ8rDFRHnKJ-lyTkJMN7dDq81jIdkbbwc_xOX8ObMluATYw81FykBS--rkpJ-SWgkBzMl1u8hGUw-T6dfAQ8_xRHSqAWvJ8KdC8n9BU6G6wGkxZaS472iyt9RT7l3rW4a61KaCWcrpSfCLrghBClYuwP6eq_Mp3-Eq6NjzHzIXRh8ZFHCO2KnpzP2wn1vdLB6R1bk3jIEbj-as40ujVHQUs2TCxL9n17m-_OeYJbtFm_MllRtldCdCyqfdoMi6z6Nrz1uvBT1iO_WkMJ89mcWohghgXoA4FX9xJY";
      let Bearer      = "Bearer ";

      if (token_user !== '') {
        axios.defaults.headers['Authorization'] = Bearer+token_user;
        return {
          //username    : action.username === '' ? action.pseudo : action.username ,
          username    : action.email,
          connected   : true,
        }
      }else {
        return {
          connected   : false,
        }
      }

    case REGISTER_USER :
      return {
        username    : action.username,
        email       : action.email,
        password    : action.password,
        function    : action.function,
        connected   : false,
      }

    default :
      return state
  }
}
