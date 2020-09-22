import './conclusion.scss'

import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { useToasts } from 'react-toast-notifications'

import {
  Paper,
  Switch,
  Typography,
  TextareaAutosize,
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'
import Button from '@material-ui/core/Button'
import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../ResponsiveDesign/AuthStyle'
// import { logUser } from '../../../store/actions'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import { setup } from '../../../services/Auth'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'
import config from '../../../config'
import {postCase} from '../../../services/Cases'
import {postPatient} from '../../../services/Patient'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Conclusion = (setvalues, values) => {
  const classes = useStyles()
  const messages = config.messages.auth
  const catchSubmit = async (event) => {
    
  }

  const handleChange = prop => event => {
    setvalues({ ...values, [prop]: event.target.value }) 
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
              Conclusion
            </Typography>
            <form className={classes.form} noValidate>
 
              <TextareaAutosize
                aria-label="minimum height" 
                rowsMin={3} placeholder="Conclusion"
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='conclusion'
                type='textarea'
                id='conclusion'
                autoComplete='current-conclusion'
                //onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={handleChange('conclusion')}
              />

              <div onClick={catchSubmit}>
                <GradientBtn
                  variant='contained'
                  type='submit'
                  description='SUIVANT'
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

export default Conclusion
