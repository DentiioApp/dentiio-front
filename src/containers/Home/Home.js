import './Home.scss'

import React from 'react'
import Header from '../../components/App/header/Header'
import Body from '../../components/App/body/Body'
import { withTranslation } from 'react-i18next';

function Home () {
  return (
    <div className='App'>
      <Header />
      <Body />
    </div>
  )
}

export default Home
