import './register.scss'

import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'

import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import { useDispatch, useSelector } from 'react-redux'

import { registerUser } from '../../../store/actions'
import img from '../../../images/auth.svg'

// API DATAS
const currencies = [
  {
    value: 'CD',
    label: 'Chirurgien Dentiste'
  },
  {
    value: 'DI',
    label: 'Dentiste Interne'
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1.5),
      width: 250
    }
  }
}))

const SignUp = () => {
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const initValues = {
    pseudo: '',
    email: '',
    password: '',
    function: '',
    showPassword: false
  }

  const [values, setValues] = useState(initValues)
  const [errEmail, setErrEmail] = useState('Dupont@dupont.fr')
  const [errPassword, setErrPassword] = useState('my-password')

  const catchSubmit = (e) => {
    e.preventDefault()

    if (values.password === '' && values.function === '' && values.pseudo === '') { return false }
    if (checkEmail(values.email) === false) { return false }
    if (checkPassword(values.password) === false) { return false }
    if (existEmail(values.email) === true) { return false }

    dispatch(registerUser({
      pseudo: values.pseudo,
      email: values.email,
      password: values.password,
      function: values.function
    }))
  }

  // Check Valid email
  const checkEmail = (email) => {
    return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
  }

  // Check Valid email
  const existEmail = (email) => {
    const emails = ['loryleticee@gmail.com', 'lory@lory.com', 'lo@lo.fr']
    return emails.includes(email)
  }

  // Check Valid password
  const checkPassword = (password) => {
    // speial chars , upper letter , lower letter, number more than 7 chars
    return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#'<>"#?¨áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ()),$%^+=\-_°\\:/&.;|*])(?=.{8,})/.test(password))
  }
  const handleChange = prop => event => {
    if (prop === 'email') {
      if (checkEmail(event.target.value) === false || existEmail(event.target.value) === true) {
        setErrEmail(event.target.value)
      }
    }
    if (prop === 'password') {
      if (checkPassword(event.target.value) === false) {
        setErrPassword(event.target.value)
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

  if (user.username !== undefined) {
    if (user.connected === false) {
      history.push('/', { content: 'connexion' })
    } else {
      return <Redirect to='/account' />
    }
  };

  return (
    <>
      <div className='register'>
        <img src={img} alt='alternative texte' />
        <form className={classes.root} noValidate autoComplete='off'>
          <div>
            <FormControl>
              <TextField
                id='pseudo-basic' required label='Pseudo'
                value={values.pseudo}
                onChange={handleChange('pseudo')}
                placeholder='pseudo'
                variant='outlined'
              />
            </FormControl>

            <FormControl>
              <TextField
                id='email-basic' required label='Email'
                value={values.email}
                error={errEmail === ''}
                onChange={handleChange('email')}
                placeholder='email'
                variant='outlined'
                helperText={values.email !== '' ? (checkEmail(values.email) === false ? 'Email invalide!' : ' ') : ''}
              />
              <FormHelperText id='my-helper-text'>On ne partageras jamais votre email.</FormHelperText>
              <br />
            </FormControl>

            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='filled-select-function-label'>Fonction</InputLabel>
              <Select
                id='filled-select-function'
                value={values.function}
                label='Vous êtes ...'
                onChange={handleChange('function')}
                variant='outlined'
              >
                {currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <br />
            </FormControl>

            <FormControl variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                error={errPassword === ''}
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
              <FormHelperText id='my-helper-text'>{values.password !== '' ? (checkPassword(values.password) === false ? 'Password invalide!' : ' ') : ''}</FormHelperText>
            </FormControl>

            <Checkbox/>

            <Button
              variant='contained' color='primary'
              type='submit'
              className='{}'
              name='submit_button'
              onClick={catchSubmit}
            >
            S'inscrice
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignUp
