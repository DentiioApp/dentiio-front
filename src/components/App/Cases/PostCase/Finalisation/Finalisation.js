//import './finalisation.scss'
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useToasts} from 'react-toast-notifications'
import {
    Typography,
    Button
} from '@material-ui/core/'
import SaveIcon from '@material-ui/icons/Save'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import oStyle from '../../../../UI/ResponsiveDesign/AuthStyle'
import {UPDATE_LEVEL, START_LOADER, STOP_LOADER, UPDATE_STEPPER_POSTCASE} from '../../../../../store/actions'
import config from '../../../../../config'
import {postCase} from '../../../../../services/Cases'
import {postPatient} from '../../../../../services/Patient'
import {errorApi} from '../../../../../utils'
import Spinner from '../../../../UI/Dawers/Spinner'

const useStyles = makeStyles((theme) => (oStyle(theme)))

const Finalisation = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {addToast} = useToasts()
    const history = useHistory()
    const messages = config.messages.cases

    const loader = useSelector((state) => state.home.loader)

    const initVals = {
        errTitle: false,
        errSummary: false,
        errKeywords: false,
        errSpecialities: false
    }

    const [errors, setErrors] = useState(initVals)

    const catchSubmit = async (event) => {
        event.preventDefault()
        let isValid = true
        if (props.values.title === '') {
            setErrors({...errors, errTitle: true});
            isValid = false
        }
        if (props.values.summary === '') {
            setErrors({...errors, errSummary: true});
            isValid = false
        }
        if (props.values.keywords.length < 1) {
            setErrors({...errors, errKeywords: true});
            isValid = false
        }
        if (props.values.specialities.length < 1) {
            setErrors({...errors, errSpecialities: true});
            isValid = false
        }

        if (isValid) {
            dispatch({type: START_LOADER})

            const patient = await postPatient(props.values)

            if (!errorApi().test(patient)) {
                const datas = await postCase(props.values, patient.datas['@id'])

                if (errorApi().test(datas)) {
                    addToast(messages.error, {appearance: 'error'})
                } else {
                    addToast(messages.success, {appearance: 'success'})
                    history.push('/')
                }
            } else {
                addToast(messages.patientError, {appearance: 'error'})
            }
            dispatch({type: STOP_LOADER})
            dispatch({type: UPDATE_LEVEL, level: ''})
            dispatch({type: UPDATE_STEPPER_POSTCASE, levelStepperPostCase: 0})
        }
    }

    const catchOnmit = async (event) => {
        event.preventDefault()
        dispatch({type: UPDATE_LEVEL, level: 'diagnostic'})
        dispatch({type: UPDATE_STEPPER_POSTCASE, levelStepperPostCase: 4})
    }

    if (loader === true) {
        return (<Spinner/>)
    } else {
        return (
            <>
                <Typography component='h1' variant='h5'>
                    <center>Ajouter votre cas clinique</center>
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container component='main'>
                        <Grid item xs={12}>
                            <div className={classes.paper}>
                                <Typography component='h1' variant='h5'>
                                    Titre du cas
                                </Typography>
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    autoFocus
                                    name='title'
                                    label='Titre du cas'
                                    type='text'
                                    id='title'
                                    autoComplete='current-title'
                                    onChange={props.onChange('title')}
                                    error={errors.errTitle}
                                />
                                <br/> <br/>
                            </div>
                        </Grid>
                    </Grid>
                    <center>
                        <Grid item xs={12}>
                            <Button className={classes.button}
                                    onClick={catchOnmit}
                            >
                                Précédent
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                type='submit'
                                onClick={catchSubmit}
                            >
                                <SaveIcon/>
                            </Button>
                        </Grid>
                    </center>
                    <br/><br/><br/><br/>
                </form>
            </>
        )
    }
}

export default Finalisation
