import './treatPlan.scss'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Paper,
  Typography,
  TextareaAutosize
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'

import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL } from '../../../store/actions'
import InputLabel from '@material-ui/core/InputLabel'

import { setup } from '../../../services/Auth'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const TreatPlan = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const treatments = useSelector((state) => state.home.treatments)
  const catchSubmit = async (event) => {
    event.preventDefault()
    dispatch({ type: UPDATE_LEVEL, level: 'evolution' })
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
            <Typography component='h1' variant='h5'>
              Plan de traitement
            </Typography>
            <form className={classes.form} noValidate>

              <InputLabel className='inputLabel'>
               Description globale
              </InputLabel>
              <TextareaAutosize
                aria-label='minimum height'
                rowsMin={3} placeholder='Description globale'
                variant='outlined'
                margin='normal'
                required
                name='global_desc'
                type='textarea'
                id='global_desc'
                autoComplete='current-global_desc'
                onChange={props.onChange('global_desc')}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                name='medication_administered'
                label='Médicaments administrés'
                type='text'
                id='medication_administered'
                autoComplete='current-medication_administered'
                onChange={props.onChange('medication_administered')}
                // error={errPseudo}
              />

              <InputLabel className='inputLabel'>
                Etape 1
              </InputLabel>
              <TextareaAutosize
                aria-label='minimum height'
                rowsMin={3} placeholder='Renseignez le(s) probleme(s) cardiaque'
                variant='outlined'
                margin='normal'
                required
                name='step1'
                type='textarea'
                id='step1'
                autoComplete='current-step1'
                onChange={props.onChange('step')}
              />

              <InputLabel className='inputLabel'>
                Etape 2
              </InputLabel>
              <TextareaAutosize
                aria-label='minimum height'
                rowsMin={3} placeholder='Renseignez le(s) traitement(s)'
                variant='outlined'
                margin='normal'
                required
                name='step2'
                type='textarea'
                id='step2'
                autoComplete='current-in_treatment'
                onChange={props.onChange('step')}
              />

              <InputLabel className='inputLabel'>
                Etape 3
              </InputLabel>
              <TextareaAutosize
                aria-label='minimum height'
                rowsMin={3} placeholder='Renseignez le(s) traitement(s)'
                variant='outlined'
                margin='normal'
                required
                name='step3'
                type='textarea'
                id='step3'
                autoComplete='current-step'
                onChange={props.onChange('step')}
              />

              <InputLabel className='inputLabel'>
                Treatments
              </InputLabel>
              <TextField
                className='textField'
                id='treatment'
                select
                onChange={props.onChange('treatment')}
                variant='outlined'
                SelectProps={{
                  multiple: true,
                  value: props.values.treatment
                }}
              >
                {treatments && treatments.map((value) => (
                  <MenuItem key={value['@id']} value={value['@id']}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>

              <div onClick={catchSubmit}>
                <GradientBtn
                  variant='contained'
                  type='submit'
                  description='Suivant'
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

export default TreatPlan
