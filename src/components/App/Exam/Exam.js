import './exam.scss'

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


const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Exam = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const catchSubmit = async (event) => {
    event.preventDefault()
    dispatch({type: UPDATE_LEVEL, level:'diagnostic'})
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
                  onChange={props.onChange('cpsCard')}
                  name='cps'
                  id='cps'
                  multiple
                />
              </Button>

              <TextareaAutosize
                aria-label="minimum height" 
                rowsMin={3} placeholder="Description intraorale et extraorale"
                variant='outlined'
                margin='normal'
                required
                name='intra_extra_oral_desc'
                type='textarea'
                id='intra_extra_oral_desc'
                autoComplete='current-intra_extra_oral_desc'
                //onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={props.onChange('intra_extra_oral_desc')}
              />

              <Typography component='h1' variant='h5'>
                Examen Complementaire
              </Typography>
              
              <InputLabel className='inputLabel'>
                Probleme cardiaque
              </InputLabel>
              <TextareaAutosize
                aria-label="minimum height" 
                rowsMin={3} placeholder="Renseignez le(s) probleme(s) cardiaque"
                variant='outlined'
                margin='normal'
                required
                
                name='problem_health'
                type='textarea'
                id='problem_health'
                autoComplete='current-problem_health'
                //onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={props.onChange('problem_health')}
              />
              
              <InputLabel className='inputLabel'>
                Sous traitement :
              </InputLabel>
              <TextareaAutosize
                aria-label="minimum height" 
                rowsMin={3} placeholder="Renseignez le(s) traitement(s)"
                variant='outlined'
                margin='normal'
                required
                name='in_treatment'
                type='textarea'
                id='in_treatment'
                autoComplete='current-in_treatment'
                //onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                onChange={props.onChange('in_treatment')}
              />
                
              <hr/>

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

export default Exam
