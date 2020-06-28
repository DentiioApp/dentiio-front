import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Header from '../../components/App/Header/Header'
import { setup } from '../../services/Auth'

import CasesList from '../../components/App/CasesList/CasesList'


const useStyles = makeStyles((theme) => ({
  root: {
    height: 260
  }
}))

const Cases = () => {
  const classes = useStyles()

  if (setup() === false) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Header target='home' />
      <Container className={classes.root} />
      <CasesList/>
    </>
  )
}

export default Cases
