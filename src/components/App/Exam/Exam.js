import './exam.scss'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
import MenuItem from '@material-ui/core/MenuItem'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL } from '../../../store/actions'

import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Exam = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const symptomes = useSelector((state) => state.home.symptomes)

  const initVals = {
    exam_pics: [],
    extra_exam_desc: [],
    errIntra_extra_oral_desc: false,
    errExtra_exam_name: false,
    errSymptomes: false
  }
  const [errors, setErrors] = useState(initVals)

  const catchSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if (props.values.intra_extra_oral_desc === '') { setErrors({ ...errors, errIntra_extra_oral_desc: true }); isValid = false }
    if (props.values.extra_exam_name < 1) { setErrors({ ...errors, errExtra_exam_name: true }); isValid = false }
    if (props.values.extra_exam_desc < 1) { setErrors({ ...errors, errExtra_exam_desc: true }); isValid = false }
    if (props.values.symptomes.length < 1) { setErrors({ ...errors, errSymptomes: true }); isValid = false }

    if (isValid) { dispatch({ type: UPDATE_LEVEL, level: 'diagnostic' }) }
  }
  const catchOnmit = async (event) => {
    event.preventDefault()
    dispatch({ type: UPDATE_LEVEL, level: '' })
  }

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

              <br /> <br />

              <Typography component='h1' variant='h5'>
                Symptomes
              </Typography>
              <TextField
                className='textField'
                id='Symptomes'
                label='Symptomes'
                select
                onChange={props.onChange('symptomes')}
                variant='outlined'
                fullWidth
                SelectProps={{
                  multiple: true,
                  value: props.values.symptomes
                }}
                error={errors.errSymptomes}
              >
                {symptomes && symptomes.map((value) => (
                  <MenuItem key={value['@id']} value={value['@id']}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>

              <br /> <br />

              <Typography component='h1' variant='h5'>
                Examen Complementaire
              </Typography>

              <TextField
                aria-label='minimum height'
                placeholder="Renseignez le nom l'examen"
                variant='outlined'
                margin='dense'
                label="Nom de l'examen"
                multiline
                required
                name='extra_exam_name'
                type='textarea'
                id='extra_exam_name'
                value={props.values.extra_exam_name}
                autoComplete='current-extra_exam_name'
                onChange={props.onChange('extra_exam_name')}
                error={errors.errExtra_exam_name}
              />

              <TextField
                aria-label='minimum height'
                placeholder='Description'
                variant='outlined'
                label='Description'
                multiline
                autoFocus
                fullWidth
                margin='dense'
                required
                name='extra_exam_desc'
                type='textarea'
                id='extra_exam_desc'
                value={props.values.extra_exam_desc}
                autoComplete='current-extra_exam_desc'
                onChange={props.onChange('extra_exam_desc')}
                error={errors.errExtra_exam_desc}
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
