import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../../components/App/Header/Header'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { INIT_FAV_CASE, CASES_LIST } from '../../store/actions'
import CasesItem from '../../components/App/CaseItem/CaseItem'
import { fetchCases, fetchUserFav } from '../../services/Cases'
import { getUserId } from '../../services/Users'
import Spinner from '../../components/UI/Dawers/Spinner'
import { errorApi } from '../../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(3)
    }
  }
}))

const Favorites = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const casesList = useSelector((state) => state.cases.casesList)
  const favorites = useSelector((state) => state.cases.favorites)
  const userId = getUserId()

  var favsIds = []; favorites.length > 0 && favorites.map((item) => { return favsIds.push(item.id) })

  var favoriteCases = []
  casesList && casesList.map((item) => {
    return favsIds.includes(item.id) ? favoriteCases.push(item) : false
  })

  const initUserFav = async () => {
    const response = await fetchUserFav(userId)
    if (!errorApi().test(response)) {
      dispatch({ type: INIT_FAV_CASE, datas: response.datas })
    }
  }

  const getCases = async () => {
    const fetch = await fetchCases()
    if (fetch.message !== undefined && !errorApi().test(fetch.message)) {
      dispatch({ type: CASES_LIST, datas: fetch.datas, nbrItems: fetch.items })
    }
  }
 
  useEffect(() => {
    if (favorites && favorites.length < 1) {
      initUserFav()
    }
  }, [favorites.length])

  useEffect(() => {
    if (casesList && casesList.length < 1) { getCases() }
  })

  if (favoriteCases.length < 1 && favorites.length > 0) {
    return (<><Header target='favorites' /><Spinner /></>)
  } else {
    return (
      <>
        <Header target='favorites' />
        <Container maxWidth='lg'>
          <center><span>Publications favorites</span></center>
          <div className={classes.root}>
            {
              favoriteCases.length > 0 ? favoriteCases.length > 0 && favoriteCases.map((oCase, index) => {
                return <CasesItem key={index} item={oCase} favorite />
              }) : 'Vous n\'avez pas de publication favorite'
            }
          </div>
        </Container>
      </>
    )
  }
}

export default Favorites
