import './diagnostic.scss'

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

import { setup } from '../../../services/Auth'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Diagnostic = (props) => {
  const classes = useStyles()
  const pathologies = useSelector((state) => state.home.pathologies)
  const symptomes = useSelector((state) => state.home.symptomes)

  const dispatch = useDispatch()
  const catchSubmit = async (event) => {
    event.preventDefault()
    dispatch({ type: UPDATE_LEVEL, level: 'treatplan' })
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

              <TextareaAutosize
                aria-label='minimum height'
                rowsMin={3} placeholder='diagnostic'
                variant='outlined'
                margin='normal'
                required
                name='diagnostic'
                type='textarea'
                id='diagnostic'
                autoComplete='current-diagnostic'
                onChange={props.onChange('diagnostic')}
              />

              <Typography component='h1' variant='h5'>
                Pathologies
              </Typography>
              <TextField
                className='textField'
                id='pathologies'
                select
                onChange={props.onChange('pathologies')}
                variant='outlined'
                fullWidth
                SelectProps={{
                  multiple: true,
                  value: props.values.pathologies
                }}
              >
                {pathologies && pathologies.map((value) => (
                  <MenuItem key={value['@id']} value={value['@id']}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>

              <Typography component='h1' variant='h5'>
                Symptomes
              </Typography>
              <TextField
                className='textField'
                id='symptomes'
                select
                onChange={props.onChange('symptomes')}
                variant='outlined'
                fullWidth
                SelectProps={{
                  multiple: true,
                  value: props.values.symptomes
                }}
              >
                {symptomes && symptomes.map((value) => (
                  <MenuItem key={value['@id']} value={value['@id']}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>

              <div onClick={catchSubmit}>
                <GradientBtn
                  variant='contained'
                  type='submit'
                  description='SUIVANT'
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

export default Diagnostic
