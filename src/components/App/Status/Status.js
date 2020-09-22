import './status.scss'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import {
  Paper,
  Typography
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import { makeStyles } from '@material-ui/core/styles'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'

import { SaveCard } from '../../../services/SaveCard'
import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { checkFiles } from '../../../utils'

import { setup } from '../../../services/Auth'
import { LOGIN_FORM, STATUS_FORM } from '../../../store/actions'
import logo from '../../../images/logo.svg'
import avatar from '../../../images/logoteeth_blue.png'
import config from '../../../config'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Status = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const messages = config.messages.auth

  const initValues = {
    card: ''
  }

  const [values, setValues] = useState(initValues)
  const [errCard, setErrCard] = useState(false)

  const catchSubmit = (e) => {
    e.preventDefault()

    if (errCard) {
      return false
    } else {
      const formData = new FormData()

      formData.append(
        'card',
        values.card.name
      )

      // dispatch(
      SaveCard({
        url: values.card.files
      })
      // )
      addToast(messages.card.success, { appearance: 'success' })
      dispatch({ type: STATUS_FORM })
      dispatch({ type: LOGIN_FORM })
    }
  }

  const handleChange = prop => event => {
    const checkedFile = checkFiles(event)
    if (checkedFile.error === true) {
      setErrCard(checkedFile.message)
    } else {
      setErrCard(false)
    }

    setValues({ ...values, card: event.target.value })
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
              Je Valide Mon Status
            </Typography>
            <form className={classes.form} noValidate>
              <Button variant='contained' component='label'>
                Ma carte CPS
                <input
                  type='file'
                  onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit}
                  onChange={handleChange('cpsCard')}
                  name='cps'
                  id='cps'
                  multiple
                />
              </Button>

              <FormHelperText id='my-helper-text'>{errCard || ''}</FormHelperText>

              <div onClick={catchSubmit}>
                <GradientBtn
                  variant='contained'
                  type='submit'
                  description='Reclamer mon statut'
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

export default Status
