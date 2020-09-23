import './clinicCase.scss'

import React from 'react'
import { useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { Redirect } from 'react-router-dom'
import {
  Paper,
  Typography
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import avatar from '../../../images/logoteeth_blue.png'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'
import logo from '../../../images/logo.svg'

import oStyle from '../../ResponsiveDesign/AuthStyle'
import { setup } from '../../../services/Auth'
import GradientBtn from '../../UI/buttons/GradientBtn'

import config from '../../../config'
import { postCase } from '../../../services/Cases'
import { postPatient } from '../../../services/Patient'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const ClinicCase = (props) => {
  const classes = useStyles()
  const { addToast } = useToasts()
  const messages = config.messages.cases

  const keywords = useSelector((state) => state.home.keywords)
  const specialities = useSelector((state) => state.home.specialities)

  const catchSubmit = async (event) => {
    event.preventDefault()
    const regex2 = RegExp(/Error/)
    const patient = await postPatient(props.values)
    if (!regex2.test(patient.message)) {
      const datas = await postCase(props.values, patient.datas['@id'])
      if (regex2.test(datas)) {
        addToast(messages.error, { appearance: 'error' })
      } else {
        addToast(messages.success, { appearance: 'success' })
        // setTimeout(() => { return <Redirect to='/cases' /> }, 2000);
        
      }
    }
  }

  setup()

  return (
    <>
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
            <form className={classes.form} noValidate>
              <Typography component='h1' variant='h5'>
                Ajouter votre cas clinique
              </Typography>

              <Typography component='h1' variant='h5'>
              Titre du cas
              </Typography>
              <TextField
                variant='outlined'
                margin='normal'
                required
                autoFocus
                name='title'
                label='Titre du cas'
                type='text'
                id='title'
                autoComplete='current-title'
                onChange={props.onChange('title')}
              />
              <Typography component='h1' variant='h5'>
                Inscription
              </Typography>
              <TextField
                variant='outlined'
                margin='normal'
                required
                autoFocus
                fullWidth
                name='summary'
                label='Résumé'
                type='text'
                id='summary'
                autoComplete='current-summary'
                onChange={props.onChange('summary')}
              />


              <Typography component='h1' variant='h5'>
                Mot clés
              </Typography>
              <TextField
                className='textField'
                id='keywords'
                select
                onChange={props.onChange('keywords')}
                variant='outlined'
                SelectProps={{
                  multiple: true,
                  value: props.values.keywords
                }}
              >
                {keywords && keywords.map((value) => (
                  <MenuItem key={value['@id']} value={value['@id']}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>

              <Typography component='h1' variant='h5'>
                Spécialités
              </Typography>
              <TextField
                className='textField'
                id='specialities'
                select
                onChange={props.onChange('specialities')}
                variant='outlined'
                SelectProps={{
                  multiple: true,
                  value: props.values.specialities
                }}
              >
                {specialities && specialities.map((value) => (
                  <MenuItem key={value['@id']} value={value['@id']}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>

              <br />  <br />

              <div onClick={catchSubmit}>
                <GradientBtn
                  variant='contained'
                  type='submit'
                  description='Valider le cas clinique'
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

export default ClinicCase
