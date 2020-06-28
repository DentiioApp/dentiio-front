import './register.scss'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {
  Avatar,
  FormControlLabel,
  Paper,
  Typography,
  Link
} from '@material-ui/core/'
import Checkbox from '@material-ui/core/Checkbox'
import FormHelperText from '@material-ui/core/FormHelperText'
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
import avatar from '../../../images/logoteeth_blue.png'
import logo from '../../../images/logo.svg'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useToasts } from 'react-toast-notifications'
import { setup } from '../../../services/Auth'
import oStyle from '../../ResponsiveDesign/AuthStyle'

import { registerUser, LOGIN_FORM } from '../../../store/actions'
import GradientBtn from '../../UI/buttons/GradientBtn'
import { checkText, checkEmail, checkPassword } from '../../../utils'

const useStyles = makeStyles((theme) => oStyle(theme, imgDesktop, imgMobile))

const Register = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const { addToast } = useToasts()

  const { jobs, config } = useSelector((state) => state.home)
  const user = useSelector((state) => state.user)
  
  const messages = config.conf.messages.auth

  const initValues = {
    pseudo: '',
    email: '',
    password: '',
    job: '',
    showPassword: false,
    cgu: true

  }

  const [values, setValues] = useState(initValues)
  const [errPseudo, setErrPseudo] = useState(false)
  const [errEmail, setErrEmail] = useState(false)
  const [errPassword, setErrPassword] = useState(false)
  const [errCgu, setErrCgu] = useState(true)

  const catchSubmit = (e) => {
    e.preventDefault()

    if (checkText(values.pseudo) === false || values.pseudo === '') { setErrPseudo(true) }
    if (checkEmail(values.email) === false) { setErrEmail(true) }
    if (checkPassword(values.password) === false) { setErrPassword(true) }

    if (values.cgu === false) { setErrCgu(true) }

    if ((errPseudo || errEmail || errPassword || !errCgu) === true) {
      addToast(messages.register.error, { appearance: 'error' }); return false
    } else {
      dispatch(registerUser({
        pseudo: values.pseudo,
        email: values.email,
        password: values.password,
        job: values.job,
        cgu: values.cgu
      }))
      addToast(messages.register.success, { appearance: 'success' })
    }
  }

  const handleChange = prop => event => {
    if (prop === 'pseudo') {
      if (checkText(event.target.value) === false || event.target.value === '') {
        setErrPseudo(true)
      } else {
        setErrPseudo(false)
      }
    }
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
    if (prop === 'cgu') {
      if (event.target.value === false) {
        setErrCgu(true)
      } else {
        setErrCgu(false)
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
  const handleClickCgu = () => {
    setValues({ ...values, cgu: !values.cgu })
  }
  const handleMouseDownCgu = event => {
    event.preventDefault()
  }
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  if (setup() === true) {
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
          <img className={classes.avatar} alt='' src={avatar} />
          <Typography component='h1' variant='h5'>
              Inscription
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              autoFocus
              fullWidth
              name='pseudo'
              label='Pseudo'
              type='text'
              id='pseudo'
              autoComplete='current-pseudo'
              onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
              onChange={handleChange('pseudo')}
              error={errPseudo}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
              onChange={handleChange('email')}
              error={errEmail}
              helperText={values.email !== '' ? (checkEmail(values.email) === false ? 'Email invalide!' : ' ') : ''}
            />
            <FormHelperText id='my-helper-text'>{/* On ne partagera jamais votre email. */}</FormHelperText>

            <br />

            <InputLabel className='inputLabel'>
              Vous êtes* :
            </InputLabel>
            <TextField
              className='textField'
              id='job'
              select
              value={values.job === '' ? 'none' : values.job}
              onChange={handleChange('job')}
              variant='outlined'
            >
              <MenuItem key='none' value='none' disabled>
                {'Indiquez votre profession'}
              </MenuItem>

              {jobs.map(option => (
                <MenuItem key={option.ident} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <br /> <br />

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
            <br />
            <Typography component='p' color='textPrimary'>
                8 caractères minimum, un caractère spécial, une majuscule
            </Typography>

            <br />  <br />

            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={!values.cgu}
                  onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                  onClick={handleClickCgu}
                  onMouseDown={handleMouseDownCgu}
                  error={errCgu.toString()}
                />
              }
              label="J'accepte les conditions générales de d'utilisation"
            />

            <br /> <br /> <br />

            <div onClick={catchSubmit}>
              <GradientBtn
                variant='contained'
                type='submit'
                description={'S\'inscrire'}
                className='GradientBtn'
              />
            </div>
            <br />
            <Typography>
              <span>
                {' '}
                  Déjà un compte{' '}
                <Link onClick={(e) => switchToLogin(e)} color='primary'>
                  {' '}
                    Connectez vous ?{' '}
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
