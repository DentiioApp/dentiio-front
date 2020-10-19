import './exam.scss'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    Typography,
    Button,
    Grid
} from '@material-ui/core/'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import {DropzoneArea} from 'material-ui-dropzone';
import CreatableSelect from 'react-select/creatable';
import ExamComplementaire from "./ExamComplementaire";
import oStyle from '../../../../UI/ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL, UPDATE_STEPPER_POSTCASE } from '../../../../../store/actions'


const useStyles = makeStyles((theme) => (oStyle(theme)))


const Exam = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const symptomes = useSelector((state) => state.home.symptomes)

    const initVals = {
        exam_pics: [],
        extra_exam_desc: [],
        errIntra_extra_oral_desc: false,
        errExtra_exam_name: false,
        errSymptomes: false
    }
    const [errors, setErrors] = useState(initVals)

    const catchSubmit = async (event) => {
        event.preventDefault()
        let isValid = true
        if (props.values.intra_extra_oral_desc === '') {
            setErrors({...errors, errIntra_extra_oral_desc: true});
            isValid = false
        }
        /*if (props.values.extra_exam_name < 1) {
            setErrors({...errors, errExtra_exam_name: true});
            isValid = false
        }
        if (props.values.extra_exam_desc < 1) {
            setErrors({...errors, errExtra_exam_desc: true});
            isValid = false
        }*/
        if (props.values.symptomes.length < 1) {
            setErrors({...errors, errSymptomes: true});
            isValid = false
        }

        if (isValid) {
            dispatch({type: UPDATE_LEVEL, level: 'diagnostic'})
            dispatch({type: UPDATE_STEPPER_POSTCASE, levelStepperPostCase: 2})
        }

    }
    const catchOnmit = async (event) => {
        event.preventDefault()
        dispatch({type: UPDATE_LEVEL, level: ''})
        dispatch({type: UPDATE_STEPPER_POSTCASE, levelStepperPostCase: 0})
    }

    let newSymptome1 = symptomes.map(({'@id': value, ...rest}) => ({value, ...rest}));
    const newSymptome = newSymptome1.map(({'name': label, ...rest}) => ({label, ...rest}));

    return (
        <>
            <form className={classes.form} noValidate>
                <Typography component='h1' variant='h5'>
                    <center>Examen Clinique</center>
                </Typography>

                <Grid container item spacing={3} component='main'>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.paper}>
                            <Button variant='contained' component='label'>
                                <InputLabel className='inputLabel'>
                                    Ajouter des Photos:
                                </InputLabel>
                                <input
                                    type='file'
                                    onChange={props.onChange('exam_pics')}
                                    name='exam_pics'
                                    id='exam_pics'
                                    multiple
                                />
                            </Button>
                            <br/>
                            <DropzoneArea
                                showPreviews={true}
                                showPreviewsInDropzone={false}
                                useChipsForPreview
                                previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                                previewText="Selected files"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.paper}>
                            <TextField
                                aria-label='minimum height'
                                // placeholder='Description intraorale et extraorale'
                                variant='outlined'
                                margin='dense'
                                label='Description intraorale et extraorale'
                                multiline
                                autoFocus
                                required
                                fullWidth
                                rows={4}
                                name='intra_extra_oral_desc'
                                type='textarea'
                                id='intra_extra_oral_desc'
                                value={props.values.intra_extra_oral_desc}
                                autoComplete='current-intra_extra_oral_desc'
                                onChange={props.onChange('intra_extra_oral_desc')}
                                error={errors.errIntra_extra_oral_desc}
                            />

                            <br/> <br/>
                            <div style={{width: '100%'}}>
                                <CreatableSelect
                                    placeholder={'Symptôme, pas encore fonctionnel'}
                                    isMulti
                                    //onChange={props.onChange('symptomes')}
                                    options={newSymptome}
                                />
                            </div>
                            <br/>
                            <br/>

                            <TextField
                                className='textField'
                                id='Symptomes'
                                label='Symptomes'
                                select
                                onChange={props.onChange('symptomes')}
                                variant='outlined'
                                fullWidth
                                SelectProps={{
                                    multiple: true,
                                    value: props.values.symptomes
                                }}
                                error={errors.errSymptomes}
                            >
                                {symptomes && symptomes.map((value) => (
                                    <MenuItem key={value['@id']} value={value['@id']}>
                                        {value.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </div>
                    </Grid>
                  <Grid item xs={12} sm={12}>

                  <div className={classes.paper}>
                  <Typography component='h1' variant='h5'>
                    Examen Complementaire
                  </Typography>

                 {/* <TextField
                      aria-label='minimum height'
                      placeholder="Renseignez le nom l'examen"
                      variant='outlined'
                      margin='dense'
                      label="Nom de l'examen"
                      multiline
                      name='extra_exam_name'
                      type='textarea'
                      id='extra_exam_name'
                      value={props.values.extra_exam_name}
                      autoComplete='current-extra_exam_name'
                      onChange={props.onChange('extra_exam_name')}
                      error={errors.errExtra_exam_name}
                  />*/}

                  <ExamComplementaire onChange={props.onChange} values={props.values}/>
                  </div>
                  </Grid>
                </Grid>
                <center>
                    <Button type='submit'
                            onClick={catchOnmit}
                            className={classes.button}>
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

export default Exam
