import './auth.scss'

import React from 'react'
import { useSelector } from 'react-redux'
import Register from '../Register/register'
import SignIn from '../SignIn/signIn'
import img from '../../../images/auth.svg'

const Auth = () => {
  const username = useSelector(state => state.username)

  var form
  // Ici nous allons tester si l'utilisateur est connecté
  if (!username) {
    form = <Register />
  } else {
    form = <SignIn />
  }

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
