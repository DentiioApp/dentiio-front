import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Header from '../../components/App/Header/header'
import { setup } from '../../services/Auth'
import { fetchCases } from '../../services/CaseList'
import SlideCases from '../../components/App/SlideCases/slideCases'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 260
  }
}))

const Cases = () => {
  const classes = useStyles()

  const [cases, setCases] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count < 1) {
      const getCases = fetchCases()
      getCases.then((res) => setCases(res || {}))
    }

    setCount(count + 1)
  }, [cases])

  if (setup() === false) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Header target='home' />
      <Container className={classes.root} />
      <SlideCases content={cases} />
    </>
  )
}

export default Cases
