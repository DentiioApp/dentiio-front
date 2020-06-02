import './signIn.scss'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {
  Avatar,
  Paper,
  Typography
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import StatusModal from '../StatusModal/statusModal'
import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../../services/css/registerStyle'
import { logUser } from '../../../store/actions'
import img from '../../../images/auth.svg'

import { checkEmail } from '../../../utils'
import loginCheck from '../../../services/LoginCheck'
import { setup } from '../../../services/Auth'

const useStyles = makeStyles((theme) => (oStyle(theme, img)))

const SignIn = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const subscribeMsg = localStorage.getItem('authSubscribeMsg')
  const user = useSelector((state) => state.user)

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

  const catchSubmit = (e) => {
    e.preventDefault()

    if (values.password && values.pseudo) {
      const getToken = loginCheck(values.pseudo, values.password)
      getToken.then((res) => {
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
      if (checkEmail(event.target.value) === false) {
        setErrEmail(true)
      } else {
        setErrEmail(false)
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

  var modal = undefined
  if (user.subscribe === true) {
    modal = <StatusModal />
  }

  if (setup() === true) {
    return <Redirect to='/cases' />
  };

  return (
    <>
      {modal}
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
            className='login'
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar} />
              <Typography component='h1' variant='h5'>
              Connexion
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='pseudo'
                  label='pseudo'
                  type='text'
                  id='pseudo'
                  autoComplete='current-pseudo'
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
        </div>
      </Grid>
    </>
  )
}

export default SignIn
