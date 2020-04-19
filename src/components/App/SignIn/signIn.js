import './signIn.scss'

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Grid from '@material-ui/core/Grid'
import GradientBtn from '../../UI/buttons/GradientBtn'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Redirect } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl'
import { logUser } from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import oStyle from '../../../services/Css/css'
import img from '../../../images/auth.svg'
import {
  CssBaseline,
  Paper
} from '@material-ui/core/'
import { checkEmail, checkPassword, existEmail } from '../../../utils/Auth'

const useStyles = makeStyles((theme) => (oStyle(theme, img)))

const SignIn = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const initValues = {
    pseudo: '',
    password: '',
    showPassword: false
  }

  const [values, setValues] = useState(initValues)
  const [errEmail, setErrEmail] = useState(false)
  const [errPassword, setErrPassword] = useState(false)

  const catchSubmit = (e) => {
    e.preventDefault()

    if (values.password && values.pseudo) {
      const signin = {
        pseudo: values.pseudo,
        password: values.password
      }

      dispatch(logUser(signin))
    } else {
      setErrEmail(true)
      setErrPassword(true)
      return false
    }

    setValues(initValues)
  }

  const handleChange = prop => event => {
    if (prop === 'email') {
      if (checkEmail(event.target.value) === false || existEmail(event.target.value) === true) {
        setErrEmail(true)
      } else {
        setErrEmail(false)
      }
    }
    if (prop === 'password') {
      if (checkPassword(event.target.value) === false) {
        setErrPassword(true)
      } else {
        setErrPassword(false)
      }
    }
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  if (user.details !== undefined && user.connected === true) {
    return <Redirect to='/cases' />
  };

  return (
    <>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <FormControl variant='outlined'>
                <TextField
                  id='pseudo-basic' required
                  label='Pseudo'
                  value={values.pseudo}
                  onChange={handleChange('pseudo')}
                  variant='outlined'
                  error={errEmail}
                />
              </FormControl>

              <OutlinedInput
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                id='outlined-adornment-password'
                autoComplete='on'
                placeholder='Password'
                error={errPassword}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position='start'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              <br />  <br />

              <div onClick={catchSubmit}>
                <GradientBtn
                  variant='contained'
                  type='submit'
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

export default SignIn
