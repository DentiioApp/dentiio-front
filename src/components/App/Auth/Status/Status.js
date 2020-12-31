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
import {checkFiles} from '../../../../utils'
import {getUserId, loginCheck, saveCardandJob} from '../../../../services/Users'
import Spinner from "../../../UI/Dawers/Spinner";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
    REGISTER_USER,
    TOKEN_REGENERATE,
    VALID_STATUS
} from '../../../../store/actions'
import config from '../../../../config'
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from 'react-router-dom'
import {login, logout} from "../../../../services/Auth";


const useStyles = makeStyles((theme) => (oStyle(theme, imgDesktop, imgMobile)))

const Status = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {addToast} = useToasts()
    const messages = config.messages.auth
    const user = useSelector((state) => state.user)
    const fileReader = new FileReader()
    const history = useHistory()
    const [values, setValues] = useState({
        licenceDoc: user.licenceDoc,
        job: user.job
    })
    const {jobs} = useSelector((state) => state.home)
    const [showButton, setshowButton] = useState(false)
    const [showSpinner, setshowSpinner] = useState(false)

    useEffect(() => {
        if ((values.job !== '' && values.licenceDoc && (errCard.error === false))) {
            setshowButton(true)
        } else setshowButton(false)
    }, [values]);

    const [errCard, setErrCard] = useState({error: true, message: false})

    const catchSubmit = (e) => {
        e.preventDefault()
        setshowSpinner(true)
        setshowButton(false)
        if (values.licenceDoc){
            fileReader.readAsDataURL(values.licenceDoc)
        }
        fileReader.onload = async (FileLoadEvent) => {
            const licenceBase64 = FileLoadEvent.target.result
            const response = await sendRequest(licenceBase64)
            if (response && response.valid) {
                addToast(messages.register.success, {appearance: 'success'})
                const response = await loginCheck(user.email, user.password)
                logout()
                login(response.datas.data.token)
                dispatch({type: TOKEN_REGENERATE})

            } else {
                addToast(messages.card.error, {appearance: 'error'})
                setshowSpinner(false)
                setshowButton(true)
            }
        }
    }

    const sendRequest = async (licenceBase64) => {
        return await saveCardandJob(getUserId(), licenceBase64, values.job)
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

    return (
        <>
            <Grid container component='main'>
                <Grid item xs={1} md={3}>
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
                            Justificatif de votre statut de professionnel de santé (format png, jpeg)<StatusJustif/>
                        </Typography>
                        <FormControl >
                                <Button
                                        variant="contained"
                                        color="default"
                                        startIcon={<CloudUploadIcon />}
                                    >
                                    <InputLabel htmlFor="cps" className={classes.labelInputFile} >
                                        Uploader mon justificatif
                                    </InputLabel>
                                 </Button>
                        <Input
                            type='file'
                            style={{display: 'none'}}
                            fullWidth
                            onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit}
                            onChange={handleChangeFile()}
                            name='cps'
                            id='cps'
                            required
                        />
                        </FormControl>
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
