import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Avatar,
  CssBaseline,
  Paper,
  Typography
} from '@material-ui/core/'

import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import { VALID_STATUS } from '../../../store/actions'
import img from '../../../images/auth.svg'
import { setup } from '../../../services/Auth'
import oStyle from '../../../services/css/registerStyle'
import GradientBtn from '../../UI/buttons/GradientBtn'
import { checkText, checkFiles } from '../../../utils'

const useStyles = makeStyles((theme) => (oStyle(theme, img)))

const StatusForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const initValues = {
    nom: '',
    prenom: '',
    card: ''
  }

  const [values, setValues] = useState(initValues)
  const [errNom, setErrNom] = useState(false)
  const [errPrenom, setErrPrenom] = useState(false)
  const [errCard, setErrCard] = useState(false)

  const catchSubmit = (e) => {
    e.preventDefault()

    if (checkText(values.nom) === false) { setErrNom(true) }
    if (checkText(values.prenom) === false) { setErrPrenom(true) }
    // if (checkFiles(values.card) === false) { setErrCard(true) }

    if ((errNom || errPrenom || errCard) === true) {
      return false
    } else {
      dispatch(
        {
          type: VALID_STATUS,
          nom: values.name,
          size: values.size,
          url: values.url
        })
    }
  }

  const handleChange = prop => event => {
    if (prop === 'prenom') {
      if (checkText(event.target.value) === false) {
        setErrPrenom(true)
      } else {
        setErrPrenom(false)
      }
    }
    if (prop === 'nom') {
      if (checkText(event.target.value) === false) {
        setErrNom(true)
      } else {
        setErrNom(false)
      }
    }
    const checkedFile = checkFiles(event)

    if (prop === 'cpsCard') {
      if (checkedFile.error === true) {
        setErrCard(checkedFile.message)
      } else {
        setErrCard(false)
      }
    }
    if (prop === 'studyCard') {
      if (checkedFile.error === true) {
        setErrCard(checkedFile.message)
      } else {
        setErrCard(false)
      }
    }

    setValues({ ...values, [prop]: event.target.value })
  }

  setup()

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} />
          <Typography component='h1' variant='h5'>
            Je Valide Mon Status
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Nom'
              type='text'
              id='nom'
              autoComplete='current-password'
              onChange={handleChange('nom')}
              error={errNom}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='prenom'
              label='Prenom'
              name='prenom'
              autoComplete='prenom'
              autoFocus
              onChange={handleChange('prenom')}
              error={errPrenom}
              helperText={values.prenom !== '' ? (checkText(values.prenom) === false ? 'Prenom inccorect!' : ' ') : ''}
            />
            <FormHelperText id='my-helper-text'>{/* On ne partagera jamais votre identitée. */}</FormHelperText>

            <br />

            <Button
              variant='contained'
              component='label'
            >
              Ma carte CPS
              <input
                type='file'

                onChange={handleChange('cpsCard')}
                name='cps'
                id='cps'
                multiple
              />
            </Button>
            <FormHelperText id='my-helper-text'>{errCard || ''}</FormHelperText>
            <br /> <br />
            <Button
              variant='contained'
              component='label'
            >
              Ma carte Etudiante
              <input
                type='file'

                onChange={handleChange('studyCard')}
                name='studyCard'
                id='studyCard'
                multiple
              />
            </Button>
            <FormHelperText id='my-helper-text'>{errCard || ''}</FormHelperText>
            <br /> <br />

            <br /> <br /> <br />

            <br /> <br /> <br />

            <div onClick={catchSubmit}>
              <GradientBtn
                variant='contained'
                type='submit'
                description='Reclamer mon statut'
                className='GradientBtn'
              />
            </div>

            <br />
          </form>
          <span>{user.message || ''}</span>
        </div>
      </Grid>
      <Typography component='h1' variant='h5'>
        {user.message || ''}
      </Typography>
    </Grid>
  )
}

export default StatusForm
