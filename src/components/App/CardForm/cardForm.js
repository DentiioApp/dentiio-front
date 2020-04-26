import React from 'react'
import { useSelector } from 'react-redux'
import Register from '../Register/register'
import SignIn from '../SignIn/signIn'

const CardForm = (props) => {
  const cardstate = useSelector((state) => state.cardstate)
  const user = useSelector((state) => state.user) 

  var auth = <Register />

  if (cardstate.card === 'connexion' || user.subscribe === true ) {
    auth = <SignIn />
  }

  return (
    <>
      {auth}
    </>
  )
}

export default CardForm
