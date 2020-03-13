import React from 'react'
import './header.scss'

import HomeButton from '../../UI/homeButton/HomeButton'
import TitleHeader from '../../UI/titleHeader/TitleHeader'
import WhiteButton from '../../UI/buttons/WhiteButton'
import BlueButton from '../../UI/buttons/BlueButton'

function Header () {
  return (
    <div className='App'>
      <header className='App-header'>
        <HomeButton />
        <TitleHeader />
        <div>
          <WhiteButton content='Inscription' />
          <BlueButton content='Connexion' />
        </div>
      </header>
    </div>
  )
}

export default Header
