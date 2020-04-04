import './register.scss'

import React, {useState} from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";
import { logUser } from '../../../store/actions'
import img from '../../../images/auth.svg'

const currencies = [
  {
    value: 'CD',
    label: 'Chirurgien Dentiste'
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}))

const SignUp = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user);

  const initValues = { 
    pseudo  : '',
    email   : '',
    password: '',
    currency: 'CD',
    showPassword: false
  };

  const [values, setValues] = useState(initValues)
  const [errEmail, setErrEmail] = useState('Dupont@dupont.fr')
  const [errPassword, setErrPassword] = useState('my-password')

  const catchSubmit = (e) => {
    e.preventDefault()
   
    if (values.password && values.currency && values.pseudo && checkEmail(values.email) !== false && checkPassword(values.password) !== false) { 
      const register = {
        pseudo  : values.pseudo,
        email   : values.email,
        password: values.password,
        currency: values.currency
      }

      dispatch(logUser(register))
    } else {
      return false;
    }

    setValues(initValues);
  }

  // Check Valid email
  const checkEmail = (email) => {
    return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
  }

  const checkPassword= (password) => {
    //speial chars , upper letter , lower letter, number more than 7 chars
    return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#'<>"#?¨áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ()),$%^+=\-_°\\:/&.;|*])(?=.{8,})/.test(password));
  }

  const handleChange = prop => event => {
    if(prop === 'email') {
      if(checkEmail(event.target.value) === false){ 
          setErrEmail(event.target.value )      
      }
    }

    if(prop === 'password') {
      console.log('VALID PASS: ',checkPassword(event.target.value))
      if(checkPassword(event.target.value) === false){ 
          setErrPassword(event.target.value);
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

  if (user.username !== undefined){
    return <Redirect to="/account" />
  };
  
  return (
    <>
      <div className='register'>
        <img src={img} alt='alternative texte' />
        <div style={{ width: '20rem' }}>
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField 
              id='pseudo-basic' required  label='Pseudo' 
              value={values.pseudo}  
              onChange={handleChange('pseudo')} 
              variant='outlined' 
            />
          
            <TextField 
              id='email-basic' required  label='Email' 
              value={values.email}
              error={errEmail === ""}
              onChange={handleChange('email')}
              placeholder='Dupont@dupont.fr'
              variant='outlined' 
              helperText={values.email !== '' ? (checkEmail(values.email) === false ? 'Email invalide!' : ' ') :''}
            />
            <FormHelperText id='my-helper-text'>On ne partagera jamais votre email.</FormHelperText>
            
            <TextField
              id='filled-select-currency'
              select
              label='Vous êtes ...'
              value={values.currency}
              onChange={handleChange}
              helperText='Selectionnez votre fonction'
              variant='outlined'
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <FormControl variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                error={errPassword === ""}
                onChange={handleChange('password')}
                autoComplete="on"
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
            <FormHelperText id='my-helper-text'>{values.password !== '' ? (checkPassword(values.password) === false ? 'Password invalide!' : ' ') :''}</FormHelperText>
            </FormControl>

            <Button
              variant='contained' color='primary'
              type='submit'
              className='{}'
              name='submit_button'
              onClick={catchSubmit}
            >
            S'inscrice
            </Button>

          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
