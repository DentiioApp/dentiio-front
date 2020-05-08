import './signIn.scss'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {
  CssBaseline,
  Paper
} from '@material-ui/core/'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../../services/Css/css'
import { logUser } from '../../../store/actions'
import img from '../../../images/auth.svg'

import { checkEmail, checkPassword, existEmail } from '../../../utils/Auth'
import loginCheck from '../../../services/LoginCheck'
import { setup } from '../../../services/Auth'

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

  const [datas, setDatas] = useState('')
  const [values, setValues] = useState(initValues)
  const [errEmail, setErrEmail] = useState(false)
  const [errPassword, setErrPassword] = useState(false)

  useEffect(()=>{
    if(datas !== ''){
      dispatch(logUser(datas))
    }
  },[datas])


  const catchSubmit = (e) => {
    e.preventDefault()

    if (values.password && values.pseudo) {
      const getToken = loginCheck(values.pseudo, values.password)
      getToken.then((res)=>{
        setDatas(res)
      })

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

  if (setup() === true) {
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
