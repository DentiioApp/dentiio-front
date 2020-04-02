import './signIn.scss'

import React from 'react'
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
import FormHelperText from '@material-ui/core/FormHelperText'

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

  const [values, setValues] = React.useState({
    password: '',
    currency: 'CD',

    showPassword: false
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <>
      <form className={classes.root} noValidate autoComplete='off' variant='outlined'>
        <TextField id='pseudo-basic' required id='pseudo-required' label='Pseudo' value={values.pseudo} />
        <TextField id='email-basic' required id='email-required' label='Email' value={values.email} />
        <FormHelperText id='my-helper-text'>We'll never share your email.</FormHelperText>

        <TextField
          id='filled-select-currency'
          select
          label='Vous êtes ...'
          value={values.currency}
          onChange={handleChange}
          helperText='Please select your function'
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
            onChange={handleChange('password')}
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
      </form>
    </>
  )
}

export default SignUp
