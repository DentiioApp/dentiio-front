import './treatPlan.scss'
import {MuiThemeProvider, createTheme} from "@material-ui/core/styles";
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {
    Typography,
    Button
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import oStyle from '../../../../UI/ResponsiveDesign/AuthStyle'
import {UPDATE_LEVEL, UPDATE_STEPPER_POSTCASE} from '../../../../../store/actions'
import InputLabel from '@material-ui/core/InputLabel'
import {DropzoneArea} from "material-ui-dropzone";
import CreatableSelect from "react-select/creatable/dist/react-select.esm";

const useStyles = makeStyles((theme) => (oStyle(theme)))

const theme = createTheme({
    overrides: {
        MuiDropzoneArea: {
            root: {
                minHeight: '100px',
                marginTop: '15px'
            },
        }
    }
});

const TreatPlan = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const treatments = useSelector((state) => state.home.treatments)

    const initVals = {
        errStep: false,
        errTreatment: false
    }
    const [errors, setErrors] = useState(initVals)

    const catchSubmit = async (event) => {
        event.preventDefault()
        let isValid = true
        if (props.values.step1.length < 1) {
            setErrors({...errors, errStep: true});
            isValid = false
        }
        if (props.values.treatment.length < 1) {
            setErrors({...errors, errTreatment: true});
            isValid = false
        }

        if (isValid) {
            dispatch({type: UPDATE_LEVEL, level: 'evolution'})
            dispatch({type: UPDATE_STEPPER_POSTCASE, levelStepperPostCase: 4})
        }
    }

    const catchOnmit = async (event) => {
        event.preventDefault()
        dispatch({type: UPDATE_LEVEL, level: 'diagnostic'})
        dispatch({type: UPDATE_STEPPER_POSTCASE, levelStepperPostCase: 2})
    }

    const step = [1, 2, 3]
    let newTreatments1 = treatments.map(({'@id': value, ...rest}) => ({value, ...rest}));
    const newTreatments = newTreatments1.map(({'name': label, ...rest}) => ({label, ...rest}));

    return (
        <>
            <Typography component='h1' variant='h5'>
                <center>Plan de traitement</center>
            </Typography>
            <form className={classes.form} noValidate>
                <Grid container component='main'>
                    <Grid item xs={12} sm={12}>
                        {step.map((step) => (
                            <div key={step} className={classes.paper}>
                                <InputLabel className='inputLabel'>
                                    Etape {step}
                                </InputLabel>
                                <Grid container component='main'>
                                    <Grid item xs={12} sm={6}>
                                        <div className={classes.paper}>
                                            <TextField
                                                placeholder='Description'
                                                variant='outlined'
                                                margin='normal'
                                                required
                                                autoFocus
                                                rows={7}
                                                fullWidth
                                                label={'Etape ' + step}
                                                multiline
                                                name={'step' + step}
                                                type='textarea'
                                                id={'step' + step}
                                                value={props.values['step' + step]}
                                                autoComplete={'current-step' + step}
                                                onChange={props.onChange('step' + step)}
                                                error={step === 1 ? errors.errStep : false}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div className={classes.paper}>
                                            <MuiThemeProvider theme={theme}>
                                                <DropzoneArea
                                                    showPreviews={true}
                                                    dropzoneText={'Déposez vos photos'}
                                                    showPreviewsInDropzone={false}
                                                    useChipsForPreview
                                                    previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                                                    previewText="Selected files"
                                                    Icon={AddAPhotoIcon}
                                                />
                                            </MuiThemeProvider>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        ))}
                        <Grid item xs={12}>
                            <div className={classes.paper}>
                                <div style={{width: '100%'}}>
                                    <CreatableSelect
                                        placeholder={'Traitement, pas encore fonctionnel'}
                                        isMulti
                                        //onChange={props.onChange('treatment')}
                                        options={newTreatments}
                                    />
                                </div>
                                <TextField
                                    className='textField'
                                    id='treatment'
                                    select
                                    onChange={props.onChange('treatment')}
                                    variant='outlined'
                                    fullWidth
                                    SelectProps={{
                                        multiple: true,
                                        value: props.values.treatment
                                    }}
                                    error={errors.errTreatment}
                                >
                                    {treatments && treatments.map((value) => (
                                        <MenuItem key={value['@id']} value={value['@id']}>
                                            {value.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <br/>
                <center>
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
                        Suivant
                    </Button>
                </center>
                <br/><br/><br/><br/>
            </form>
        </>
    )
}

export default TreatPlan
