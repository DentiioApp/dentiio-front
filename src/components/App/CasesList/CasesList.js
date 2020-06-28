import React from 'react'
import { useSelector } from 'react-redux'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

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
  const cases = useSelector((state) => state.home.cases)
  
  return (
    <>
      <Container maxWidth='lg'>
        <center><img src={titleSvg} alt='Cas Cliniques' /></center>
        <div className={classes.root}>
          { cases && 
            cases.map((oCase, index) => (
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
