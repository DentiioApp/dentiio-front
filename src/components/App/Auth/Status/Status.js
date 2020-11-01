import './status.scss'

import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useToasts} from 'react-toast-notifications'
import {
    Typography,
    Input,
    FormControl
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import FormHelperText from '@material-ui/core/FormHelperText'
import {makeStyles} from '@material-ui/core/styles'
import imgDesktop from '../../../../images/illus.png'
import imgMobile from '../../../../images/mobile-bg.svg'
import StatusJustif from '../../../UI/Modal/StatusJustif'
import GradientBtn from '../../../UI/buttons/GradientBtn'
import oStyle from '../../../UI/ResponsiveDesign/AuthStyle'
import {checkFiles, checkPassword, errorApi} from '../../../../utils'
import {loginCheck, getUserId, saveCard, registerCheck} from '../../../../services/Users'
import Spinner from "../../../UI/Dawers/Spinner";
import {
    LOG_USER,
    REGISTER_USER,
    BACK_LOGIN_FORM, VALID_STATUS
} from '../../../../store/actions'
import config from '../../../../config'
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import {sendEmail} from "../../../../services/Email";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Status = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {addToast} = useToasts()
    const messages = config.messages.auth
    const user = useSelector((state) => state.user)
    const fileReader = new FileReader()
    const [values, setValues] = useState({
        pseudo: user.pseudo,
        email: user.email,
        password: user.password,
        acceptCgu: user.acceptCgu,
        licenceDoc: user.licenceDoc,
        job: user.job
    })
    const {jobs} = useSelector((state) => state.home)
    const [showButton, setshowButton] = useState(false)
    const [showSpinner, setshowSpinner] = useState(false)

    useEffect(() => {
        dispatch({type: REGISTER_USER, datas: values})
        if ((values.job !== '' && values.licenceDoc && (errCard.error === false))) {
            setshowButton(true)
        } else setshowButton(false)
    }, [values]);

    const [errCard, setErrCard] = useState({error: true, message: false})
    const [emailSent, setEmailSent] = useState(false)
    console.log(errCard)


    const catchSubmit = (e) => {
        e.preventDefault()
        setshowSpinner(true)
        setshowButton(false)
        fileReader.onload = async (FileLoadEvent) => {
            const licenceBase64 = FileLoadEvent.target.result
            const response = await sendRequest(licenceBase64)
            if (response && response.valid) {
                addToast(messages.register.success, {appearance: 'success'})
                if (!emailSent) {
                    const mailing = await sendEmail(values.email, values.pseudo)
                    if (mailing.data !== 'OK') {
                        console.log('Erreur lors de l\'envoi du mail')
                    }
                    setEmailSent(true)
                }
            } else {
                console.log(response.datas)
                addToast(response.datas, {appearance: 'error'})
                setshowSpinner(false)
                setshowButton(true)
            }
        }
        if (values.licenceDoc){
            fileReader.readAsDataURL(values.licenceDoc)
        }
    }

    const sendRequest = async (licenceBase64) => {
        return await registerCheck({
            pseudo: values.pseudo,
            email: values.email.toLowerCase(),
            password: values.password,
            job: '/api/jobs/' + values.job,
            roles: [
                "ROLE_USER"
            ],
            createdAt: new Date().toISOString(),
            isEnabled: true,
            image64: licenceBase64,
            acceptCgu: true
        })
    }

    const handleChangeFile = () => event => {
        const checkedFile = checkFiles(event)
        if (checkedFile.error === true) {
            setErrCard({error: true, message: checkedFile.message})
            setshowButton(false)
        } else {
            setErrCard({error: false, message: false})
            setValues({...values, licenceDoc: event.target.files[0]})
        }
    }

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value})
    }

    const goBack = () => {
        dispatch({type: BACK_LOGIN_FORM})
    }

    return (
        <>
            <Grid container component='main'>
                <Grid item xs={1} md={3}>
                    <IconButton className={classes.arrowBack} href={"#"} onClick={goBack}>
                        <ArrowBackIcon color='primary'/>
                    </IconButton>
                </Grid>
                <Grid item xs={10} md={6}>
                    <Typography component='h1' variant='h4' className='title'>
                        <center>C'est l'heure des présentations</center>
                    </Typography>
                    <br/><br/>

                    <form className={classes.form} noValidate>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="job">Vous êtes*</InputLabel>
                            <Select
                                labelId="job"
                                id="job"
                                inputProps={{
                                    name: 'job',
                                    id: 'job',
                                }}
                                onChange={handleChange('job')}
                                label="Vous êtes*"
                                value={values.job ? values.job : ''}
                            >
                                {jobs && jobs.map(option => (
                                    <MenuItem key={option.ident} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br/><br/>
                        <Typography component='h3' variant='subtitle2'>
                            Justificatif de votre statut de professionnel de santé <StatusJustif/>
                        </Typography>
                        <Input
                            type='file'
                            fullWidth
                            onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit}
                            onChange={handleChangeFile()}
                            name='cps'
                            id='cps'
                            required
                            //value={values.licenceDoc ? values.licenceDoc : '' }
                        />
                        <FormHelperText id='my-helper-text'>{errCard.message || ''}</FormHelperText>
                        <br/><br/>

                        <div onClick={catchSubmit} hidden={!showButton}>
                            <GradientBtn
                                variant='contained'
                                type='submit'
                                description='ENVOYER'
                                className='GradientBtn'
                            />
                        </div>
                        <div hidden={!showSpinner}>
                            <Spinner/>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </>
    )
}

export default Status
