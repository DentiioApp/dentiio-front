import './evolution.scss'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  Paper,
  Typography,
  TextField
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'

import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL } from '../../../store/actions'

import { setup } from '../../../services/Auth'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Evolution = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const initVals = {
    errEvolution: false
  }
  const [errors, setErrors] = useState(initVals)

  const catchSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if (props.values.evolution === '') { setErrors({ ...errors, errEvolution: true }); isValid = false }
    if (isValid) { dispatch({ type: UPDATE_LEVEL, level: 'conclusion' }) }
  }

  const catchOnmit = async (event) => {
    event.preventDefault()
    dispatch({ type: UPDATE_LEVEL, level: 'treatplan' })
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
              Evolution
            </Typography>
            <form className={classes.form} noValidate>

              <TextField
                aria-label='minimum height'
                rowsMin={3} placeholder='evolution'
                variant='outlined'
                margin='normal'
                required
                name='evolution'
                autoFocus
                type='textarea'
                id='evolution'
                value={props.values.evolution}
                autoComplete='current-evolution'
                onChange={props.onChange('evolution')}
                error={errors.errEvolution}
              />

              <div className='row'>
                <div onClick={catchOnmit}>
                  <GradientBtn
                    variant='contained'
                    type='submit'
                    description='PRECEDENT'
                    className='GradientBtn'
                  />
                </div>
                <div onClick={catchSubmit}>
                  <GradientBtn
                    variant='contained'
                    type='submit'
                    description='SUIVANT'
                    className='GradientBtn'
                  />
                </div>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Evolution
