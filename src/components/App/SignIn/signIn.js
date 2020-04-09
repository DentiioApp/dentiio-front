import './signIn.scss'

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Redirect } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl'
import { logUser } from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import img from '../../../images/auth.svg'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 250
    }
  }
}))

const SignUp = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const initValues = {
    pseudo: '',
    password: '',
    showPassword: false
  }

  const [values, setValues] = useState(initValues)

  const catchSubmit = (e) => {
    e.preventDefault()

    if (values.password && values.pseudo) {
      const signin = {
        pseudo: values.pseudo,
        password: values.password
      }

      dispatch(logUser(signin))
    } else {
      return false
    }

    setValues(initValues)
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

  if (user.username !== undefined && user.connected === true) {
    return <Redirect to='/account' />
  };

  return (
    <>
      <div className='register'>
        {/*<img src={img} alt='alternative texte' />*/}
        <div style={{ width: '20rem' }}>
          <form className={classes.root} noValidate autoComplete='off' variant='outlined'>
            <FormControl variant='outlined'>
              <TextField
                id='pseudo-basic' required
                label='Pseudo'
                value={values.pseudo}
                onChange={handleChange('pseudo')}
                variant='outlined'
              />
            </FormControl>

            <FormControl variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                autoComplete='on'
                endAdornment={
                  <InputAdornment position='end'>
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
                labelWidth={70}
              />
            </FormControl>

            <Button
              variant='contained' color='primary'
              type='submit'
              className='{}'
              name='submit_button'
              onClick={catchSubmit}
            >
            Se connecter
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
