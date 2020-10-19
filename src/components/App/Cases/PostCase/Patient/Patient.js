import './patient.scss'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {
    Switch,
    Typography,
    Button
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms'
import LocalBarIcon from '@material-ui/icons/LocalBar'
import config from '../../../../../config'

import oStyle from '../../../../UI/ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL, UPDATE_STEPPER_POSTCASE } from '../../../../../store/actions'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'


const useStyles = makeStyles((theme) => (oStyle(theme)))

const Patient = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const {ages, sexes} = config

    const initVals = {
        errAge: false,
        errGender: false,
        errReason_consultation: false
    }
    const [errors, setErrors] = useState(initVals)

    const catchSubmit = async (event) => {
        event.preventDefault()
        let isValid = true
        if (props.values.age === '') {
            setErrors({...errors, errAge: true});
            isValid = false
        }
        if (props.values.gender === '') {
            setErrors({...errors, errGender: true});
            isValid = false
        }
        if (props.values.reason_consultation === '') {
            setErrors({...errors, errReason_consultation: true});
            isValid = false
        }
        if (isValid) {
            dispatch({type: UPDATE_LEVEL, level: 'exam'})
            dispatch({type: UPDATE_STEPPER_POSTCASE, levelStepperPostCase: 1})
        }
    }

    return (
        <>
            <form className={classes.form} noValidate>
                <Typography component='h1' variant='h5'>
                    <center>Information patient</center>
                </Typography>
                <Grid container item spacing={3} component='main'>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.paper}>
                            <TextField
                                aria-label='minimum height'
                                multiline
                                rows={4}
                                placeholder='Motif de la consultation'
                                variant='outlined'
                                margin='normal'
                                label='Motif de la consultation'
                                autoFocus
                                required
                                fullWidth
                                name='reason_consultation'
                                type='textarea'
                                id='reason_consultation'
                                value={props.values.reason_consultation}
                                autoComplete='current-reason_consultation'
                                onKeyDown={(e) => e.keyCode !== 13 ? null : catchSubmit(e)}
                                onChange={props.onChange('reason_consultation')}
                                error={errors.errReason_consultation}
                            />
                            <br/>
                            <TextField
                                className='textField'
                                id='age'
                                label='Age'
                                select
                                fullWidth
                                onChange={props.onChange('age')}
                                variant='outlined'
                                value={props.values.age === undefined ? 18 : props.values.age}
                                error={errors.errAge}
                            >
                                {ages && ages.map((index, value) => (
                                    <MenuItem key={index + 1} value={value}>
                                        {value + ' ans'}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <br/> <br/>

                            <TextField
                                className='textField'
                                id='gender'
                                label='Sexe'
                                select
                                fullWidth
                                value={props.values.gender === undefined ? 'M' : props.values.gender}
                                onChange={props.onChange('gender')}
                                variant='outlined'
                                error={errors.errGender}
                            >
                                {sexes && sexes.map((value, id) => (
                                    <MenuItem key={id} value={value.id}>
                                        {value.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <br/> <br/>

                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <InputLabel className='inputLabel'>
                                        Fumeur <SmokingRoomsIcon/>
                                    </InputLabel>
                                    <Switch
                                        checked={props.values.isASmoker}
                                        onChange={props.onChange('isASmoker')}
                                        color='primary'
                                        name='isASmoker'
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                    /> </Grid>
                                <Grid item xs={6}>
                                    <InputLabel className='inputLabel'>
                                        Alcool <LocalBarIcon/>
                                    </InputLabel>
                                    <Switch
                                        checked={props.values.isDrinker}
                                        onChange={props.onChange('isDrinker')}
                                        color='primary'
                                        name='isDrinker'
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.paper}>

                            <TextField
                                aria-label='minimum height'
                                placeholder='Antécédents médicaux'
                                variant='outlined'
                                margin='normal'
                                label='Antécédents médicaux'
                                multiline
                                autoFocus
                                required
                                fullWidth
                                name='old_injury'
                                type='textarea'
                                id='old_injury'
                                value={props.values.old_injury}
                                autoComplete='current-old_injury'
                                onChange={props.onChange('problem_health')}
                                error={errors.errProblem_health}
                            />

                            <TextField
                                aria-label='minimum height'
                                placeholder='Renseignez le(s) traitement(s)'
                                variant='outlined'
                                label='Sous traitement'
                                multiline
                                fullWidth
                                margin='normal'
                                required
                                name='current_treatment'
                                type='textarea'
                                id='current_treatment'
                                value={props.values.errCurrent_treatment}
                                autoComplete='current-current_treatment'
                                onChange={props.onChange('current_treatment')}
                                error={errors.errCurrent_treatment}
                            />
                            <br/>

                            <TextField
                                aria-label='minimum height'
                                placeholder='Allergie(s)'
                                variant='outlined'
                                label='Allergie(s)'
                                multiline
                                fullWidth
                                margin='normal'
                                name='allergies'
                                type='textarea'
                                id='current_allergies'
                                value={props.values.allergies}
                                autoComplete='current-allergies'
                                onChange={props.onChange('allergies')}
                                error={errors.errAllergies}
                            />

                            <br/> <br/>
                        </div>

                    </Grid>
                </Grid>
                <center>
                    <Button disabled className={classes.button}>
                        Précédent
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type='submit'
                        onClick={catchSubmit}
                    >
                        Suivant
                    </Button>
                </center>
            </form>

        </>
    )
}

export default Patient
