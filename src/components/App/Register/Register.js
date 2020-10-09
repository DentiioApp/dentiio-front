import './register.scss'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {
  Switch,
  Paper,
  Typography,
  Link
  , FormControlLabel, FormControl
} from '@material-ui/core/'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'
import logo from '../../../images/logo.svg'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useToasts } from 'react-toast-notifications'
import { setup } from '../../../services/Auth'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { registerCheck } from '../../../services/Users'
import { sendEmail } from '../../../services/Email'

import { LOGIN_FORM, REGISTER_USER } from '../../../store/actions'
import GradientBtn from '../../UI/buttons/GradientBtn'
import { checkEmail, checkPassword } from '../../../utils'

const useStyles = makeStyles((theme) => oStyle(theme, imgDesktop, imgMobile))

const Register = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const { addToast } = useToasts()

  const { jobs, config } = useSelector((state) => state.home)
  const user = useSelector((state) => state.user)

  const messages = config.conf.messages.auth
  const initValues = {
    email: '',
    password: '',
    job: '',
    showPassword: false
  }
  const [emailSent, setEmailSent] = useState(false)
  const [values, setValues] = useState(initValues)
  const [errEmail, setErrEmail] = useState(false)
  const [errPassword, setErrPassword] = useState(false)
  const [errCgu, setErrCgu] = useState(false)

  const onKeyUp = (event) => {
    if (event.keyCode === 13) {
      catchSubmit(event)
    }
  }

  const catchSubmit = (e) => {
    e.preventDefault()

    if (checkEmail(values.email) === false) { setErrEmail(true) }
    if (checkPassword(values.password) === false) { setErrPassword(true) }

    if ((errEmail || errPassword) === true) {
      addToast(messages.register.error, { appearance: 'error' }); return false
    } else {
      if (!errCgu) {
        addToast('Vous devez accepter les conditions generales d\'utilisation', { appearance: 'error' }); return false
      } else {
        const respo = sendRequest()
        respo.then((res) => {
          addToast(res.message, { appearance: res.appearance })
        })
      }
    }
  }

  const sendRequest = async () => {
    const response = await registerCheck({
      nom: 'none',
      prenom: 'none',
      email: values.email.toLowerCase(),
      password: values.password,
      job: '/api/jobs/' + values.job,
      createdAt: new Date().toISOString(),
      isEnabled: true
    })

    if (response === {}) {
      return { message: messages.register.error, appearance: 'error' }
    } else {
      if (!emailSent) {
        const mailing = await sendEmail(values.email, values.pseudo)
        if (mailing.data !== 'OK') { console.log('Problem lors de lenvoie du mail') }
        setEmailSent(true)
      }

      dispatch({ type: REGISTER_USER, email: values.email, passwd: values.password })
      return { message: messages.register.success, appearance: 'success' }
    }
  }

  const handleChange = prop => event => {
    if (prop === 'email') {
      if (checkEmail(event.target.value) === false) {
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

  const switchToLogin = (e) => {
    e.preventDefault()
    dispatch({ type: LOGIN_FORM })
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
    <Grid container component='main' className={classes.root}>
      <img className={classes.logo} alt='' src={logo} />
      <Grid
        item
        xs={11}
        sm={7}
        md={7}
        component={Paper}
        elevation={6}
        square
        className={classes.login}
      >
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Nouveau sur Dentiio ?
          </Typography>
          <br />
          <Typography component='h3' variant='subtitle2'>
            Saisissez vos informations pour continuer.
          </Typography>
          <br /><br />
          <form className={classes.form} noValidate onSubmit={sendEmail}>
            <InputLabel className='inputLabel'>
              Vous êtes* :
            </InputLabel>
            <TextField
              fullWidth
              id='job'
              select
              value={values.job === '' ? 'none' : values.job}
              onChange={handleChange('job')}
              variant='outlined'
            >
              <MenuItem key='none' value='none' disabled>
                {'Indiquez votre profession'}
              </MenuItem>

              {jobs && jobs.map(option => (
                <MenuItem key={option.ident} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <br /><br />

            <TextField
              variant='outlined'
              className='labelGrey'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Votre adresse email'
              name='{{ customer_name }}'
              autoComplete='email'
              onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
              onChange={handleChange('email')}
              error={errEmail}
              helperText={values.email !== '' ? (checkEmail(values.email) === false ? 'Email invalide!' : ' ') : ''}
            />
            <br /><br />

            <FormControl fullWidth variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>Votre mot de passe *</InputLabel>
              <OutlinedInput
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Votre mot de passe *'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                className='labelGreyPassword'
                id='outlined-adornment-password'
                autoComplete='on'
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
                onKeyUp={onKeyUp}
              />
            </FormControl>

            <br />
            <Typography component='p' color='textPrimary'>
                8 caractères minimum, un caractère spécial, une majuscule
            </Typography>

            <br /><br />

            <FormControlLabel
              className='labelGreyAccept'

              control={
                <Switch
                  checked={errCgu}
                  onChange={(e) => { setErrCgu(e.target.checked) }}
                  color='primary'
                  name='is_medical_background'
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  className='label'
                />
              }
              label="J'accepte les Conditions générales de d'utilisation"
            />

            <br /><br /><br />

            <div onClick={(e) => (catchSubmit(e))}>
              <GradientBtn
                variant='contained'
                type='submit'
                description={'S\'INSCRIRE'}
                className='GradientBtn'
              />
            </div>
            <br /><br /><br />
            <Typography>
              <span>
                {' '}
                  Déjà un compte ?{' '}
                <Link href='#' onClick={(e) => switchToLogin(e)} color='primary'>
                  {' '}
                    Connectez-vous.{' '}
                </Link>{' '}
              </span>
            </Typography>

          </form>
          <span>{user.message}</span>
        </div>

      </Grid>
    </Grid>

  )
}

export default Register
