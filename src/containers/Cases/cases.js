// import './Cases.scss'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCases } from '../../store/actions'

const Cases = () => {
  const user = useSelector(state => state.user)
  const cases = useSelector(state => state.caseslist)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCases())
  }, [dispatch])

  return (
    <>
      {user.details.username}
      {cases.map((aCase, index) => (
        <span key={index}>{aCase}</span>))}
    </>
  )
}

export default Cases
