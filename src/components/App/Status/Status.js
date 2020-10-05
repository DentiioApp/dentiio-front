import './status.scss'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import {
  Paper,
  Typography,
  Input
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import FormHelperText from '@material-ui/core/FormHelperText'
import { makeStyles } from '@material-ui/core/styles'
import imgDesktop from '../../../images/illus.png'
import imgMobile from '../../../images/mobile-bg.svg'
import StatusJustif from "../../UI/Modal/StatusJustif";
import GradientBtn from '../../UI/buttons/GradientBtn'
import oStyle from '../../ResponsiveDesign/AuthStyle'
import { checkFiles } from '../../../utils'

import { setup } from '../../../services/Auth'
import { tryLogin, getUserId, saveCard } from '../../../services/Users'

import { LOGIN_FORM, STATUS_FORM, LOG_USER} from '../../../store/actions'
import logo from '../../../images/logo.svg'
import config from '../../../config'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Status = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const messages = config.messages.auth
  const credentials = useSelector((state) => state.user.credentials)
  const fileReader = new FileReader()
  
  useEffect(() => {
    if (credentials && credentials.email !== '') {
      const SignUser = async () => {
        const isSignIn = await tryLogin(credentials.email, credentials.passwd)
        dispatch({ type: LOG_USER, datas: isSignIn })
      }
      SignUser()
    }
  })

  const [errCard, setErrCard] = useState(false)

  const catchSubmit = (e) => {
    e.preventDefault()

    if (errCard || document.querySelector('input').files[0] === undefined) {
      return false
    } else {
      const uploadFile = document.querySelector('input').files[0]

      fileReader.onload = async (FileLoadEvent) => {
        var base64 = FileLoadEvent.target.result

        const response = await saveCard({
          image: base64,
          userId: getUserId()
        })

        if (response === 'OK') { addToast(messages.card.success, { appearance: 'success' }) } else { addToast(messages.card.error, { appearance: 'error' }) }
      }
      fileReader.readAsDataURL(uploadFile)
      
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
  }

  if (!setup()) {
    return <Redirect to='/' />
  };

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
            <Typography component='h1' variant='h5'>
              Validez votre inscription
            </Typography>
            <br/><br/>
            <Typography component='h3' variant='subtitle2'>
              Uploadez votre carte CPS, carte étudiante ou autre document qui montre que vous faites partie du milieu dentaire. <StatusJustif/>
            </Typography>
            <br/>
            <form className={classes.form} noValidate>
              <Input
                type='file'
                fullWidth
                onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit}
                onChange={handleChange('cpsCard')}
                name='cps'
                id='cps'
                required
              />
              <FormHelperText id='my-helper-text'>{errCard || ''}</FormHelperText>
              <br/><br/>


              <div onClick={catchSubmit}>
                <GradientBtn
                  variant='contained'
                  type='submit'
                  description='ENVOYER'
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
