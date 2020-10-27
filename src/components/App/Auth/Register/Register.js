import './register.scss'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {
  Switch,
  Typography,
  FormControlLabel,
  FormControl
} from '@material-ui/core/'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import imgDesktop from '../../../../images/illus.png'
import imgMobile from '../../../../images/mobile-bg.svg'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useToasts } from 'react-toast-notifications'
import { setup } from '../../../../services/Auth'
import oStyle from '../../../UI/ResponsiveDesign/AuthStyle'
import { registerCheck } from '../../../../services/Users'
import { sendEmail } from '../../../../services/Email'
import { LOGIN_FORM, REGISTER_USER } from '../../../../store/actions'
import GradientBtn from '../../../UI/buttons/GradientBtn'
import { checkEmail, checkPassword } from '../../../../utils'

const useStyles = makeStyles((theme) => oStyle(theme, imgDesktop, imgMobile))

const Register = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const { config } = useSelector((state) => state.home)
  const user = useSelector((state) => state.user)
  const messages = config.conf.messages.auth
  const [values, setValues] = useState(props.values)
  const [errCgu, setErrCgu] = useState(false)
console.log(props.error)
  const catchSubmit = (e) => {
    e.preventDefault()

    if ( props.error.email || checkEmail(props.values.email) === false) {
      addToast('Email invalide', { appearance: 'error' }); return false
    }
    else if (props.error.password || checkPassword(props.values.password) === false){
      addToast('Mot de passe invalide', { appearance: 'error' }); return false
    }
    else if (!errCgu) {
        addToast('Vous devez accepter les conditions generales d\'utilisation', { appearance: 'error' }); return false
    }
    else {
      console.log('done')
        //dispatch({ type: REGISTER_USER, email: values.email, passwd: values.password })
      return { message: messages.register.success, appearance: 'success' }
    }
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
                id='pseudo'
                label='Votre pseudo'
                name='{{ customer_name }}'
                autoComplete='pseudo'
                onChange={props.onChange('pseudo')}
                error={props.error.email}
                helperText={props.values.email !== '' ? (checkEmail(values.email) === false ? 'Email invalide!' : ' ') : ''}
            />
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
              onChange={props.onChange('email')}
              error={props.error.email}
              helperText={props.values.email !== '' ? (checkEmail(values.email) === false ? 'Email invalide!' : ' ') : ''}
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
                className='labelGreyPassword'
                id='outlined-adornment-password'
                autoComplete='on'
                error={props.error.password}
                onChange={props.onChange('password')}
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
          </form>
          <span>{user.message}</span>

      </Grid>
    </Grid>

  )
}

export default Register
