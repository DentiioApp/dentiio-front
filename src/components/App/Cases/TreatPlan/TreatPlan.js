import './treatPlan.scss'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Paper,
  Typography,
  Button
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import oStyle from '../../../UI/ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL } from '../../../../store/actions'
import InputLabel from '@material-ui/core/InputLabel'

import imgDesktop from '../../../../images/illus.png'
import imgMobile from '../../../../images/mobile-bg.svg'
import logo from '../../../../images/logo.svg'
import avatar from '../../../../images/logoteeth_blue.png'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const TreatPlan = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const treatments = useSelector((state) => state.home.treatments)

  const initVals = {
    errStep: false,
    errTreatment: false
  }
  const [errors, setErrors] = useState(initVals)

  const catchSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if (props.values.step.length < 1) { setErrors({ ...errors, errStep: true }); isValid = false }
    if (props.values.treatment.length < 1) { setErrors({ ...errors, errTreatment: true }); isValid = false }

    if (isValid) { dispatch({ type: UPDATE_LEVEL, level: 'evolution' }) }
  }

  const catchOnmit = async (event) => {
    event.preventDefault()
    dispatch({ type: UPDATE_LEVEL, level: 'diagnostic' })
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
              Plan de traitement
            </Typography>
            <form className={classes.form} noValidate>
              <InputLabel className='inputLabel'>
                Etape 1
              </InputLabel>
              <TextField
                aria-label='minimum height'
                placeholder='Renseignez le(s) probleme(s) cardiaque'
                variant='outlined'
                margin='normal'
                required
                autoFocus
                label='Etape 1'
                multiline
                name='step1'
                type='textarea'
                id='step1'
                value={props.values.step}
                autoComplete='current-step1'
                onChange={props.onChange('step')}
                error={errors.errStep}
              />

              <InputLabel className='inputLabel'>
                Etape 2
              </InputLabel>
              <TextField
                aria-label='minimum height'
                rowsMin={3} placeholder='Renseignez le(s) traitement(s)'
                variant='outlined'
                margin='normal'
                required
                label='Etape 2'
                multiline
                name='step2'
                type='textarea'
                id='step2'
                value={props.values.step}
                autoComplete='current-in_treatment'
                onChange={props.onChange('step')}
                error={errors.errStep}
              />

              <InputLabel className='inputLabel'>
                Etape 3
              </InputLabel>
              <TextField
                aria-label='minimum height'
                placeholder='Renseignez le(s) traitement(s)'
                variant='outlined'
                margin='normal'
                required
                label='Etape 3'
                multiline
                name='step3'
                type='textarea'
                id='step3'
                autoComplete='current-step'
                value={props.values.step}
                onChange={props.onChange('step')}
                error={errors.errStep}
              />

              <InputLabel className='inputLabel'>
                Treatments
              </InputLabel>
              <TextField
                className='textField'
                id='treatment'
                select
                onChange={props.onChange('treatment')}
                variant='outlined'
                fullWidth
                SelectProps={{
                  multiple: true,
                  value: props.values.treatment
                }}
                error={errors.errTreatment}
              >
                {treatments && treatments.map((value) => (
                  <MenuItem key={value['@id']} value={value['@id']}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>

              <br />  <br />

              <center>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    type='submit'
                    onClick={catchOnmit}
                  >
                    <ArrowBackIcon />
                  </Button>

                  <Button
                    variant='contained'
                    type='submit'
                    onClick={catchSubmit}
                  >
                    <ArrowForwardIcon />
                  </Button>
                </Grid>
              </center>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default TreatPlan
