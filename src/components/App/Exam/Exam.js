import './exam.scss'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  Paper,
  Typography,
  Button,
  TableRow
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import InputLabel from '@material-ui/core/InputLabel'

import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL } from '../../../store/actions'

import { setup } from '../../../services/Auth'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Exam = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const initVals = {
    errIntra_extra_oral_desc: false,
    errProblem_health: false,
    errIn_treatment: false,
    errExam_name: false
  }
  const [errors, setErrors] = useState(initVals)

  const catchSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if (props.values.intra_extra_oral_desc === '') { setErrors({ ...errors, errIntra_extra_oral_desc: true }); isValid = false }
    if (props.values.problem_health === '') { setErrors({ ...errors, errProblem_health: true }); isValid = false }
    if (props.values.in_treatment === '') { setErrors({ ...errors, errIn_treatment: true }); isValid = false }
    if (props.values.exam_name === '') { setErrors({ ...errors, errExam_name: true }); isValid = false }

    if (isValid) { dispatch({ type: UPDATE_LEVEL, level: 'diagnostic' }) }
  }

  const catchOnmit = async (event) => {
    event.preventDefault()
    dispatch({ type: UPDATE_LEVEL, level: '' })
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
              Examen Clinique
            </Typography>
            <form className={classes.form} noValidate>

              <Button variant='contained' component='label'>
                <InputLabel className='inputLabel'>
                  Ajouter des Photos:
                </InputLabel>
                <input
                  type='file'
                  onChange={props.onChange('exam_pics')}
                  name='exam_pics'
                  id='exam_pics'
                  multiple
                />
              </Button>

              <TextField
                aria-label='minimum height'
                // placeholder='Description intraorale et extraorale'
                variant='outlined'
                margin='dense'
                label='Description intraorale et extraorale'
                multiline
                autoFocus
                required
                fullWidth
                name='intra_extra_oral_desc'
                type='textarea'
                id='intra_extra_oral_desc'
                value={props.values.intra_extra_oral_desc}
                autoComplete='current-intra_extra_oral_desc'
                onChange={props.onChange('intra_extra_oral_desc')}
                error={errors.errIntra_extra_oral_desc}
              />

              <Typography component='h1' variant='h5'>
                Examen Complementaire
              </Typography>

              <TextField
                aria-label='minimum height'
                placeholder='Renseignez le(s) probleme(s) cardiaque'
                variant='outlined'
                margin='dense'
                label='Probleme cardiaque'
                multiline
                required
                fullWidth
                name='problem_health'
                type='textarea'
                id='problem_health'
                value={props.values.problem_health}
                autoComplete='current-problem_health'
                onChange={props.onChange('problem_health')}
                error={errors.errProblem_health}
              />

              <TextField
                aria-label='minimum height'
                placeholder="Renseignez le nom l'examen"
                variant='outlined'
                margin='dense'
                label="Nom de l'examen"
                multiline
                required
                name='exam_name'
                type='textarea'
                id='exam_name'
                value={props.values.exam_name}
                autoComplete='current-exam_name'
                onChange={props.onChange('exam_name')}
                error={errors.errExam_name}
              />

              <br />  <br />

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

export default Exam
