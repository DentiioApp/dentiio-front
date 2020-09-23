import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import { fetchCases, fetchUserFav } from '../../../services/Cases'
import { CASES_LIST, INIT_FAV_CASE } from '../../../store/actions'
import CasesItem from '../CaseItem/CaseItem'
import Paginator from '../../UI/Paginator/Paginator'
import titleSvg from '../../../images/maquette/c-case-title.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(3)
    },
  }
}))

const CasesList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)
  const homeCase = home.cases
  const filteredCase = useSelector((state) => state.cases.cases)
  const favorites = useSelector((state) => state.cases.favorites)
  const cases = filteredCase.length > 0 ? filteredCase : homeCase
  const nbrCases = home.nbrCases
  const areLoaded = home.casesLoaded
  const pages = Math.round(nbrCases / 30)

  const initValues = {
    paginator: 1
  }
  const [values, setValues] = useState(initValues)

  const initUserFav = async () => {
      const response = await fetchUserFav()
      const regex2 = RegExp(/Error/)
      if (!regex2.test(response)) {
        dispatch({ type: INIT_FAV_CASE, data: response.datas })
      }
  }

  useEffect(() => {
    getCases()
  }, [values.paginator])

  useEffect(() => {
    if (favorites && favorites.length < 1) { initUserFav() }
  }, [favorites])
  const handleChange = prop => event => {
    setValues({ ...values, paginator: event.target.value })
  }

  const getCases = async () => {
    const fetch = await fetchCases(values.paginator)
    const regex2 = RegExp(/Error/)
    if (fetch.message !== undefined &&!regex2.test(fetch.message)) {
      dispatch({ type: CASES_LIST, datas: fetch.datas, nbrItems: fetch.items })
    }
  }

  return (
    <>
      <Container maxWidth='lg'>
        <center><img src={titleSvg} alt='Cas Cliniques' /></center>
        <Paginator pages={pages} onChange={handleChange} current={values.paginator} />
        <div className={classes.root}>
          {areLoaded && cases.map((oCase, index) => {
            var isFavorite = false;
            if(favorites.length > 0){
              favorites.map((item)=> { 
                if (item.clinicalCaseId.substr(-1,1) == oCase.id)
                  isFavorite = true;
              })
            }
            
            return <CasesItem key={index} item={oCase} favorite={isFavorite} />
          })}
        </div>

        <Paginator pages={pages} onChange={handleChange} current={values.paginator}/>
      </Container>
    </>
  )
}

export default CasesList
