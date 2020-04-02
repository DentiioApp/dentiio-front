import './Home.scss'

import React from 'react'
import Auth from '../../components/App/Auth/auth'
import Header from '../../components/App/Header/header'
import { useSelector } from 'react-redux'

const Home = () => {
  const username = useSelector(state => state.username)

  var auth

  if (username === '') {
    auth = <Auth />
  } else {
    auth = "Vous êtes bien enregistré 😀"
  }

  return (
    <div className='App'>
      <Header />
      {auth}

    </div>
  )
}

export default Home
