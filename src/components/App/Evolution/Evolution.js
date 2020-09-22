import './evolution.scss'

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

const Evolution = (setValues, values) => {
  const classes = useStyles()
  // const dispatch = useDispatch()
  // const { addToast } = useToasts()
  const messages = config.messages.auth
  const ages = config.ages

  

  const catchSubmit = async (event) => {
    event.preventDefault()
    const datas = await postPatient(values)
    const regex2 = RegExp(/Error/)
    if (regex2.test(datas)) {
      return { message: messages.patient.error, appearance: 'error' }
    } else {
      return { message: messages.patient.success, appearance: 'success' }
    }
  }

  const handleChange = prop => event => {
    if (prop === 'isSmoker' || prop === 'is_medical_background') { setValues({ ...values, [prop]: event.target.checked }) } 
    else { setValues({ ...values, [prop]: event.target.value }) }
  }

  postCase(/*item*/)
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
              Fiche Patient
            </Typography>
            <form className={classes.form} noValidate>

              <TextField
                className='textField'
                id='age'
                select
                onChange={handleChange('age')}
                variant='outlined'
              >
                {ages && ages.map((value,index) => (
                  <MenuItem key={index+1} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>

        
              <InputLabel className='inputLabel'>
              Genre :
              </InputLabel>
              <TextField
                className='textField'
                id='gender'
                select
                value={values.gender === '' ? 'none' : values.gender}
                onChange={handleChange('gender')}
                variant='outlined'
              >
                <MenuItem key='Mr' value='Monsieur'>
                  {'Monsieur'}
                </MenuItem>
                <MenuItem key='Mme' value='Madame'>
                  {'Madame'}
                </MenuItem>

              </TextField>

              <br />  <br />

              <InputLabel className='inputLabel'>
              Fumeur :
              </InputLabel>
              <Switch
                checked={values.isSmoker}
                onChange={handleChange('isSmoker')}
                color='primary'
                name='isSmoker'
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />

              <br />  <br />

              <InputLabel className='inputLabel'>
              Antécedant medical
              </InputLabel>
               <Switch
                checked={values.is_medical_background}
                onChange={handleChange('is_medical_background')}
                color='primary'
                name='is_medical_background'
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />

              <br />  <br />
              <InputLabel className='inputLabel'>
                Probleme cardiaque
              </InputLabel>
              <TextareaAutosize
                aria-label="minimum height" 
                rowsMin={3} placeholder="Renseignez le(s) probleme(s) cardiaque"
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='problem_health'
                type='textarea'
                id='problem_health'
                autoComplete='current-problem_health'
                //onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={handleChange('problem_health')}
              />
              
              <InputLabel className='inputLabel'>
                Sous traitement :
              </InputLabel>
              <TextareaAutosize
                aria-label="minimum height" 
                rowsMin={3} placeholder="Renseignez le(s) traitement(s)"
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='in_treatment'
                type='textarea'
                id='in_treatment'
                autoComplete='current-in_treatment'
                //onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={handleChange('in_treatment')}
              />
                

              <div onClick={catchSubmit}>
                <GradientBtn
                  variant='contained'
                  type='submit'
                  description='Se connecter'
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

export default Evolution
