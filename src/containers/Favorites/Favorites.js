import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../../components/App/Header/Header'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { INIT_FAV_CASE, CASES_LIST } from '../../store/actions'
import CasesItem from '../../components/App/CaseItem/CaseItem'
import { fetchCases, fetchUserFav } from '../../services/Cases'
import { getUserId } from '../../services/Users'
import titleSvg from '../../images/maquette/c-case-title.svg'

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
  const favorites = useSelector((state) => state.cases.favorites)
  const userId = getUserId()
  const casesList = useSelector((state) => state.home.cases)
  const dispatch = useDispatch()
  const initUserFav = async () => {
    const response = await fetchUserFav(userId)
    const regex2 = RegExp(/Error/)
    if (!regex2.test(response)) {
      dispatch({ type: INIT_FAV_CASE, data: response.datas })
    }
  }

  useEffect(() => {
    if (favorites && favorites.length < 1) {
      initUserFav()
    }
  }, [favorites.length])

  const getCases = async () => {
    const fetch = await fetchCases(1)
    const regex2 = RegExp(/Error/)
    if (fetch.message !== undefined && !regex2.test(fetch.message)) {
      dispatch({ type: CASES_LIST, datas: fetch.datas, nbrItems: fetch.items })
    }
  }

  useEffect(() => {
    if (casesList && casesList.length < 1) { getCases() }
  })

  var favsIds = []; favorites && favorites.map((item) => { return favsIds.push(item.id) })

  var favoriteCases = []
  casesList && casesList.map((item) => {
    return favsIds.includes(item.id) ? favoriteCases.push(item) : false
  })

  return (
    <>
      <Header target='favorites' />
      <Container maxWidth='lg'>
        <center><span>Publications favorites</span></center>
        <div className={classes.root}>
          {
            favoriteCases.length > 0 && favoriteCases.map((oCase, index) => {
              return <CasesItem key={index} item={oCase} favorite />
            })
          }
        </div>
      </Container>
    </>
  )
}

export default Favorites
