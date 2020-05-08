import React, { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom'

import Header from '../../components/App/Header/header'
import {setup} from '../../services/Auth'
import {fetchCases} from '../../services/CaseList'

const Cases = () => {
  const [cases, setCases] = useState('')
  const user = useSelector(state => state.user)

  useEffect(() => {
    const getCases = fetchCases()
    getCases.then((res) => setCases(getCases || {}))

    console.log('Cas que remonte L\'api :', cases)
  }, [cases])

  if (setup() === false) {
    return <Redirect to='/' />
  }

  return (
    <>
      {/*
        cases.map(
          (aCase, index) => (
            <span key={index}>{aCase.evolution}</span>
          )
        )
      */}
      <Header />
      {user.username}
    </>
  )
}

export default Cases
