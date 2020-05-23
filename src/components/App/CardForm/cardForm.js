import React from 'react'
import { useSelector } from 'react-redux'
import Register from '../Register/register'
import SignIn from '../SignIn/signIn'

const CardForm = () => {
  const home = useSelector((state) => state.home)
  const user = useSelector((state) => state.user)

  var auth = <Register />

  if (home.status === 'connexion' || user.subscribe === true) {
    auth = <SignIn />
  }

  return (
    <>
      {auth}
    </>
  )
}

export default CardForm
