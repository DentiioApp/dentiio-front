import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
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
import TextField from '@material-ui/core/TextField';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms'
import { DropzoneArea/*, DropzoneDialog */ } from 'material-ui-dropzone';
import LocalBarIcon from '@material-ui/icons/LocalBar'
import { format_file, post_images } from "../../../../../store/actions";
import { useToasts } from 'react-toast-notifications'
import { EXAM_TYPE, TREAT_TYPE, IMAGE_EXAM_EDITION, IMAGE_TREAT_EDITION } from '../../../../../store/actions'
import { postCase } from '../../../../../services/Cases'
import { postPatient } from '../../../../../services/Patient'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Box from "@material-ui/core/Box";
import { createCanvas } from 'canvas';
import { errorApi } from '../../../../../utils'
import mergeImages from 'merge-images';
import Spinner from "../../../../UI/Dawers/Spinner";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Palette from "../../../../UI/ColorTheme/Palette";
import axios from 'axios';


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

  const { exam_pics, treat_pics } = useSelector((state) => state.cases)

  const handleChangeStatus = ({ meta }, status) => {
  }

  const initVals = {
    errAge: false,
    errGender: false,
    errReason_consultation: false,

    errDiagnostic: false,
    errMedication_administered: false,
    errTitle: false,
    errSummary: false,
  }

  const [errors, setErrors] = useState(initVals);

  const catchErrors = (page) => {
    let isValid = true

    switch (page) {
      case 'patient':
        if (values.age === '') {
          setErrors({ ...errors, errAge: true });
          isValid = false;
        } else {
          setErrors({ ...errors, errAge: false });
        }

        if (values.gender === '') {
          setErrors({ ...errors, errGender: true });
          isValid = false;
        } else {
          setErrors({ ...errors, errGender: false });
        }


        if (values.reason_consultation === '') {
          setErrors({ ...errors, errReason_consultation: true });
          isValid = false;
        } else {
          setErrors({ ...errors, errReason_consultation: false });
        }

        if (values.summary === '') {
          setErrors({ ...errors, errSummary: true });
          isValid = false;
        } else {
          setErrors({ ...errors, errSummary: false });
        }
        break;

      case 'diagnostic':
        if (values.pathologie === '') {
          setErrors({ ...errors, errDiagnostic: true });
          isValid = false;
        } else {
          setErrors({ ...errors, errDiagnostic: false });
        }
        if (values.treatment_desc === '') {
          setErrors({ ...errors, errMedication_administered: true });
          isValid = false;
        } else {
          setErrors({ ...errors, errMedication_administered: false });
        }
        break;

      case 'finalisation':
        if (values.title === '') {
          setErrors({ ...errors, errTitle: true });
          isValid = false;
        }
        break;
    }

    return isValid;
  }

  const [clinicalOmniID, setClinicalOmniID] = useState();
  const [isLoadEXAM, setIsLoadEXAM] = useState({ init: exam_pics.length, current: 0 });
  const [isLoadTREAT, setIsLoadTREAT] = useState({ init: treat_pics.length, current: 0 });

  const SubmitCC = async () => {
    const patientPost = await postPatient(values);
    const casePost = await postCase(values, patientPost.datas['@id']);

    if(Object.entries(exam_pics).length > 0) {
      const examPost = await post_images(exam_pics, casePost.datas['@id'], EXAM_TYPE);
      setIsLoadEXAM({ ...isLoadEXAM, current: isLoadEXAM.current + 1 })
    } else {
      localStorage.setItem('finishloadimgEXAM', 'no_data');
    }

    if(Object.entries(treat_pics).length > 0) {
      const treatPost = await post_images(treat_pics, casePost.datas['@id'], TREAT_TYPE);
      setIsLoadTREAT({ ...isLoadTREAT, current: isLoadTREAT.current + 1 });
    } else {
      localStorage.setItem('finishloadimgTREAT','no_data');
    }

    setClinicalOmniID(casePost.datas['id']);
  }

  const initValues = {
    // Information du patient
    age: '',
    gender: '',
    isASmoker: false,
    isDrinker: false,
    is_medical_background: true,
    treatments: '',
    problem_health: '',
    old_injury: '',
    allergies: '',
    //--

    //Omnipratic
    conclusion: '',
    evolution: '',
    keywords: [],
    summary: '',
    title: '',
    pathologie: '',
    treatment_desc: '',
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
  const [showSpinner, setshowSpinner] = useState(false)

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
    let isValidPage = false;

    if (showPatient !== 'none') { isValidPage = catchErrors('patient') }
    if (showDiagnostic !== 'none') { isValidPage = catchErrors('diagnostic') }
    if (showFinalisation !== 'none') { isValidPage = catchErrors('finalisation') }

    if (isValidPage) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
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


  /*  //TO DO KEEP ON LOOK VERSION SUPPORT HD IMAGE https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality#browser_compatibility */
  const isSupportDeviceOrBrowser = () => {
    let isSupport = false;
    return isSupport = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && navigator.platform.toLowerCase().indexOf("android") > -1 ? false : true;
  }

  function isInternetExplorer() {
    let isIE = false;
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./)); // Si c'est Internet Explorer, dire que c'est Internet explorer
    isIE = true;
    return isIE;
  }

  if (isSupportDeviceOrBrowser && !isInternetExplorer) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
  }

  const [canvaState, setCanvasState] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(1);
  const [imgTypeSlider, setImgTypeSlider] = useState(EXAM_TYPE);
  const [ismodif, setIsmodif] = useState(0);
  const finish = () => {
    addToast(messages.success, { appearance: 'success' });
  }
  const handleImgBack = () => {
    setStep_slide((step_slide - 1));
  }

  const handleImgNext = () => {
    setStep_slide((step_slide + 1));
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

  }, [step_slide, imgTypeSlider, ismodif]);

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
        SubmitCC();
        setshowSpinner(true)
        let stop = false;
        let fileExistInApi = false;
        var myHeaders = new Headers();

        let intervalID = setInterval(() => {

          if (localStorage.getItem('finishloadimgTREAT') !== null && localStorage.getItem('finishloadimgEXAM') !== null) {

            if (/^.*[0-9].*/.test(localStorage.getItem('finishloadimgEXAM')) || /^.*[0-9].*/.test(localStorage.getItem('finishloadimgTREAT'))) {
              localStorage.removeItem('finishloadimgEXAM');
              localStorage.removeItem('finishloadimgTREAT');
              stop = true;
              setShowFinalisation('none');
              setShowDiagnostic('none');
              setShowPatient('none');
              setShowResponseValid('block')
              setshowSpinner(false)
            } else {
              fetch(`${process.env.REACT_APP_BACK_URL}images/${localStorage.getItem('directory')}`,
                {
                  method: 'GET',
                  headers: myHeaders,
                  guard: 'request-no-cors',
                  mode: 'no-cors',
                  cache: 'no-store'
                })
                .then((res) => {
                  if (res['status'] === 0) {
                    fileExistInApi = true;
                  }
                });
            }

            if (fileExistInApi) {
              localStorage.removeItem('finishloadimgEXAM');
              localStorage.removeItem('finishloadimgTREAT');
              setTimeout(() => {
                localStorage.removeItem('directory');
                stop = true;
                setShowFinalisation('none');
                setShowDiagnostic('none');
                setShowPatient('none');
                setShowResponseValid('block')
                setshowSpinner(false)

              }, 2000, finish)
            }
            if (stop) { clearInterval(intervalID); };
          }

        }, 1000);
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


      let array_to_merge = [
        { 'src': canvaState.toDataURL(), 'x': 0, 'y': 0 },
        { 'src': img_for_hide, 'x': pointed_X, 'y': pointed_Y },
      ];

      let action = {
        'EXAM': IMAGE_EXAM_EDITION,
        'TREAT': IMAGE_TREAT_EDITION,
      }

      mergeImages(array_to_merge)
        .then((b64) => {
          dispatch({ type: action[imgTypeSlider], _img: b64, currentImgIndex: currentImgIndex });
          setIsmodif((ismodif + 1))
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
      <Stepper activeStep={activeStep} alternativeLabel>
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
        {showSpinner ?
          <div hidden={!showSpinner} style={{ marginTop: '-50px' }}>
            <Spinner />
          </div>
          : ''}
        {activeStep === steps.length ? (
          <div>
            <Box bgcolor="background.paper" display={showResponseValid}>
              <Grid container item spacing={3} component='main'>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                  <center>
                    <h1 color={Palette.primary}>VOTRE CAS A ÉTÉ ENREGISTRÉ !</h1>
                    <br></br>
                    <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfgi6WlyYhqpOgG46G4iEUeTobpS_52J4mKvCZbSZr-FM0FnA/viewform" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        color={"primary"}
                        size={"large"}
                        startIcon={<AssignmentLateIcon />}
                      >
                        Répondez à notre formulaire
                      </Button>
                    </a>
                    <br />
                    <br />
                    <Link to={`/case/${clinicalOmniID}`} style={{ textDecoration: 'none' }}>
                      <Button
                        variant="outlined"
                        color={"primary"}
                        startIcon={<VisibilityIcon />}
                      >
                        Consulter mon cas
                      </Button>
                    </Link>
                  </center>

                </Grid>
              </Grid>

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
                          autoFocus
                          required
                          type="number"
                          InputProps={{ inputProps: { min: 0, max: 150 } }}
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
                          required
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
                          fullWidth
                          name='problem_health'
                          type='textarea'
                          id='problem_health'
                          value={values.problem_health}
                          autoComplete='current-old_injury'
                          onChange={handleChange('problem_health')}
                        />

                        <TextField
                          aria-label='minimum height'
                          placeholder='Renseignez le(s) traitement(s)'
                          variant='outlined'
                          label='Sous traitement'
                          multiline
                          fullWidth
                          margin='normal'
                          name='current_treatment'
                          type='textarea'
                          id='current_treatment'
                          value={values.treatments}
                          autoComplete='current-current_treatment'
                          onChange={handleChange('treatments')}

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
                          aria-label='minimum height'
                          multiline
                          rows={4}
                          placeholder='Description des examens'
                          variant='outlined'
                          margin='normal'
                          label='Description des examens'
                          required
                          fullWidth
                          name='description_des_examens'
                          type='textarea'
                          id='description_des_examens'
                          value={values.summary}
                          autoComplete='current-summary'
                          onKeyDown={(e) => e.keyCode !== 13 ? null : catchErrors(e)}
                          onChange={handleChange('summary')}
                          error={errors.errSummary}
                        />
                        <br />
                      </div>
                      <div className={classes.paper}>
                        <br />
                        <DropzoneArea
                          showPreviews={true}
                          filesLimit={config.app.uploadFilesLimit}
                          maxFileSize={config.app.uploadFilesSizeLimit}
                          showPreviewsInDropzone={false}
                          previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                          previewText={`${exam_pics.length} Image(s) d'examen`}
                          Icon={AddAPhotoIcon}
                          dropzoneText={"Ajoutez les images de vos examens cliniques"}
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
                      <Typography component='h1' variant='h5' style={{ padding: 20 }}>
                        <center>Diagnostic & Traitement</center>
                      </Typography>

                      <Grid container item spacing={2} component='main'>
                        <Grid item xs={12}>
                          <div className={classes.paper}>
                            <TextField
                              aria-label='minimum height'
                              placeholder='...pathologie diagnostiquée'
                              variant='outlined'
                              label='Pathologie diagnostiquée'
                              multiline
                              rows={2}
                              autoFocus
                              fullWidth
                              margin='dense'
                              required
                              name='pathologie'
                              type='textarea'
                              id='pathologie'
                              value={values.pathologie}
                              autoComplete='current-pathologie'
                              onChange={handleChange('pathologie')}
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
                              name='treatment_desc'
                              label='Description du plan de traitement'
                              multiline
                              rows={4}
                              fullWidth
                              type='text'
                              id='treatment_desc'
                              value={values.treatment_desc}
                              autoComplete='current-treatment_desc'
                              onChange={handleChange('treatment_desc')}
                              error={errors.errMedication_administered}
                            />
                            <br /> <br />
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          <div className={classes.paper}>
                            <DropzoneArea
                              showPreviews={true}
                              maxFileSize={config.app.uploadFilesSizeLimit}
                              filesLimit={config.app.uploadFilesLimit}
                              showPreviewsInDropzone={false}
                              previewText={`${treat_pics.length} Image(s) de traitement`}
                              Icon={AddAPhotoIcon}
                              dropzoneText={"Ajoutez les images du traitement"}
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
                    <Typography component='h1' variant='h5' style={{ padding: 20 }}>
                      <center>Ajouter votre cas clinique</center>
                    </Typography>
                    <form className={classes.form} noValidate>
                      <Grid container component='main'>
                        <Grid item xs={12}>
                          <div className={classes.paper}>
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
                              value={values.title}
                              autoComplete='current-title'
                              onChange={handleChange('title')}
                              error={errors.errTitle}
                            />
                            <br /> <br />
                          </div>
                        </Grid>
                        {/* <Box>
                            <Typography component='h1' variant='h5'>
                                <center>Retouche photos  <Grid container component='main'>
                                    <Grid item xs={12}>
                                        {imgTypeSlider === EXAM_TYPE ?
                                            (exam_pics && exam_pics[(step_slide - 1)] ? <ChevronLeftIcon color="primary" onClick={handleImgBack} /> : '')
                                            : null
                                        }
                                        {imgTypeSlider === EXAM_TYPE ?
                                            (exam_pics && exam_pics[(step_slide + 1)] ? <ChevronRightIcon color="primary" onClick={handleImgNext} /> : '')
                                            : null
                                        }

                                        {imgTypeSlider === TREAT_TYPE ?
                                            (treat_pics && treat_pics[(step_slide - 1)] ? <ChevronLeftIcon color="secondary" onClick={handleImgBack} /> : '')
                                            :
                                            null
                                        }
                                        {imgTypeSlider === TREAT_TYPE ?
                                            (treat_pics && treat_pics[(step_slide + 1)] ? <ChevronRightIcon color="secondary" onClick={handleImgNext} /> : '')
                                            :
                                            null
                                        }

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
                            {/* {<img onClick={handlePointed} id="canva_slider" src={`${canvaState && canvaState.toDataURL()}`} />} */}
                        { /*<img id="canva_slider" src={`${canvaState && canvaState.toDataURL()}`} />}
                        </Box> */}
                      </Grid>
                    </form>
                  </Box>
                </Grid>
              </Grid>
              <Grid container item spacing={2} component='main'>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    {`${'précédent'}`}
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
                    {activeStep === steps.length - 1 ? 'Valider' : 'suivant'}
                  </Button>
                  <br /><br /><br /><br /><br /><br />
                </Grid>
              </Grid>
            </div>
          )}
      </div>
    </div >
  );
}