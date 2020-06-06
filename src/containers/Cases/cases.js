import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Header from '../../components/App/Header/header'
import { setup } from '../../services/Auth'
import { fetchCases } from '../../services/CaseList'
import CasesList from '../../components/App/CasesList/casesList'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 260
  }
}))

const Cases = () => {
  const classes = useStyles()

  const [cases, setCases] = useState([])
  var count = 0 ;
  
  useEffect(() => {
    const getCases = fetchCases()
    getCases.then((res) => setCases(res || {}))
  }, [count])

  if (setup() === false) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Header target='home' />
      <Container className={classes.root} />
      <CasesList content={cases} />
    </>
  )
}

export default Cases
