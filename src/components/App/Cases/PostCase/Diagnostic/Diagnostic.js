import './diagnostic.scss'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Typography,
  Button
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import CreatableSelect from "react-select/creatable/dist/react-select.esm";
import oStyle from '../../../../UI/ResponsiveDesign/AuthStyle'
import { UPDATE_LEVEL, UPDATE_STEPPER_POSTCASE } from '../../../../../store/actions'


const useStyles = makeStyles((theme) => (oStyle(theme)))

const Diagnostic = (props) => {
  const classes = useStyles()
  const pathologies = useSelector((state) => state.home.pathologies)

  const dispatch = useDispatch()
  const initVals = {
    errPathologies: false,
    errDiagnostic: false,
    errMedication_administered: false,
    errGlobal_desc: false
  }
  const [errors, setErrors] = useState(initVals)

  const catchSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    if (props.values.diagnostic === '') { setErrors({ ...errors, errDiagnostic: true }); isValid = false }
    if (props.values.pathologies.length < 1) { setErrors({ ...errors, errPathologies: true }); isValid = false }
    if (props.values.medication_administered === '') { setErrors({ ...errors, errMedication_administered: true }); isValid = false }
    if (props.values.global_desc === '') { setErrors({ ...errors, errGlobal_desc: true }); isValid = false }

    if (isValid) {
      dispatch({ type: UPDATE_LEVEL, level: 'treatplan' })
      dispatch({type: UPDATE_STEPPER_POSTCASE, levelStepperPostCase: 3})
    }
  }

  const catchOnmit = async (event) => {
    event.preventDefault()
    dispatch({ type: UPDATE_LEVEL, level: 'exam' })
    dispatch({type: UPDATE_STEPPER_POSTCASE, levelStepperPostCase: 1})

  }

  let newPath1 = pathologies.map(({'@id': value, ...rest}) => ({value, ...rest}));
  const newPathologie = newPath1.map(({'name': label, ...rest}) => ({label, ...rest}));

  return (
    <>
    <form className={classes.form} noValidate>
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
                value={props.values.diagnostic}
                autoComplete='current-diagnostic'
                onChange={props.onChange('diagnostic')}
                error={errors.errDiagnostic}
            />
          </div>
        </Grid>
          <Grid item xs={12} sm={6}>
          <div className={classes.paper}>
            <div style={{width: '100%'}}>
              <CreatableSelect
                  //POSSIBILITE de trier par catégorie check doc react-select.com
                  placeholder={'Pathologie, pas encore fonctionnel'}
                  isMulti
                  //onChange={props.onChange('symptomes')}
                  options={newPathologie}
              />
            </div>
            <br/>
              <TextField
                className='textField'
                id='pathologies'
                select
                label='Pathologies'
                onChange={props.onChange('pathologies')}
                variant='outlined'
                fullWidth
                SelectProps={{
                  multiple: true,
                  value: props.values.pathologies
                }}
                error={errors.errPathologies}
              >
                {pathologies && pathologies.map((value) => (
                  <MenuItem key={value['@id']} value={value['@id']}>
                    {value.name}
                  </MenuItem>
                ))}
              </TextField>

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
                value={props.values.medication_administered}
                autoComplete='current-medication_administered'
                onChange={props.onChange('medication_administered')}
                error={errors.errMedication_administered}
              />

              <br /> <br />
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

export default Diagnostic
