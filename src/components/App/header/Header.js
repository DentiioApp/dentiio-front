import React from 'react'
import './header.scss'

import { useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";

import BlueButton from '../../UI/buttons/blueButton'
import HomeButton from '../../UI/homeButton/HomeButton'
import TitleHeader from '../../UI/titleHeader/TitleHeader'
import WhiteButton from '../../UI/buttons/whiteButton'

const Header = (props) => {
  const username = useSelector(state => state.username);
  let auth;
  let button;

  if (props.content === 'connexion') {
    auth    = 'inscription'
    button  = <WhiteButton content={auth} />
  } else {
    auth    = 'connexion'
    button  = <BlueButton content={auth} />
  }

  if (username !== '') {
    return <Redirect to="/profile" />
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <HomeButton />
        <TitleHeader />
        {button}
      </header>
    </div>
  )
}

export default Header
