import React from 'react'
import './header.scss'

import { Redirect } from 'react-router-dom'

import BlueButton from '../../UI/buttons/blueButton'
import HomeButton from '../../UI/homeButton/HomeButton'
import TitleHeader from '../../UI/titleHeader/TitleHeader'
import { setup } from '../../../services/Auth'

const Header = (props) => {
  let auth
  let button

  auth = 'Ajouter un cas '
  button = <BlueButton content={auth} />
  
  if (setup() === false) {
      return <Redirect to='/' />
  };

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
