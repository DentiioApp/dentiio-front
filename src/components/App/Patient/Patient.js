import './patient.scss'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

import {
  Paper,
  Typography
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'

import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../ResponsiveDesign/AuthStyle'
//import { logUser } from '../../../store/actions'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import { setup } from '../../../services/Auth'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'
import config from '../../../config'
import { postPatient } from '../../../services/Patient'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Patient = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const messages = config.messages.auth

  const initValues = {
    age: '',
    gender: '',
    isSmoker: false,
    is_medical_background: false,
    problem_health: 'none', 
    in_treatment: 'none',
  }
  const boolean = { 0:'Oui', 1: 'Non'}

  const [values, setValues] = useState(initValues)

  const catchSubmit = async(event) => {
    event.preventDefault()
    const datas = await postPatient(values)
    const regex2 = RegExp(/Error/)
    if (regex2.test(datas)) {
      return { message: messages.patient.error, appearance: 'error'}
    } else {
      return { message: messages.patient.success, appearance: 'success'}
    }
  }

  const handleChange = prop => event => {
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
              Fiche Patient
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                autoFocus
                name='age'
                label='age'
                type='text'
                id='age'
                autoComplete='current-age'
                onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={handleChange('age')}
                //error={}
              />
              <InputLabel className='inputLabel' shrink ></InputLabel>
              <InputLabel className='inputLabel' >
              Genre* :
              </InputLabel>
              <TextField
                className='textField'
                id='gender'
                select
                value={values.gender === '' ? 'none' : values.gender}
                onChange={handleChange('gender')}
                variant='outlined'
              >
                <MenuItem key='Mr' value='Monsieur' disabled>
                  {'Monsieur'}
                </MenuItem>
                <MenuItem key='Mme' value='Madame'>
                  {'Madame'}
                </MenuItem>
                
              </TextField>

              <br />  <br />

              <InputLabel className='inputLabel'>
              Fumeur* :
              </InputLabel>
              <TextField
                className='textField'
                id='isSmoker'
                select
                value={values.isSmoker === '' ? 'none' : values.isSmoker}
                onChange={handleChange('isSmoker')}
                variant='outlined'
              >
                <MenuItem key='o' value='oui' disabled>
                  {'OUI'}
                </MenuItem>
                <MenuItem key='n' value='non' disabled>
                  {'NON'}
                </MenuItem>
              </TextField>

              <br />  <br />

              <InputLabel className='inputLabel'>
              Antécedant medical* :
              </InputLabel>
              <TextField
                className='textField'
                id='is_medical_background'
                select
                value={values.is_medical_background === '' ? 'none' : values.is_medical_background}
                onChange={handleChange('is_medical_background')}
                variant='outlined'
              >
                <MenuItem key='o' value='oui' disabled>
                  {'OUI'}
                </MenuItem>
                <MenuItem key='n' value='non' disabled>
                  {'NON'}
                </MenuItem>
              </TextField>

              <br />  <br />

              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                autoFocus
                name='problem_health'
                label='problem_health'
                type='text'
                id='problem_health'
                autoComplete='current-problem_health'
                onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={handleChange('problem_health')}
                //error={errEmail}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                autoFocus
                name='in_treatment'
                label='in_treatment'
                type='text'
                id='in_treatment'
                autoComplete='current-in_treatment'
                onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={handleChange('in_treatment')}
                //error={errEmail}
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

export default Patient
