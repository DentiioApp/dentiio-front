// import './Cases.scss'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetCases } from '../../store/actions'
import { Redirect, useHistory } from 'react-router-dom'

const Cases = () => {
  const user = useSelector(state => state.user)
  const cases = useSelector(state => state.caseslist)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(GetCases())
  }, [dispatch])

  dispatch(GetCases())
  if (user.details !== undefined) {
    if (user.connected === false) {
      history.push('/')
    } else {
      return <Redirect to='/' />
    }
  };
  return (
    <>
      {user.details.username}
      {cases.map((aCase, index) => (
        <span key={index}>{aCase}</span>))}
    </>
  )
}

export default Cases
