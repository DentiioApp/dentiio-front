import React from 'react'
import './header.scss'
import TitleHeader from '../../UI/titleHeader/TitleHeader'

function Header () {
  return (
    <div className='App'>
      <header className='App-header'>
        {/*<HomeButton />*/}
        <TitleHeader />
        {/*<div>
          <WhiteButton content='Inscription' />
          <BlueButton content='Connexion' />
        </div>*/}
      </header>
    </div>
  )
}

export default Header
