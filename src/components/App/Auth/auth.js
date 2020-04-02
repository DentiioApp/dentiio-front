import './auth.scss'

import React from 'react'
import Register from '../Register/register'
import SignIn from '../SignIn/signIn'
import img from '../../../images/auth.svg'

var form;
//Ici nous allons tester si l'utilisateur est connecté
if(true){
  form = <Register />;
}else{
  form = <SignIn />;
}

function Auth () {
  return (
    <>
      <div className='auth'>
        <img src={img} alt='alternative texte' />
        <div style={{ width: '20rem' }}>
          {form}
        </div>
      </div>
    </>
  )
}

export default Auth
