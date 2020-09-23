import './patient.scss'

import React from 'react'
import { useDispatch } from 'react-redux'

import {
  Paper,
  Switch,
  Typography,
  TextareaAutosize
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'

import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL, INIT_PATIENT } from '../../../store/actions'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import { setup } from '../../../services/Auth'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'
import config from '../../../config'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Patient = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const ages = config.ages

  const catchSubmit = async (event) => {
    event.preventDefault()
    dispatch({
      type: INIT_PATIENT,
      data: {
        age: props.values.age,
        gender: props.values.gender,
        isSmoker: props.values.isSmoker,
        is_medical_background: props.values.is_medical_background,
        problem_health: props.values.problem_health,
        in_treatment: props.values.in_treatment
      }
    })
    dispatch({ type: UPDATE_LEVEL, level: 'exam' })
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
                className='textField'
                id='age'
                select
                onChange={props.onChange('age')}
                variant='outlined'
                value={props.values.age === undefined ? 18 : props.values.age}
              >
                {ages && ages.map((index, value) => (
                  <MenuItem key={index + 1} value={value}>
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
                value={props.values.gender === '' ? 'Monsieur' : props.values.gender}
                onChange={props.onChange('gender')}
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
                checked={props.values.isSmoker}
                onChange={props.onChange('isSmoker')}
                color='primary'
                name='isSmoker'
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />

              <br />  <br />

              <InputLabel className='inputLabel'>
              Antécedant medical
              </InputLabel>
              <Switch
                checked={props.values.is_medical_background}
                onChange={props.onChange('is_medical_background')}
                color='primary'
                name='is_medical_background'
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />

              <br />  <br />
              <InputLabel className='inputLabel'>
                Probleme cardiaque
              </InputLabel>
              <TextareaAutosize
                aria-label='minimum height'
                rowsMin={3} placeholder='Renseignez le(s) probleme(s) cardiaque'
                variant='outlined'
                margin='normal'
                required
                name='problem_health'
                type='textarea'
                id='problem_health'
                autoComplete='current-problem_health'
                // onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={props.onChange('problem_health')}
              />

              <InputLabel className='inputLabel'>
                Sous traitement :
              </InputLabel>
              <TextareaAutosize
                aria-label='minimum height'
                rowsMin={3} placeholder='Renseignez le(s) traitement(s)'
                variant='outlined'
                margin='normal'
                required
                name='in_treatment'
                type='textarea'
                id='in_treatment'
                autoComplete='current-in_treatment'
                // onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={props.onChange('in_treatment')}
              />

              <div onClick={catchSubmit}>
                <GradientBtn
                  variant='contained'
                  type='submit'
                  description='Suivant'
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
