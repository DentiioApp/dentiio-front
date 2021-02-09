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
import {LOG_USER} from '../../../../store/actions'
import { loginCheck } from '../../../../services/Users'
import { setup } from '../../../../services/Auth'
import config from '../../../../config'
import { errorApi } from '../../../../utils'
import FormControl from "@material-ui/core/FormControl";
import {InputLabel} from "@material-ui/core";
import Spinner from "../../../UI/Dawers/Spinner";

const SignIn = () => {
  const dispatch = useDispatch()
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
  const [showButton, setshowButton] = useState(true)
  const [showSpinner, setshowSpinner] = useState(false)

  const onKeyUp = (event) => {
    if (event.keyCode === 13) {
      catchSubmit(event).then()
    }
  }

  const catchSubmit = async (e) => {
    e.preventDefault()
    setshowButton(false)
    setshowSpinner(true)
    if (values.password !== '' && values.email !== '') {
      const response = await loginCheck(values.email, values.password)
      if (errorApi().test(response)) {
        addToast(messages.signin.error, { appearance: 'error' })
      } else {
        addToast(messages.signin.success, { appearance: 'success' })
        dispatch({ type: LOG_USER, datas: response.datas.data, password: values.password })
      }
    } else {
      setErrEmail(true)
      setErrPassword(true)
    }
    setshowButton(true)
    setshowSpinner(false)
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
        <Grid item xs={1} md={3} lg={4}>
        </Grid>
        <Grid item xs={10} md={6} lg={4}>
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
              {/*<Typography align='left' component='h1' variant='body1'>
                <span>
                  <Link href='#' color='primary'>
                    Mot de passe oublié ?
                  </Link>
                </span>
              </Typography>

              <br/><br/>*/}

              <div onClick={(e) => (catchSubmit(e))} hidden={!showButton}>
              <GradientBtn
                variant='contained'
                type='submit'
                description='SE CONNECTER'
                className='GradientBtn'
                onClick={catchSubmit}
              />
              </div>
              <div hidden={!showSpinner} style={{marginTop: '-50px'}}>
                <Spinner/>
              </div>
            </form>
        </Grid>
      </Grid>
    </>
  )
}

export default SignIn
