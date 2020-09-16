import './status.scss'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
//import { Redirect } from 'react-router-dom'
//import { useToasts } from 'react-toast-notifications'

import {
  Paper,
  Typography
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
//import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import { makeStyles } from '@material-ui/core/styles'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'

import { cardSave } from '../../../store/actions'
import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { checkFiles } from '../../../utils'

import { setup } from '../../../services/Auth'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'


const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Status = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const initValues = {
    cpsCard: '',
    studyCard: ''
  }

  const [values, setValues] = useState(initValues)
  const [errCard, setErrCard] = useState(false)

  const catchSubmit = (e) => {
    e.preventDefault()

  
    if (!errCard) {
      return false
    } else {
      dispatch(
        cardSave({
          nom: values.name,
          size: values.size,
          url: values.url
        })
      )
    }
  }

  const handleChange = prop => event => {
    let checkedFile = ''
    if (prop === 'cpsCard' || prop === 'studyCard') {
      checkedFile = checkFiles(event)
      if (checkedFile.error === true) {
        setErrCard(checkedFile.message)
      } else {
        setErrCard(false)
      }
    }

    setValues({ ...values, [prop]: event.target.value })
  }

  setup()

  return (
    <>
      <Grid container component='main' className={classes.root}>
        <img className={classes.logo} alt='' src={logo} />
        <Grid
          item
          xs={10}
          sm={8}
          md={8}
          lg={5}
          component={Paper}
          elevation={6}
          square
          className={classes.login}
        >
          <div className={classes.paper}>
            <img className={classes.avatar} alt='' src={avatar} />
            <Typography component='h1' variant='h5'>
              Je Valide Mon Status
            </Typography>
            <form className={classes.form} noValidate>
              <Button variant='contained' component='label'>
                Ma carte CPS
                <input
                  type='file'
                  onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit}
                  onChange={handleChange('cpsCard')}
                  name='cps'
                  id='cps'
                  multiple
                />
              </Button>
              <FormHelperText id='my-helper-text'>{errCard || ''}</FormHelperText>

              <div onClick={catchSubmit}>
                <GradientBtn
                  variant='contained'
                  type='submit'
                  description='Reclamer mon statut'
                  className='GradientBtn'
                />
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Status
