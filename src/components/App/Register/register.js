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
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { setup } from '../../../services/Auth'
import oStyle from '../../../services/css/registerStyle'
import { registerUser, cardCheck } from '../../../store/actions'
import GradientBtn from '../../UI/buttons/GradientBtn'
import { checkText, checkEmail, checkPassword } from '../../../utils'

const useStyles = makeStyles((theme) => oStyle(theme, imgDesktop, imgMobile))

const Register = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const jobs = useSelector((state) => state.home.jobs)
  const user = useSelector((state) => state.user)

  const initValues = {
    pseudo: '',
    email: '',
    password: '',
    job: 4,
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

    if (checkText(values.pseudo) === false) { setErrPseudo(true) }
    if (checkEmail(values.email) === false) { setErrEmail(true) }
    if (checkPassword(values.password) === false) { setErrPassword(true) }
    if (values.cgu === false) { setErrCgu(true) }

    if ((errPseudo || errEmail || errPassword || !errCgu) === true) {
      return false
    } else {
      dispatch(registerUser({
        pseudo: values.pseudo,
        email: values.email,
        password: values.password,
        job: values.job,
        cgu: values.cgu
      }))
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
    dispatch(
      cardCheck(
        { status: 'connexion' }
      )
    )
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
      <div className={classes.formContainer}>
        <Grid
          item
          xs={10}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
          className={classes.login}
          >
          <div className={classes.paper}>
            <Avatar className={classes.avatar} />
            <Typography component='h1' variant='h5'>
              Inscription
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='pseudo'
                label='Pseudo'
                type='text'
                id='pseudo'
                autoComplete='current-pseudo'
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
                id='filled-select-currency'
                select
                value={values.job}
                onChange={handleChange('job')}
                variant='outlined'
              >
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

              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={!values.cgu}
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
                  <Link onClick={switchToLogin} color='primary'>
                    {' '}
                    Connectez vous ?{' '}
                  </Link>{' '}
                </span>
              </Typography>

            </form>
            <span>{user.message}</span>
          </div>

        </Grid>
      </div>
    </Grid>
  )
}


export default Register
