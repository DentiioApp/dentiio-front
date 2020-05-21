import React from 'react'
import { useDispatch } from 'react-redux'
import CardForm from '../../components/App/CardForm/cardForm'
import { cardCheck } from '../../store/actions'
import './Home.scss'

const Home = () => {
  const dispatch = useDispatch()
  const homeState = 'inscription'

  dispatch(
    cardCheck(
      {
        status: homeState
      }
    )
  )

  return (
    <div className='App'>
      <CardForm />
    </div>
  )
}

export default Home
