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
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import StatusModal from '../StatusModal/statusModal'
import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../SignIn/signinStyle'
import { logUser } from '../../../store/actions'

import loginCheck from '../../../services/LoginCheck'
import { setup } from '../../../services/Auth'
import {Link} from "../Register/register";
import logo from "../../../images/logo.svg";
import avatar from "../../../images/logoteeth_blue.png";

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

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
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    if (datas !== '') {
      dispatch(logUser(datas))
    }
  })

  const catchSubmit = (e) => {
    e.preventDefault()

    if (values.password !== '' && values.pseudo !== '') {
      async function getToken () { await loginCheck(values.pseudo, values.password)}

      if(getToken().isResolved) {
        setErrMsg('Connexion en cours')
        getToken.then((res) => {
          setDatas(res)
        })
      }else{
        setErrMsg('Vos identifiants de connexion ne sont pas valide ! ')
      }

      
    } 

    setValues(values)
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
                  autoFocus
                  fullWidth
                  name='pseudo'
                  label='pseudo'
                  type='text'
                  id='pseudo'
                  autoComplete='current-pseudo'
                  onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                  onChange={handleChange('pseudo')}
                  //error={''}
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
                  //error={''}
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
            <Typography component='p' variant='h6'>
              {subscribeMsg}
              {errMsg}
            </Typography>
          </Grid>
      </Grid>
    </>
  )
}

export default SignIn
