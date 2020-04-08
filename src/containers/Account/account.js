// import './Account.scss'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCases } from '../../store/actions'

const Account = () => {
  const user = useSelector(state => state.user)
  const cases = useSelector(state => state.casesList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCases())
  }, [dispatch])

  return (
    <>
      {user.username}
      {cases.map((aCase, index) => (
        <span key={index}>{aCase}</span>))}
    </>
  )
}

export default Account
