import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import config from '../../../../../config'

// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Switch,
    Typography,
    Button
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
// import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms'
import { DropzoneArea/*, DropzoneDialog */} from 'material-ui-dropzone';
import LocalBarIcon from '@material-ui/icons/LocalBar'
import { format_file, post_images } from "../../../../../store/actions";
import { useToasts } from 'react-toast-notifications'

// import oStyle from '../../../../UI/ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL, UPDATE_STEPPER_POSTCASE, START_LOADER, STOP_LOADER } from '../../../../../store/actions'
import { postCase } from '../../../../../services/Cases'
import { postPatient } from '../../../../../services/Patient'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Box from "@material-ui/core/Box";
import { errorApi } from '../../../../../utils'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['PATIENT', 'DIAGNOSTIC', 'FINALISATION'];
}

export default function HorizontalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();
    const messages = config.messages.cases
    const history = useHistory()

    const [inCrement, setInCrement] = useState(1)
    const { ages, sexes } = config
    const dispatch = useDispatch()
    const { addToast } = useToasts()

    const getUploadParams = () => {
        return { url: 'https://httpbin.org/post' }
    }

    const { exam_pics } = useSelector((state) => state.cases)

    const handleChangeStatus = ({ meta }, status) => {
        console.log('status', status, 'meta', meta)
    }
    const initVals = {
        errAge: false,
        errGender: false,
        errReason_consultation: false
    }
    const [errors, setErrors] = useState(initVals)

    const catchErrors = async (event) => {
        if(event) event.preventDefault()

        let isValid = true
        if (values.age === '') {
          setErrors({ ...errors, errAge: true });
          isValid = false
        }
        if (values.gender === '') {
          setErrors({ ...errors, errGender: true });
          isValid = false
        }
        if (values.reason_consultation === '') {
          setErrors({ ...errors, errReason_consultation: true });
          isValid = false
        }
        
        return isValid
    }

    const SubmitCC = async () => {
        
        // if (catchErrors()) {
            dispatch({ type: START_LOADER })

            const patient = await postPatient(values)

            if (!errorApi().test(patient)) {
                const createdCaseOmni = await postCase(values, patient.datas['@id'])
                if (createdCaseOmni.datas['@id'] !== undefined) {
                    let createdImgCaseOmni = post_images(exam_pics, createdCaseOmni.datas['@id'])
                    // if(createdImgCaseOmni) {
                    //     addToast('error ajout images clinical', { appearance: 'error' })
                    // } 
                }

                if (errorApi().test(createdCaseOmni)) {
                    addToast(messages.error, { appearance: 'error' })
                } else {
                    addToast(messages.success, { appearance: 'success' })
                    history.push('/')
                }
            } else {
                addToast(messages.patientError, { appearance: 'error' })
            }

            //ENVOIE LES IMAGES AU BACK
            //post_images(exam_pics)

            dispatch({ type: STOP_LOADER })
            dispatch({ type: UPDATE_LEVEL, level: '' })
            dispatch({ type: UPDATE_STEPPER_POSTCASE, levelStepperPostCase: 0 })
        // }
    }

    const initValues = {
        // Require for create patient but non in figma maquette 

        // Information du patient
        age: '',
        gender: '',
        isASmoker: false,
        isDrinker: false,
        is_medical_background: true,
        treatments: '',
        problemHealth: true,
        old_injury: '',
        //--

        //Omnipratic
        conclusion: '',
        evolution: '',
        keywords: [],
        summary: '',
        title: '',
        symptomes: [],
        specialities: [],
        //isASmoker: false,
        global_desc: '',


        //Omnipratic IMG
        exam_pics: [{}],
    }

    const [values, setValues] = useState(initValues)
    const [showPatient, setShowPatient] = useState('block')
    const [showDiagnostic, setShowDiagnostic] = useState('none')
    const [showFinalisation, setShowFinalisation] = useState('none')
    const [showResponseValid, setShowResponseValid] = useState('none')

    const handleChange = prop => event => {
        switch (prop) {
            case 'isASmoker':
            case 'isDrinker':
                setValues({ ...values, [prop]: event.target.checked });
                break;

            case 'old_injury':
                function addFields() {
                    var container = document.getElementById('fieldset_old_injury')
                    // Clear previous contents of the container
                    /* while (container.hasChildNodes()) {
                            container.removeChild(container.lastChild);
                        } */

                    // Append a node with a random text
                    var newDiv = document.createElement('div')
                    newDiv.setAttribute('id', 'node_old_injury' + inCrement)

                    //   texField.setAttribute("label","minimum height")
                    //   texField.setAttribute("placeholder","Antecedent medicaux")
                    //   texField.setAttribute("variant","outlined")
                    //   texField.setAttribute("label","Antecedent medicaux")
                    //   texField.setAttribute("multilined",true)
                    //   texField.setAttribute("fullWidth",true)
                    newDiv.append(React.createFactory('TexField', <TextField label='Combo box' variant='outlined'>jj</TextField>))

                    container.appendChild(newDiv)
                    // Create an <input> element, set its type and name attributes
                    /*
              
                        var input = document.createElement("input");
                        input.type = "text";
                        input.name = "member" + i;
                        container.appendChild(input);
               
                        */
                    // Append a line break
                    container.appendChild(document.createElement('br'))
                    setInCrement(inCrement + 1)
                }
                addFields()
                setValues({ ...values, [prop]: event.target.value })

                break;

            case 'exam_pics':
                format_file(event, dispatch)
                break;
            case 'problemHealth':
            case 'keywords':
            case 'treatments':
            case 'symptomes':
            case 'specialities':
                setValues({ ...values, [prop]: event.target.value })
                break;
            default:
                setValues({ ...values, [prop]: event.target.value })

        }
    }

    const isStepOptional = (step) => {
        return /*step === 1*/ null;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    // const handleReset = () => {
    //     setActiveStep(0);
    // };

    useEffect(( ) => {
        switch (activeStep) {
            case 0:
                setShowFinalisation('none');
                setShowDiagnostic('none');

                setShowPatient('block');
                break;
            case 1:
                setShowFinalisation('none');
                setShowPatient('none');

                setShowDiagnostic('block');
                break
            case 2:
                setShowPatient('none');
                setShowDiagnostic('none');

                setShowFinalisation('block');
                break;
            case 3:
                SubmitCC()
                break;
            default:
                setShowFinalisation('none');
                setShowDiagnostic('none');
                setShowPatient('none');

                setShowResponseValid('block')
                break;
        }
    }, [activeStep, exam_pics])


    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        {/* <Typography className={classes.instructions}> */}
                        {/*  */}
                        {/* REPONSE DE VALIDATION */}
                        {/*  */}
                        <Box bgcolor="background.paper" display={showResponseValid}>

                            LE CAS A ÉTÉ ENREGISTRTÉ! <span role="img" aria-labelledby={'toto'}>😀</span>
                        </Box>
                        {/* </Typography> */}
                        {/* <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button> */}
                    </div>
                ) : (
                        <div>
                            <Box bgcolor="background.paper" display={showPatient}>
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
                                                    value={values.reason_consultation}
                                                    autoComplete='current-reason_consultation'
                                                    onKeyDown={(e) => e.keyCode !== 13 ? null : catchErrors(e)}
                                                    onChange={handleChange('reason_consultation')}
                                                    error={errors.errReason_consultation}
                                                />
                                                <br />
                                                <TextField
                                                    className='textField'
                                                    id='age'
                                                    label='Age'
                                                    select
                                                    fullWidth
                                                    onChange={handleChange('age')}
                                                    variant='outlined'
                                                    value={values.age === undefined ? 18 : values.age}
                                                    error={errors.errAge}
                                                >
                                                    {ages && ages.map((index, value) => (
                                                        <MenuItem key={index + 1} value={value}>
                                                            {value + ' ans'}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>

                                                <br /> <br />

                                                <TextField
                                                    className='textField'
                                                    id='gender'
                                                    label='Sexe'
                                                    select
                                                    fullWidth
                                                    value={values.gender === undefined ? 'M' : values.gender}
                                                    onChange={handleChange('gender')}
                                                    variant='outlined'
                                                    error={errors.errGender}
                                                >
                                                    {sexes && sexes.map((value, id) => (
                                                        <MenuItem key={id} value={value.id}>
                                                            {value.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>

                                                <br /> <br />

                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <InputLabel className='inputLabel'>
                                                            Fumeur <SmokingRoomsIcon />
                                                        </InputLabel>
                                                        <Switch
                                                            checked={values.isASmoker}
                                                            onChange={handleChange('isASmoker')}
                                                            color='primary'
                                                            name='isASmoker'
                                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                                        /> </Grid>
                                                    <Grid item xs={6}>
                                                        <InputLabel className='inputLabel'>
                                                            Alcool <LocalBarIcon />
                                                        </InputLabel>
                                                        <Switch
                                                            checked={values.isDrinker}
                                                            onChange={handleChange('isDrinker')}
                                                            color='primary'
                                                            name='isDrinker'
                                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
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
                                                    name='problem_health'
                                                    type='textarea'
                                                    id='problem_health'
                                                    value={values.problem_health}
                                                    autoComplete='current-old_injury'
                                                    onChange={handleChange('problem_health')}
                                                // error={/*errors.old_injury*/}
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
                                                    value={values.treatments}
                                                    autoComplete='current-current_treatment'
                                                    onChange={handleChange('treatments')}
                                                    error={errors.errCurrent_treatment}
                                                />
                                                <br />

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
                                                    value={values.allergies}
                                                    autoComplete='current-allergies'
                                                    onChange={handleChange('allergies')}
                                                    error={errors.errAllergies}
                                                />

                                                <br /> <br />
                                            </div>
                                            <div className={classes.paper}>

                                                <br />
                                                <DropzoneArea
                                                    showPreviews={true}
                                                    showPreviewsInDropzone={false}
                                                    //useChipsForPreview
                                                    previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                                                    previewText={`${exam_pics.length} Fichier(s) Chargé(s)`}
                                                    getUploadParams={getUploadParams}
                                                    onChangeStatus={handleChangeStatus}
                                                    onChange={handleChange('exam_pics')}
                                                    acceptedFiles={['image/jpeg', 'image/png', '/image/bmp']}
                                                //initialFiles={[Object(exam_pics)]}
                                                />
                                                {/* <DropzoneDialog
                                                    open={true}
                                                    onSave={handleChange('exam_pics')}
                                                    acceptedFiles={['image/jpeg', 'image/png' , '/image/bmp']}
                                                    showPreviews={true}
                                                    maxFileSize={3000000}
                                                    onClose={false}
                                                /> */}
                                            </div>
                                        </Grid>
                                    </Grid>

                                </form>
                            </Box>

                            {/*  */}
                            {/* DIAGNOSTIC */}
                            {/*  */}

                            <Box display={showDiagnostic}>
                                <form className={classes.form} noValidate >
                                    <Typography component='h1' variant='h5'>
                                        <center>Diagnostic</center>
                                    </Typography>

                                    <Grid container item spacing={2} component='main'>
                                        <Grid item xs={12}>
                                            <div className={classes.paper}>
                                                <TextField
                                                    aria-label='minimum height'
                                                    placeholder='diagnostic'
                                                    variant='outlined'
                                                    label='Diagnostic'
                                                    multiline
                                                    rows={4}
                                                    autoFocus
                                                    fullWidth
                                                    margin='dense'
                                                    required
                                                    name='diagnostic'
                                                    type='textarea'
                                                    id='diagnostic'
                                                    value={values.diagnostic}
                                                    autoComplete='current-diagnostic'
                                                    onChange={handleChange('diagnostic')}
                                                    error={errors.errDiagnostic}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className={classes.paper}>
                                                <div style={{ width: '100%' }}>
                                                    {/* <CreatableSelect
                                                    //POSSIBILITE de trier par catégorie check doc react-select.com
                                                    placeholder={'Pathologie, pas encore fonctionnel'}
                                                    isMulti
                                                    //onChange={onChange('symptomes')}
                                                    options={newPathologie}
                                                /> */}
                                                </div>
                                                <br />
                                                {/* <TextField
                                                    className='textField'
                                                    id='pathologies'
                                                    select
                                                    label='Pathologies'
                                                    onChange={handleChange('pathologies')}
                                                    variant='outlined'
                                                    fullWidth
                                                    SelectProps={{
                                                        multiple: true,
                                                        value: values.pathologies
                                                    }}
                                                    error={errors.errPathologies}
                                                >
                                                    {/* {pathologies && pathologies.map((value) => (
                                                    <MenuItem key={value['@id']} value={value['@id']}>
                                                        {value.name}
                                                    </MenuItem>
                                                ))} 
                                                </TextField> */}

                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className={classes.paper}>
                                                <TextField
                                                    variant='outlined'
                                                    margin='normal'
                                                    required
                                                    name='medication_administered'
                                                    label='Médicaments administrés, utile ?'
                                                    multiline
                                                    fullWidth
                                                    type='text'
                                                    id='medication_administered'
                                                    value={values.medication_administered}
                                                    autoComplete='current-medication_administered'
                                                    onChange={handleChange('medication_administered')}
                                                    error={errors.errMedication_administered}
                                                />
                                                {'Séparer les éléments par des espaces'}

                                                <br /> <br />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>

                            {/*  */}
                            {/* FINALISATION */}
                            {/*  */}

                            <Box display={showFinalisation}>
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
                                                    onChange={handleChange('title')}
                                                    error={errors.errTitle}
                                                />
                                                <br /> <br />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    {`${'Étape précédente'}`}
                                </Button>
                                {isStepOptional(activeStep) && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSkip}
                                        className={classes.button}
                                    >
                                        Skip
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Valider' : 'Étape suivante'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div >
    );
}
