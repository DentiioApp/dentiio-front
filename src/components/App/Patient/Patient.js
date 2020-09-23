import './patient.scss'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  Paper,
  Switch,
  Typography
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'

import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL } from '../../../store/actions'
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

  const initVals = {
    errAge: false,
    errGender: false,
    errIn_treatment: false,
    errProblem_health: false,
  }
  const [errors, setErrors] = useState(initVals)

  const catchSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if(props.values.age === ""){ setErrors({...errors, errAge: true}); isValid=false}
    if(props.values.gender === ""){  setErrors({...errors, errGender: true}); isValid=false}
    if(props.values.problem_health === ""){  setErrors({...errors, errProblem_health: true}); isValid=false}
    if(props.values.in_treatment === ""){  setErrors({...errors, errIn_treatment: true}); isValid=false}

    if(isValid)
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
              <Typography className='inputLabel'>
                Age
              </Typography>
              <TextField
                className='textField'
                id='age'
                label='Age'
                select
                onChange={props.onChange('age')}
                variant='outlined'
                value={props.values.age === undefined ? 18 : props.values.age}
                error={errors.errAge}
              >
                {ages && ages.map((index, value) => (
                  <MenuItem key={index + 1} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>

              <InputLabel className='inputLabel'>
                Genre
              </InputLabel>
              <TextField
                className='textField'
                id='gender'
                label="Genre"
                select
                value={props.values.gender === '' ? 'Monsieur' : props.values.gender}
                onChange={props.onChange('gender')}
                variant='outlined'
                error={errors.errGender}
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
                checked={props.values.isASmoker}
                onChange={props.onChange('isASmoker')}
                color='primary'
                name='isASmoker'
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
              <TextField
                aria-label='minimum height'
                placeholder='Renseignez le(s) probleme(s) cardiaque'
                variant='outlined'
                margin='normal'
                label="Probleme cardiaque"
                multiline
                required
                name='problem_health'
                type='textarea'
                id='problem_health'
                autoComplete='current-problem_health'
                // onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={props.onChange('problem_health')}
                error={errors.errProblem_health}
              />

              <InputLabel className='inputLabel'>
                Sous traitement
              </InputLabel>
              <TextField
                aria-label='minimum height'
                placeholder='Renseignez le(s) traitement(s)'
                variant='outlined'
                label="Sous traitement"
                multiline
                margin='normal'
                required
                name='in_treatment'
                type='textarea'
                id='in_treatment'
                autoComplete='current-in_treatment'
                // onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={props.onChange('in_treatment')}
                error={errors.errIn_treatment}
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
