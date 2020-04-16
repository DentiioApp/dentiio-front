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
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import { useDispatch, useSelector } from 'react-redux'

import { registerUser } from '../../../store/actions'
import img from '../../../images/auth.svg'
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ResponsiveCard from "../../ResponsiveDesign/responsiveCard";
import ResponsiveContainerGrid from "../../ResponsiveDesign/responsiveContainerGrid";

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
    showPassword: false,
    cgu: false,
  }

  const [values, setValues] = useState(initValues)
  const [errEmail, setErrEmail] = useState('Dupont@dupont.fr')
  const [errPassword, setErrPassword] = useState(false)
  const [errPseudo, setErrPseudo] = useState(false)
  const [errCgu, setErrCgu ]= useState(false)

  const catchSubmit = (e) => {
    e.preventDefault()

    if (values.password === '' && values.function === '' && values.pseudo === '') { return false }
    if (checkEmail(values.email) === false) { setErrEmail(true) ; return false; }
    if (checkPassword(values.password) === false) { setErrPassword(true) ; return false }
    if (existEmail(values.email) === true) { setErrEmail(true) ; return false }
    if (values.cgu === false) {setErrCgu(true) ; return false }

    dispatch(registerUser({
      pseudo: values.pseudo,
      email: values.email,
      password: values.password,
      function: values.function,
      cgu: values.cgu,
    }))
  }


  // Check Valid email
  const checkEmail = (email) => {
    return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
  }

  // Exist  email
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
    if (prop === 'pseudo') {
      if (event.target.value === false || event.target.value === '') {
        setErrPseudo(true)
      }else{
        setErrPseudo(false)
      }
    }
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
    if (prop === 'cgu') {
      if (event.target.value === false) {
        setErrCgu(true)
      } else{
        setErrCgu(false)
      }
    }
    
    setValues({ ...values, [prop]: event.target.value })
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

  if (user.details !== undefined) {
    if (user.connected === false) {
      history.push('/', { content: 'connexion' })
    } else {
      return <Redirect to='/account' />
    }
  };

  return (
    <>
      <div className='register'>
        <ResponsiveContainerGrid>
          <Grid container >


            <Grid item xs={0} sm={6} lg={6} xl={6}>
              <div className='home-bg'>
                <img src={img} alt=""/>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} lg={6} xl={6} className='form'>
              <div className='form'>
                <ResponsiveCard>



                  <form className={classes.root} noValidate autoComplete='off'>
                    <CardHeader title="Sign in" subheader="to continue to kTPWC" />
                    <CardContent>
                      <InputLabel className='inputLabel'>
                        Pseudo* :
                      </InputLabel>
                      <TextField
                          className='textField'
                          id='pseudo-basic' required
                          value={values.pseudo}
                          onChange={handleChange('pseudo')}
                          variant={'outlined'}
                          error={errPseudo}
                      />
                      <br/>

                      <InputLabel className='inputLabel'>
                        Email* :
                      </InputLabel>
                      <TextField
                        className='textField'
                        id='email-basic' required
                        value={values.email}
                        error={errEmail === ""}
                        onChange={handleChange('email')}
                        placeholder='Dupont@dupont.fr'
                        variant={'outlined'}
                        helperText={values.email !== '' ? (checkEmail(values.email) === false ? 'Email invalide!' : ' ') :''}
                      />
                      <FormHelperText id='my-helper-text'>On ne partagera jamais votre email.</FormHelperText>
                      <br/>

                      <InputLabel className='inputLabel'>
                        Vous êtes* :
                      </InputLabel>
                      <TextField
                        className='textField'
                        id='filled-select-currency'
                        select
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

                      <InputLabel className='inputLabel'>
                        Mot de passe* :
                      </InputLabel>
                      <TextField
                          className='textField'
                          id='outlined-adornment-password'
                          type={values.showPassword ? 'text' : 'password'}
                          value={values.password}
                          variant='outlined'
                          error={errPassword === ""}
                          onChange={handleChange('password')}
                          autoComplete="on"
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
                          labelWidth={20}
                      />
                    </CardContent>

                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={catchSubmit}
                      name='submit_button'
                    >
                      S'inscrire
                    </Button>

                    <Checkbox 
                      required
                      checked ={values.cgu}
                      onClick={handleClickCgu}
                      onMouseDown={handleMouseDownCgu}
                      error={errCgu}
                    />
                  </form>

                </ResponsiveCard>
              </div>
           </Grid>
          </Grid>
        </ResponsiveContainerGrid>
      </div>
    </>
  )
}

export default SignUp
