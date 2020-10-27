import './status.scss'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import {
  Paper,
  Typography,
  Input,
  FormControl
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import FormHelperText from '@material-ui/core/FormHelperText'
import { makeStyles } from '@material-ui/core/styles'
import imgDesktop from '../../../../images/illus.png'
import imgMobile from '../../../../images/mobile-bg.svg'
import StatusJustif from '../../../UI/Modal/StatusJustif'
import GradientBtn from '../../../UI/buttons/GradientBtn'
import oStyle from '../../../UI/ResponsiveDesign/AuthStyle'
import { checkFiles, errorApi } from '../../../../utils'

import {loginCheck, getUserId, saveCard, registerCheck} from '../../../../services/Users'

import {LOG_USER, VALID_STATUS, FREE_CREDENTIALS, REGISTER_USER} from '../../../../store/actions'
import logo from '../../../../images/logo.svg'
import config from '../../../../config'
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {sendEmail} from "../../../../services/Email";
const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Status = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const messages = config.messages.auth
  const credentials = useSelector((state) => state.user.credentials)
  const fileReader = new FileReader()
  const [values, setValues] = useState({job: ''})
  const { jobs } = useSelector((state) => state.home)

  useEffect(() => {
    if (credentials && credentials.email !== '') {
      return async () => {
        const isSignIn = await loginCheck(credentials.email, credentials.passwd)
        if (isSignIn.datas !== undefined && !errorApi().test(isSignIn.datas)) {
          dispatch({ type: LOG_USER, datas: isSignIn.datas })
          dispatch({ type: FREE_CREDENTIALS })
        } else {
          addToast(messages.signin.autoLogError, { appearance: 'warning' })
        }
      }
    }
  })

  const [errCard, setErrCard] = useState(false)
  const [emailSent, setEmailSent] = useState(false)


  const catchSubmit = (e) => {
    e.preventDefault()
    const respo = sendRequest()
    respo.then((res) => {
      addToast(res.message, { appearance: res.appearance })
    })

    if (errCard || document.querySelector('input').files[0] === undefined) {
      return false
    } else {
      addToast(messages.card.pending, { appearance: 'info' })

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
      dispatch({ type: VALID_STATUS })
    }
  }

  const handleChangeFile = prop => event => {
    const checkedFile = checkFiles(event)

    if (checkedFile.error === true) {
      setErrCard(checkedFile.message)
    } else {
      setErrCard(false)
    }
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const sendRequest = async () => {
    const response = await registerCheck({
      email: values.email.toLowerCase(),
      password: values.password,
      job: '/api/jobs/' + values.job,
      createdAt: new Date().toISOString(),
      isEnabled: true
    })
    if (response === {}) {
      return { message: messages.register.error, appearance: 'error' }
    } else {
      if (!emailSent) {
        const mailing = await sendEmail(values.email, values.pseudo)
        if (mailing.data !== 'OK') { console.log('Erreur lors de l\'envoi du mail') }
        setEmailSent(true)
      }
    }
  }


  return (
    <>
      <Grid container component='main'>
        <Grid item xs={1} md={3}>
        </Grid>
        <Grid item xs={10} md={6}>
          <Typography component='h1' variant='h4' className='title'>
            <center>C'est l'heure des présentation</center>
          </Typography>
            <br /><br />
            <FormControl fullWidth variant="outlined" className={classes.formControl}>
              <InputLabel id="job">Vous êtes*</InputLabel>
              <Select
                  labelId="demo-simple-select-outlined-label"
                  id="job"
                  onChange={handleChange('job')}
                  label="Vous êtes*"
                  value={values.job === '' ? '' : values.job}
              >
                {jobs && jobs.map(option => (
                    <MenuItem key={option.ident} value={option.id}>
                      {option.name}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography component='h3' variant='subtitle2'>
              Uploadez votre carte CPS, carte étudiante ou autre document qui montre que vous faites partie du milieu dentaire. <StatusJustif />
            </Typography>
            <br />
            <form className={classes.form} noValidate>
              <Input
                type='file'
                fullWidth
                onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit}
                onChange={handleChangeFile('cpsCard')}
                name='cps'
                id='cps'
                required
              />
              <FormHelperText id='my-helper-text'>{errCard || ''}</FormHelperText>
              <br /><br />

              <div onClick={catchSubmit}>
                <GradientBtn
                  variant='contained'
                  type='submit'
                  description='ENVOYER'
                  className='GradientBtn'
                />
              </div>
            </form>
        </Grid>
      </Grid>
    </>
  )
}

export default Status
