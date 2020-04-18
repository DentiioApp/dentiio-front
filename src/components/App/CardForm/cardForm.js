import React from 'react'
import { useSelector } from 'react-redux'
import Register from '../Register/register'
import SignIn from '../SignIn/signIn'

const CardForm = (props) => {
  const cardstate = useSelector((state) => state.cardstate)
  var auth

  if (cardstate.card === 'inscription') {
    auth = <Register />
  }

  if (cardstate.card === 'connexion') {
    auth = <SignIn />
  }

  return (
    <>
      {auth}
    </>
  )
}

export default CardForm
