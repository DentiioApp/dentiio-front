import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Register from '../Register/register'
import SignIn from '../SignIn/signIn'

const CardForm = (props) => {
    //const user = useSelector((state) => state.user)
    const cardstate = useSelector((state) => state.cardstate)
    const [cards, setCards] =useState('inscrition')

    console.log('TECARRRDST :', cardstate.card)
    var auth

  useEffect(()=>{
    setCards(cards)
  },[])


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