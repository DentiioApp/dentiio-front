import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Header from '../../components/App/Header/header'
import { setup } from '../../services/Auth'
import { fetchCases } from '../../services/CaseList'
import SlideCases from '../../components/App/SlideCases/slideCases'

const Cases = () => {
  const [cases, setCases] = useState([])
  const [count, setCount] = useState(0)
  const user = useSelector(state => state.user)

  useEffect(() => {
      if(count < 1) {
        const getCases = fetchCases()
        getCases.then((res) => setCases(res || {}))
      }

      setCount(count+1)

  }, [cases])

console.log('cases :', cases)

console.log('TEST :', cases.description)

  if (setup() === false) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Header />
      {user.username}
      <SlideCases content={cases} />
    </>
  )
}

export default Cases
