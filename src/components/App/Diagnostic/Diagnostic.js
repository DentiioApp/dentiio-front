import './diagnostic.scss'

import React from 'react'
import { useDispatch } from 'react-redux'

import {
  Paper,
  Switch,
  Typography,
  TextareaAutosize,
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'
import Button from '@material-ui/core/Button'
import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL } from '../../../store/actions'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import { setup } from '../../../services/Auth'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'
import config from '../../../config'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Diagnostic = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const catchSubmit = async (event) => {
    dispatch({type: UPDATE_LEVEL, level:'treatplan'})
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
                aria-label="minimum height" 
                rowsMin={3} placeholder="diagnostic"
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='diagnostic'
                type='textarea'
                id='diagnostic'
                autoComplete='current-diagnostic'
                //onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={props.onChange('diagnostic')}
              />

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
