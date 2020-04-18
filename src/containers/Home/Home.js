import React, { useState ,useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom'
import CardForm from '../../components/App/CardForm/cardForm'
import './Home.scss'
import { cardCheck } from '../../store/actions'

const Home = (props) => {
  //const user = useSelector((state) => state.user)
  const dispatch = useDispatch() 
  const [cardState, setCardState] = useState('inscription')


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
