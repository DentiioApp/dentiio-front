import './diagnostic.scss'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Paper,
  Typography,
  Button,
  TableRow
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL } from '../../../store/actions'

import { setup } from '../../../services/Auth'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Diagnostic = (props) => {
  const classes = useStyles()
  const pathologies = useSelector((state) => state.home.pathologies)

  const dispatch = useDispatch()
  const initVals = {
    errPathologies: false,
    errDiagnostic: false,
    errMedication_administered: false,
    errGlobal_desc: false,
  }
  const [errors, setErrors] = useState(initVals)

  const catchSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if (props.values.diagnostic === '') { setErrors({ ...errors, errDiagnostic: true }); isValid = false }
    if (props.values.pathologies.length < 1) { setErrors({ ...errors, errPathologies: true }); isValid = false }
    if (props.values.medication_administered === '') { setErrors({ ...errors, errMedication_administered: true }); isValid = false }
    if (props.values.global_desc === '') { setErrors({ ...errors, errGlobal_desc: true }); isValid = false }

    if (isValid) { dispatch({ type: UPDATE_LEVEL, level: 'treatplan' }) }
  }

  const catchOnmit = async (event) => {
    event.preventDefault()
    dispatch({ type: UPDATE_LEVEL, level: 'exam' })
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
              Diagnostic
            </Typography>
            <form className={classes.form} noValidate>

              <TextField
                aria-label='minimum height'
                placeholder='diagnostic'
                variant='outlined'
                label='Intraorale et extraorale'
                multiline
                autoFocus
                fullWidth
                margin='dense'
                required
                name='diagnostic'
                type='textarea'
                id='diagnostic'
                value={props.values.diagnostic}
                autoComplete='current-diagnostic'
                onChange={props.onChange('diagnostic')}
                error={errors.errDiagnostic}
              />

              <br /> <br />

              <Typography component='h1' variant='h5'>
                Pathologies
              </Typography>
              <TextField
                className='textField'
                id='pathologies'
                select
                label='Pathologies'
                onChange={props.onChange('pathologies')}
                variant='outlined'
                fullWidth
                SelectProps={{
                  multiple: true,
                  value: props.values.pathologies
                }}
                error={errors.errPathologies}
              >
                {pathologies && pathologies.map((value) => (
                  <MenuItem key={value['@id']} value={value['@id']}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>

              <br /> <br />

              <InputLabel className='inputLabel'>
               Description globale
              </InputLabel>
              <TextField
                aria-label='minimum height'
                placeholder='Description globale'
                variant='outlined'
                margin='normal'
                label='Description globale'
                multiline
                autoFocus
                required
                name='global_desc'
                type='textarea'
                id='global_desc'
                value={props.values.global_desc}
                autoComplete='current-global_desc'
                onChange={props.onChange('global_desc')}
                error={errors.errGlobal_desc}
              />

              <br /> <br />

              <TextField
                variant='outlined'
                margin='normal'
                required
                name='medication_administered'
                label='Médicaments administrés'
                multiline
                type='text'
                id='medication_administered'
                value={props.values.medication_administered}
                autoComplete='current-medication_administered'
                onChange={props.onChange('medication_administered')}
                error={errors.errMedication_administered}
              />

              <br /> <br />

              <center>
                <TableRow>
                  <Button
                    variant='contained'
                    type='submit'
                    onClick={catchOnmit}
                  >
                    <ArrowBackIcon />
                  </Button>

                  <Button
                    variant='contained'
                    type='submit'
                    onClick={catchSubmit}
                  >
                    <ArrowForwardIcon />
                  </Button>
                </TableRow>
              </center>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Diagnostic
