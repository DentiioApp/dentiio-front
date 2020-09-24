import './diagnostic.scss'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Paper,
  Typography
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'
import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL } from '../../../store/actions'

import { setup } from '../../../services/Auth'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Diagnostic = (props) => {
  const classes = useStyles()
  const pathologies = useSelector((state) => state.home.pathologies)
  const symptomes = useSelector((state) => state.home.symptomes)

  const dispatch = useDispatch()
  const initVals = {
    errPathologies: false,
    errDiagnostic: false,
    errSymptomes: false
  }
  const [errors, setErrors] = useState(initVals)

  const catchSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if (props.values.diagnostic === '') { setErrors({ ...errors, errDiagnostic: true }); isValid = false }
    if (props.values.pathologies.length < 1) { setErrors({ ...errors, errPathologies: true }); isValid = false }
    if (props.values.symptomes.length < 1) { setErrors({ ...errors, errSymptomes: true }); isValid = false }

    if (isValid) { dispatch({ type: UPDATE_LEVEL, level: 'treatplan' }) }
  }

  const catchOnmit = async (event) => {
    event.preventDefault()
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
              Diagnostic
            </Typography>
            <form className={classes.form} noValidate>

              <TextField
                aria-label='minimum height'
                placeholder='diagnostic'
                variant='outlined'
                label='Intraorale et extraorale'
                multiline
                autoFocus
                fullWidth
                margin='dense'
                required
                name='diagnostic'
                type='textarea'
                id='diagnostic'
                value={props.values.diagnostic}
                autoComplete='current-diagnostic'
                onChange={props.onChange('diagnostic')}
                error={errors.errDiagnostic}
              />

              <br /> <br />

              <Typography component='h1' variant='h5'>
                Pathologies
              </Typography>
              <TextField
                className='textField'
                id='pathologies'
                select
                label='Pathologies'
                onChange={props.onChange('pathologies')}
                variant='outlined'
                fullWidth
                SelectProps={{
                  multiple: true,
                  value: props.values.pathologies
                }}
                error={errors.errPathologies}
              >
                {pathologies && pathologies.map((value) => (
                  <MenuItem key={value['@id']} value={value['@id']}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>

              <br /> <br />

              <Typography component='h1' variant='h5'>
                Symptomes
              </Typography>
              <TextField
                className='textField'
                id='Symptomes'
                label='Symptomes'
                select
                onChange={props.onChange('symptomes')}
                variant='outlined'
                fullWidth
                SelectProps={{
                  multiple: true,
                  value: props.values.symptomes
                }}
                error={errors.errSymptomes}
              >
                {symptomes && symptomes.map((value) => (
                  <MenuItem key={value['@id']} value={value['@id']}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>

              <br /> <br />

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

export default Diagnostic
