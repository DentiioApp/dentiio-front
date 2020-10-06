import './patient.scss'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  Paper,
  Switch,
  Typography,
  Button
} from '@material-ui/core/'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms'
import LocalBarIcon from '@material-ui/icons/LocalBar'
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'

import oStyle from '../../ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL } from '../../../store/actions'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'
import config from '../../../config'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Patient = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { ages, sexes } = config

  const initVals = {
    errAge: false,
    errGender: false,
    errReason_consultation: false
  }
  const [errors, setErrors] = useState(initVals)

  const catchSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if (props.values.age === '') { setErrors({ ...errors, errAge: true }); isValid = false }
    if (props.values.gender === '') { setErrors({ ...errors, errGender: true }); isValid = false }
    if (props.values.reason_consultation === '') { setErrors({ ...errors, errReason_consultation: true }); isValid = false }
    if (isValid) { dispatch({ type: UPDATE_LEVEL, level: 'exam' }) }
  }

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
                label='Age'
                select
                fullWidth
                onChange={props.onChange('age')}
                variant='outlined'
                value={props.values.age === undefined ? 18 : props.values.age}
                error={errors.errAge}
              >
                {ages && ages.map((index, value) => (
                  <MenuItem key={index + 1} value={value}>
                    {value + ' ans'}
                  </MenuItem>
                ))}
              </TextField>

              <br /> <br />

              <TextField
                className='textField'
                id='gender'
                label='HOMME / FEMME'
                select
                fullWidth
                value={props.values.gender === undefined ? 'M' : props.values.gender}
                onChange={props.onChange('gender')}
                variant='outlined'
                error={errors.errGender}
              >
                {sexes && sexes.map((value, id) => (
                  <MenuItem key={id} value={value.id}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>

              <br /> <br />

              <InputLabel className='inputLabel'>
                Fumeur <SmokingRoomsIcon />
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
                Buveur <LocalBarIcon />
              </InputLabel>
              <Switch
                checked={props.values.isDrinker}
                onChange={props.onChange('isDrinker')}
                color='primary'
                name='isDrinker'
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />

              <br />  <br />

              <TextField
                aria-label='minimum height'
                placeholder='Antécédents médicauts'
                variant='outlined'
                margin='normal'
                label='Antécédents médicauts'
                multiline
                autoFocus
                required
                fullWidth
                name='old_injury'
                type='textarea'
                id='old_injury'
                value={props.values.old_injury}
                autoComplete='current-old_injury'
                onChange={props.onChange('problem_health')}
                error={errors.errProblem_health}
              />

              <TextField
                aria-label='minimum height'
                placeholder='Renseignez le(s) traitement(s)'
                variant='outlined'
                label='Sous traitement'
                multiline
                fullWidth
                margin='normal'
                required
                name='current_treatment'
                type='textarea'
                id='current_treatment'
                value={props.values.errCurrent_treatment}
                autoComplete='current-current_treatment'
                onChange={props.onChange('current_treatment')}
                error={errors.errCurrent_treatment}
              />

              <TextField
                aria-label='minimum height'
                placeholder='Allergie(s)'
                variant='outlined'
                label='Allergie(s)'
                multiline
                fullWidth
                margin='normal'
                name='allergies'
                type='textarea'
                id='current_allergies'
                value={props.values.allergies}
                autoComplete='current-allergies'
                onChange={props.onChange('allergies')}
                error={errors.errAllergies}
              />

              <br />  <br />

              <TextField
                aria-label='minimum height'
                placeholder='Motif de la consultation'
                variant='outlined'
                margin='normal'
                label='Motif de la consultation'
                multiline
                autoFocus
                required
                fullWidth
                name='reason_consultation'
                type='textarea'
                id='reason_consultation'
                value={props.values.reason_consultation[0]}
                autoComplete='current-reason_consultation'
                onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={props.onChange('reason_consultation')}
                error={errors.errReason_consultation}
              />

              <br />  <br />

              <center>
                <Button
                  variant='contained'
                  type='submit'
                  onClick={catchSubmit}
                >
                  <ArrowForwardIcon />
                </Button>
              </center>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Patient
