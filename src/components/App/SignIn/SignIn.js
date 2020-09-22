import './signIn.scss'

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

import {
  Paper,
  Typography
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { logUser } from '../../../store/actions'

import { tryLogin } from '../../../services/Users'
import { setup } from '../../../services/Auth'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'
import config from '../../../config'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const SignIn = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const subscribeMsg = localStorage.getItem('authSubscribeMsg')
  const { addToast } = useToasts()
  const messages = config.messages.auth

  const initValues = {
    pseudo: '',
    password: '',
    showPassword: false
  }

  const [datas, setDatas] = useState('')
  const [values, setValues] = useState(initValues)
  const [errEmail, setErrEmail] = useState(false)
  const [errPassword, setErrPassword] = useState(false)

  useEffect(() => {
    if (datas !== '') {
      dispatch(logUser(datas))
    }
  })

  const catchSubmit = async (e) => {
    e.preventDefault()

    if (values.password !== '' && values.pseudo !== '') {
      const respo = sendRequest()
      respo.then((res) => {
        addToast(res.message, { appearance: res.appearance })
      })
    } else {
      addToast(messages.signin.error, { appearance: 'error' })
      setErrEmail(true)
      setErrPassword(true)
      return false
    }

    setValues(initValues)
  }

  const sendRequest = async () => {
    const datas = await tryLogin(values.pseudo, values.password)
    const regex2 = RegExp(/Error/)

    if (regex2.test(datas)) {
      return { message: messages.signin.error, appearance: 'error' }
    } else {
      setDatas(datas)

      return { message: messages.signin.success, appearance: 'success' }
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

  if (setup() === true) {
    return <Redirect to='/cases' />
  };

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
              Connexion
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                autoFocus
                name='pseudo'
                label='pseudo'
                type='text'
                id='pseudo'
                autoComplete='current-pseudo'
                onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={handleChange('pseudo')}
                error={errEmail}
              />

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
                onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
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
                  description='Se connecter'
                  className='GradientBtn'
                />
              </div>
            </form>
          </div>
          {subscribeMsg}
        </Grid>
      </Grid>
    </>
  )
}

export default SignIn
