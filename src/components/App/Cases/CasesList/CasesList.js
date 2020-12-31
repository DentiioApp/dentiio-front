import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { fetchCases, fetchUserFav } from '../../../../services/Cases'
import { CASES_LIST, INIT_FAV_CASE } from '../../../../store/actions'
import CasesItem from '../CaseItem/CaseItem'
import Paginator from '../../../UI/Paginator/Paginator'
import titleSvg from '../../../../images/maquette/c-case-title.svg'
import { getUserId } from '../../../../services/Users'
import { errorApi } from '../../../../utils'
import Spinner from '../../../../components/UI/Dawers/Spinner'

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

const CasesList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userId = getUserId()

  const caseSelector = useSelector((state) => state.cases)

  const casesList = caseSelector.casesList
  const casesFiltred = caseSelector.casesFiltred
  const cases = casesFiltred.length > 0 ? casesFiltred : casesList

  const nbrCases = caseSelector.nbrCases
  const areLoaded = caseSelector.casesLoaded
  const favorites = caseSelector.favorites
  const pages = Math.round(nbrCases / 30)

  const initValues = {
    paginator: 1
  }

  const [values, setValues] = useState(initValues)

  useEffect(() => {

    const getCases = async () => {
      const fetch = await fetchCases(values.paginator)
      if (fetch.message !== undefined && !errorApi().test(fetch.message)) {
       // dispatch({ type: CASES_LIST, datas: fetch.datas, nbrItems: fetch.items })
      }
    }

    const initUserFav = async () => {
      const response = await fetchUserFav(userId)
      if (!errorApi().test(response)) {
      //  dispatch({ type: INIT_FAV_CASE, datas: response.datas })
      }
    }

    if (cases && cases.length < 1) {
      initUserFav()
      getCases()
    }
    if (favorites && favorites.length < 1) { initUserFav() }
  }, [userId, dispatch, cases, values, favorites])


  const handleChange = prop => event => {
    setValues({ ...values, paginator: event.target.value })
  }

  if (cases.length < 1) {
    return (<Spinner />)
  } else {
    return (
      <>
        <Container maxWidth='lg'>
          <center><img src={titleSvg} alt='Cas Cliniques' /></center>
          <Paginator pages={pages} onChange={handleChange} current={values.paginator} /> {cases.length > 0 ? '[page ' + values.paginator + ']' : ''}
          <div className={classes.root}>
            {areLoaded && cases.map((oCase, index) => {
              var isFavorite = false
              if (favorites.length > 0) {
                favorites.map((item) => {
                  var slashIndex = item.clinicalCaseId !== undefined ? item.clinicalCaseId.lastIndexOf('/') : false
                  var caseId = slashIndex ? Number(item.clinicalCaseId.substr(slashIndex).substr(1, slashIndex.length)) : item.user.id
                  if (caseId === oCase.id) { isFavorite = true }
                  return isFavorite
                })
              }

              return <CasesItem key={index} item={oCase} favorite={isFavorite} />
            })}
          </div>
          <Paginator pages={pages} onChange={handleChange} current={values.paginator} />
        </Container>
      </>
    )
  }
}

export default CasesList
