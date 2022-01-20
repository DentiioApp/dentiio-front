import './conclusion.scss'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  Paper,
  Typography,
  TextField,
  Button
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import oStyle from '../../../../UI/ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL } from '../../../../../store/actions'

const useStyles = makeStyles((theme) => (oStyle(theme)))

const Conclusion = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const initVals = {
    errConclusion: false
  }
  const [errors, setErrors] = useState(initVals)

  const catchSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if (props.values.conclusion === '') { setErrors({ ...errors, errConclusion: true }); isValid = false }
    if (isValid) { dispatch({ type: UPDATE_LEVEL, level: 'cliniccase' }) }
  }

  const catchOnmit = async (event) => {
    event.preventDefault()
    dispatch({ type: UPDATE_LEVEL, level: 'evolution' })
  }

  return (
    <>
      <Grid container component='main' className={classes.root}>
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
            <Typography component='h1' variant='h5'>
              Conclusion
            </Typography>
            <form className={classes.form} noValidate>

              <TextField
                aria-label='minimum height'
                rowsMin={3} placeholder='Conclusion'
                variant='outlined'
                margin='normal'
                required
                autoFocus
                name='conclusion'
                type='textarea'
                id='conclusion'
                label='Conclusion'
                multiline
                value={props.values.conclusion}
                autoComplete='current-conclusion'
                onChange={props.onChange('conclusion')}
                error={errors.errConclusion}
              />

              <br />  <br />

              <center>
                <Grid item xs={12}>
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
                </Grid>
              </center>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Conclusion
