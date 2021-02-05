import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import config from '../../../../../config'
import img_for_hide from '../../../../../images/hide.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Typography,
  Button
} from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextField from '@material-ui/core/TextField';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms'
import { DropzoneArea/*, DropzoneDialog */ } from 'material-ui-dropzone';
import LocalBarIcon from '@material-ui/icons/LocalBar'
import { format_file, post_images } from "../../../../../store/actions";
import { useToasts } from 'react-toast-notifications'
import { UPDATE_LEVEL, UPDATE_STEPPER_POSTCASE, START_LOADER, STOP_LOADER, EXAM_TYPE, TREAT_TYPE, ADD_CENSOR_POINT, DROP_CENSOR_POINTS } from '../../../../../store/actions'
import { postCase } from '../../../../../services/Cases'
import { postPatient } from '../../../../../services/Patient'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Box from "@material-ui/core/Box";
import { createCanvas } from 'canvas';
import { errorApi, ModifyImage } from '../../../../../utils'

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

  const [step_slide, setStep_slide] = useState(-1)

  const [inCrement, setInCrement] = useState(1)
  const { ages, sexes } = config
  const dispatch = useDispatch()
  const { addToast } = useToasts()

  const getUploadParams = () => {
    return { url: process.env.REACT_APP_UPLOADS_PATH } // REACT_APP_UPLOADS_PATH  TO CREATE
  }

  const { exam_pics, treat_pics, censor_points } = useSelector((state) => state.cases)
  console.table([{ 'treat_pics :': treat_pics, 'exam_pics: ': exam_pics }, { 'stepslide: ': step_slide }])

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
    if (event) event.preventDefault()

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
        let createdImgCaseOmniExam = post_images(exam_pics, createdCaseOmni.datas['@id'], EXAM_TYPE)

        if (createdImgCaseOmniExam) {
          addToast('error ajout images exam clinical', { appearance: 'error' })
        }

        let createdImgCaseOmniTreat = post_images(treat_pics, createdCaseOmni.datas['@id'], TREAT_TYPE)

        if (createdImgCaseOmniTreat) {
          addToast('error ajout images treatment clinical', { appearance: 'error' })
        }
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
    treat_pics: [{}],
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
          var container = document.getElementById('fieldset_old_injury');

          // Append a node with a random text
          var newDiv = document.createElement('div');
          newDiv.setAttribute('id', 'node_old_injury' + inCrement);

          newDiv.append(React.createFactory('TexField', <TextField label='Combo box' variant='outlined'>jj</TextField>));

          container.appendChild(newDiv);
          // Create an <input> element, set its type and name attributes
          /*
    
              var input = document.createElement("input");
              input.type = "text";
              input.name = "member" + i;
              container.appendChild(input);
     
              */
          // Append a line break
          container.appendChild(document.createElement('br'));
          setInCrement(inCrement + 1);
        }
        addFields();
        setValues({ ...values, [prop]: event.target.value });

        break;

      case 'exam_pics':
        format_file(event, dispatch, exam_pics, EXAM_TYPE);
        break;
      case 'treat_pics':
        format_file(event, dispatch, treat_pics, TREAT_TYPE);
        break;
      case 'problemHealth':
      case 'keywords':
      case 'treatments':
      case 'symptomes':
      case 'specialities':
        setValues({ ...values, [prop]: event.target.value });
        break;
      default:
        setValues({ ...values, [prop]: event.target.value });

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

  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');
  if( "is version to device") {
      ctx.imageSmoothingQuality = 'high';
      ctx.imageSmoothingEnabled = true;
  }

  const [canvaState, setCanvasState] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(1);
  const [imgTypeSlider, setImgTypeSlider] = useState(EXAM_TYPE);

  const handleImgBack = () => {
    setStep_slide((step_slide - 1));
    console.log('Back :', step_slide);
  }

  const handleImgNext = () => {
    setStep_slide((step_slide + 1));
    console.log('Next :', step_slide);
  }

  useEffect(() => {
    var img = new Image();
    if (imgTypeSlider === EXAM_TYPE) {
      if (exam_pics[step_slide]) {
        img.src = exam_pics[step_slide]._img;
        ctx.drawImage(img, 0, 0, 500, 500);
        setCurrentImgIndex(step_slide)
      }
    } else {
      if (treat_pics[step_slide]) {
        img.src = treat_pics[step_slide]._img;
        ctx.drawImage(img, 0, 0, 500, 500);
        setCurrentImgIndex(step_slide);
      }
    }

    setCanvasState(canvas);

  }, [step_slide, imgTypeSlider, censor_points]);

  useEffect(() => {
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
        setStep_slide(0);
        setShowPatient('none');
        setShowDiagnostic('none');
        setShowFinalisation('block');
        break;
      case 3:
        SubmitCC()
        setShowFinalisation('none');
        setShowDiagnostic('none');
        setShowPatient('none');

        setShowResponseValid('block')
        break;
      default:

        break;
    }
  }, [activeStep])

  const handlePointed = (e) => {
    if (canvaState) {
      let canva_slider = document.getElementById("canva_slider");
      const pointed_X = (e.clientX - canva_slider.offsetLeft) - 7; //-7 marge custom pr préciser le click
      const pointed_Y = e.clientY - canva_slider.offsetTop + window.scrollY - 5; //-5 marge custom pr préciser le click

      ModifyImage({ 'src': img_for_hide, 'x': pointed_X, 'y': pointed_Y }, canvaState.toDataURL(), currentImgIndex, dispatch, EXAM_TYPE).then((res) => {
        dispatch({ type: DROP_CENSOR_POINTS });
      });
    }
  }

  const handleChangeImgTypeSlider = () => {
    if (imgTypeSlider === EXAM_TYPE) {
      setImgTypeSlider(TREAT_TYPE);
      setStep_slide(0);
    } else {
      setImgTypeSlider(EXAM_TYPE);
      setStep_slide(0);
    }
  }

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
            <Box bgcolor="background.paper" display={showResponseValid}>

              LE CAS A ÉTÉ ENREGISTRTÉ! <span role="img" aria-labelledby={'toto'}>😀</span>
            </Box>
          </div>
        ) : (
            <div>
              <Box bgcolor="background.paper" display={showPatient}>
                <form className={classes.form} noValidate>
                  <Typography component='h1' variant='h5' style={{ padding: 20 }}>
                    <center>Information patient</center>
                  </Typography>
                  <Grid container item spacing={3} component='main'>
                    <Grid item xs={1} md={3}></Grid>
                    <Grid item xs={10} md={6}>
                      <div className={classes.paper}>
                        <br />
                        <TextField
                          className='textField'
                          id='age'
                          label='Age'
                          type="number"
                          fullWidth
                          onChange={handleChange('age')}
                          variant='outlined'
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

                        <br /> <br />
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
                      </div>
                      <div className={classes.paper}>
                        <br />
                        <DropzoneArea
                          showPreviews={true}
                          showPreviewsInDropzone={false}
                          previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                          previewText={`${exam_pics.length} Fichier(s) Chargé(s)`}
                          getUploadParams={getUploadParams}
                          onChangeStatus={handleChangeStatus}
                          onChange={handleChange('exam_pics')}
                          acceptedFiles={['image/jpeg', 'image/png', '/image/bmp']}
                        //initialFiles={[Object(exam_pics)]}
                        />
                      </div>
                    </Grid>
                  </Grid>

                </form>
              </Box>

              {/*  */}
              {/* DIAGNOSTIC */}
              {/*  */}
              <Grid container item spacing={2} component='main'>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
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
                        <Grid item xs={12} >
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
                        <Grid item xs={12}>
                          <div className={classes.paper}>
                            <DropzoneArea
                              showPreviews={true}
                              showPreviewsInDropzone={false}
                              //useChipsForPreview
                              previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                              getUploadParams={getUploadParams}
                              onChangeStatus={handleChangeStatus}
                              onChange={handleChange('treat_pics')}
                              acceptedFiles={['image/jpeg', 'image/png', '/image/bmp']}
                            />

                          </div>
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                </Grid>
              </Grid>
              {/*  */}
        {/* FINALISATION */}
        {/*  */}
        <Grid container item spacing={2} component='main'>
          <Grid item xs={1} md={3}></Grid>
          <Grid item xs={10} md={6}>
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
                  <Box>
                    <Typography component='h1' variant='h5'>
                      <center>Retouche photos  <Grid container component='main'>
                        <Grid item xs={12}>
                          {exam_pics && exam_pics[(step_slide - 1)] ? <ChevronLeftIcon color="secondary" onClick={handleImgBack} /> : ''}
                          <ChevronRightIcon onClick={handleImgNext} />
                        </Grid>
                      </Grid></center>
                    </Typography>
                    <center>
                      <Button
                        variant="contained"
                        color={imgTypeSlider === EXAM_TYPE ? "secondary" : "primary"}
                        onClick={handleChangeImgTypeSlider}
                        className={classes.button}
                      >
                        {`AFFICHER LES PHOTOS  ${(imgTypeSlider === EXAM_TYPE ? 'DE ' + TREAT_TYPE + 'TEMENT ' : 'D ' + EXAM_TYPE + 'ENS')} `}
                      </Button>
                    </center>
                    {<img onClick={handlePointed} id="canva_slider" src={`${canvaState && canvaState.toDataURL()}`} />}
                  </Box>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
        <Grid container item spacing={2} component='main'>
          <Grid item xs={1} md={3}></Grid>
          <Grid item xs={10} md={6}>
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
          </Grid>
        </Grid>
      </div>
          )}
    </div>
    </div >
  );
}
