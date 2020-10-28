import './register.scss'

import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {
  Typography,
  FormControl,
  Checkbox,
  Link
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useToasts } from 'react-toast-notifications'
import { setup } from '../../../../services/Auth'
import oStyle from '../../../UI/ResponsiveDesign/AuthStyle'
import { registerCheck } from '../../../../services/Users'
import { sendEmail } from '../../../../services/Email'
import {LOGIN_FORM, REGISTER_USER, SET_NEW_USER} from '../../../../store/actions'
import GradientBtn from '../../../UI/buttons/GradientBtn'
import { checkEmail, checkPassword, checkPseudo } from '../../../../utils/fields/fieldsCheckRegister'

const useStyles = makeStyles((theme) => oStyle(theme))

const Register = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const { config } = useSelector((state) => state.home)
  const user = useSelector((state) => state.user)
  const messages = config.conf.messages.auth
  const newUser = useSelector((state) => state.newUser)
  const [values, setValues] = useState({
    pseudo: newUser.pseudo,
    email: newUser.email,
    password: newUser.password,
    acceptCgu: false,
    showPassword: false,
  })
  const [showButton, setshowButton] = useState(false)
    const [errCgu, setErrCgu] = useState(null)
  const [error, setError] = useState({
    email: null,
    password: null,
    pseudo: null,
  })

  const catchSubmit = (e) => {
    e.preventDefault()
    if ( error.pseudo || !checkPseudo(values.pseudo)) {
      addToast('Pseudo invalide', { appearance: 'error' }); return false
    }
    else if ( error.email || !checkEmail(values.email)) {
      addToast('Email invalide', { appearance: 'error' }); return false
    }
    else if (error.password || !checkPassword(values.password)){
      addToast('Mot de passe invalide', { appearance: 'error' }); return false
    }
    else if (errCgu) {
        addToast('Vous devez accepter les conditions generales d\'utilisation', { appearance: 'error' }); return false
    }
    else {
      console.log('done')
      dispatch({ type: SET_NEW_USER, datas: values })
      //dispatch({ type: REGISTER_USER, email: values.email, passwd: values.password })
      return { message: messages.register.success, appearance: 'success' }
    }
  }

  const handleChange = prop => event => {
    if (prop === 'email') {
      (checkEmail(event.target.value) === false) ?
          setError({ ...error, 'email': true}) : setError({ ...error, 'email': false})
    }
    if (prop === 'password') {
      (checkPassword(event.target.value) === false) ?
          setError({ ...error, 'password': true}) : setError({ ...error, 'password': false})
    }
    if (prop === 'pseudo') {
      (checkPseudo(event.target.value) === false) ?
          setError({ ...error, 'pseudo': true}) : setError({ ...error, 'pseudo': false})
    }
    setValues({ ...values, [prop]: event.target.value })
    if (prop === 'acceptCgu') {
      setErrCgu(!event.target.checked)
      setValues({ ...values, [prop]: event.target.checked })
    }
  }


  useEffect(() => {
console.log('change')
      if(checkPseudo(values.pseudo) && checkEmail(values.email) && checkPassword(values.password) && values.acceptCgu){
        setshowButton(true )
      } else setshowButton(false )
  }, [values]);

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
    <Grid container component='main' >
      <Grid item xs={1} md={3}>
      </Grid>
      <Grid item xs={10} md={6}>
        <Typography component='h1' variant='h4' className='title'>
          <center>Je créer mon compte</center>
          </Typography>
          <br />
          <form className={classes.form} noValidate onSubmit={sendEmail}>
            <TextField
                variant='outlined'
                className='labelGrey'
                margin='normal'
                required
                fullWidth
                value={values.pseudo}
                id='pseudo'
                label='Votre pseudo'
                name='{{ customer_name }}'
                autoComplete='pseudo'
                onChange={handleChange('pseudo')}
                error={error.pseudo}
                helperText={values.pseudo !== '' ? (checkPseudo(values.pseudo) === false ? '3 caractère minimum' : ' ') : ''}
            />
            <br />
            <TextField
              variant='outlined'
              className='labelGrey'
              margin='normal'
              required
              fullWidth
              value={values.email}
              id='email'
              label='Votre adresse email'
              name='{{ customer_name }}'
              autoComplete='email'
              onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
              onChange={handleChange('email')}
              error={error.email}
              helperText={values.email !== '' ? (checkEmail(values.email) === false ? 'Email invalide!' : ' ') : ''}
            />
            <br /><br />

            <FormControl fullWidth variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>Votre mot de passe *</InputLabel>
              <OutlinedInput
                variant='outlined'
                required
                fullWidth
                value={values.password}
                name='password'
                label='Votre mot de passe *'
                type={values.showPassword ? 'text' : 'password'}
                className='labelGreyPassword'
                id='outlined-adornment-password'
                autoComplete='on'
                error={error.password}
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
            </FormControl>
            <Typography component='p' color='textPrimary'>
              6 caractères minimum
                {/*8 caractères minimum, un caractère spécial, une majuscule*/}
            </Typography>

            <br /><br />

            <Grid container spacing={3}>
              <Grid item xs={2} sm={1}>
                <Checkbox
                    checked={values.acceptCgu}
                    onChange={handleChange('acceptCgu')}
                    name="acceptCgu"
                    color="primary"
                />
              </Grid>
              <Grid item xs={10}>
                <Typography style={{paddingTop: '10px'}}>
                  J'accepte les <Link>Conditions générales de d'utilisation</Link>
                </Typography>
              </Grid>
            </Grid>

            <br /><br /><br />

            <div onClick={(e) => (catchSubmit(e))} hidden={!showButton}>
              <GradientBtn
                variant='contained'
                type='submit'
                description={'S\'INSCRIRE'}
                className='GradientBtn'
              />
            </div>
          </form>
          <span>{user.message}</span>

      </Grid>
    </Grid>

  )
}

export default Register
