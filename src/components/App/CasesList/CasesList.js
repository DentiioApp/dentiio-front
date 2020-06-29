import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import { tryCases } from '../../../services/Cases'
import { CASES_LIST } from '../../../store/actions'
import CasesItem from '../CaseItem/CaseItem'
import titleSvg from '../../../images/maquette/c-case-title.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(3)
    }
  }
}))

const CasesList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const home = useSelector((state) => state.home)
  const cases = useSelector((state) => state.home.cases)
  
  const areLoaded = home.casesLoaded

  useEffect(() => {
    if (!areLoaded) {
      const getCases = tryCases()
      getCases.then(response => { 
        if(response.message === 'Network error') {

        }else{
          dispatch({ type: CASES_LIST, data: response.datas})
        }
      })
    }
  })

  return (
    <>
      <Container maxWidth='lg'>
        <center><img src={titleSvg} alt='Cas Cliniques' /></center>
        <div className={classes.root}>
          { cases.map((oCase, index) => (
              <CasesItem key={index} item={oCase} />
              )
            )
          }
        </div>
      </Container>
    </>
  )
}

export default CasesList
