// import './Cases.scss'

import React, { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import {fetchCases} from '../../services/CaseList'
import Header from '../../components/App/Header/header'

const Cases = () => {
  const user = useSelector(state => state.user)
  const history = useHistory()
  const [cases, setCases] = useState('')

  useEffect(() => {
    /*const getCases = fetchCases(signal)
    getCases.then(res=>setCases(getCases))
      console.log('TEST :', cases)
    */
      
  }, [cases])

  
  if (user.username !== undefined) {
    if (user.connected === false) {
      history.push('/')
    } else {
      return <Redirect to='/' />
    }
  }

  return (
    <>{/*
      {user.username}
      {cases.map((aCase, index) => (
        <span key={index}>{aCase.evolution}</span>))}*/}
      <Header />
    </>
  )
}

export default Cases
