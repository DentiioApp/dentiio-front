import React from 'react'
import { useDispatch } from 'react-redux'
import CardForm from '../../components/App/CardForm/cardForm'
import { cardCheck } from '../../store/actions'
import './Home.scss'

const Home = (props) => {
  const dispatch = useDispatch()
  const cardState = 'inscription'

  dispatch(
    cardCheck(
      {
        status: cardState
      }
    )
  )

  return (
    <div className='App'>
      <CardForm content={cardState} />
    </div>
  )
}

export default Home
