import './signIn.scss'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

import {
  Typography,
  Link
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import GradientBtn from '../../../UI/buttons/GradientBtn'
import { SUBSCRIBE_FORM, LOG_USER, START_LOADER, STOP_LOADER } from '../../../../store/actions'
import { loginCheck } from '../../../../services/Users'
import { setup } from '../../../../services/Auth'
import config from '../../../../config'
import { errorApi } from '../../../../utils'
import FormControl from "@material-ui/core/FormControl";
import {InputLabel} from "@material-ui/core";

const SignIn = () => {
  const dispatch = useDispatch()
  const subscribeMsg = localStorage.getItem('authSubscribeMsg')
  const { addToast } = useToasts()
  const messages = config.messages.auth

  const initValues = {
    email: '',
    password: '',
    showPassword: false
  }

  const [values, setValues] = useState(initValues)
  const [errEmail, setErrEmail] = useState(false)
  const [errPassword, setErrPassword] = useState(false)

  const onKeyUp = (event) => {
    if (event.keyCode === 13) {
      catchSubmit(event)
    }
  }

  const catchSubmit = async (e) => {
    e.preventDefault()

    if (values.password !== '' && values.email !== '') {
      dispatch({ type: START_LOADER })
      const response = await loginCheck(values.email, values.password)
      dispatch({ type: STOP_LOADER })

      if (errorApi().test(response)) {
        addToast(messages.signin.error, { appearance: 'error' })
      } else {
        addToast(messages.signin.success, { appearance: 'success' })
        dispatch({ type: LOG_USER, datas: response.datas })
      }
    } else {
      setErrEmail(true)
      setErrPassword(true)
    }
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }


  if (setup()) {
    return <Redirect to='/cases' />
  }

  return (
    <>
      <Grid container component='main' >
        <Grid item xs={1} md={3}>
        </Grid>
        <Grid item xs={10} md={6}>
            <Typography component='h1' variant='h4' className='title'>
              <center>Je me connecte</center>
            </Typography>
            <br />
            <form noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                autoFocus
                name='email'
                label='Adresse email'
                type='text'
                id='email'
                autoComplete='current-email'
                onChange={handleChange('email')}
                error={errEmail}
              />

              <br /><br />
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Mot de passe*</InputLabel>
                <OutlinedInput
                    variant='outlined'
                    required
                    fullWidth
                    name='password'
                    label='Mot de passe*'
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    id='outlined-adornment-password'
                    autoComplete='on'
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
                    onKeyUp={onKeyUp}
                />
              </FormControl>

              <br/><br/>
              <Typography align='left' component='h1' variant='body1'>
                <span>
                  <Link href='#' color='primary'>
                    Mot de passe oublié ?
                  </Link>
                </span>
              </Typography>

              <br/><br/>

              <GradientBtn
                variant='contained'
                type='submit'
                description='SE CONNECTER'
                className='GradientBtn'
                onClick={catchSubmit}
              />
            </form>
          {subscribeMsg}
        </Grid>
      </Grid>
    </>
  )
}

export default SignIn
