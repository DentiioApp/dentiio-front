import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Header from '../../components/App/Header/Header'
import { setup } from '../../services/Auth'
import { fetchCases } from '../../services/Cases'
import { CASES_LIST } from '../../store/actions'
import CasesList from '../../components/App/CasesList/CasesList'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 260
  }
}))

const Cases = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)

  const areLoaded = home.casesLoaded

  useEffect(() => {
    if (!areLoaded) {
      const getCases = fetchCases()
      getCases.then((resp) => (dispatch({ type: CASES_LIST, data: resp })))
    }
  })

  if (setup() === false) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Header target='home' />
      <Container className={classes.root} />
      <CasesList />
    </>
  )
}

export default Cases
