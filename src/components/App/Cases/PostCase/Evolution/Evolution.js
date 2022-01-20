import './evolution.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Typography,
  TextField,
  Button
} from '@material-ui/core/'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import oStyle from '../../../../UI/ResponsiveDesign/AuthStyle'
import {UPDATE_LEVEL, UPDATE_STEPPER_POSTCASE} from '../../../../../store/actions'
import AddAPhotoIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {DropzoneArea} from "material-ui-dropzone";

const useStyles = makeStyles((theme) => (oStyle(theme)))

const Evolution = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const initVals = {
    errEvolution: false
  }
  const [errors/*, setErrors*/] = useState(initVals)

  const catchSubmit = async (event) => {
    event.preventDefault()
    let isValid = true
    /*if (props.values.evolution === '') { setErrors({ ...errors, errEvolution: true }); isValid = false }*/
    if (isValid) { dispatch({ type: UPDATE_LEVEL, level: 'cliniccase' })
      dispatch({type: UPDATE_STEPPER_POSTCASE, levelStepperPostCase: 5})

    }
  }

  const catchOnmit = async (event) => {
    event.preventDefault()
    dispatch({ type: UPDATE_LEVEL, level: 'treatplan' })
    dispatch({type: UPDATE_STEPPER_POSTCASE, levelStepperPostCase: 3})
  }

  return (
    <>
    <Typography component='h1' variant='h5'>
      <center>Evolution</center>
    </Typography>
    <form className={classes.form} noValidate>
      <Grid container component='main'>
        <Grid item xs={12} >
          <div className={classes.paper}>
              <TextField
                aria-label='minimum height'
                rows={4}
                placeholder='Description des évolutions'
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='evolution'
                label='Evolution'
                multiline
                autoFocus
                type='textarea'
                id='evolution'
                value={props.values.evolution}
                autoComplete='current-evolution'
                onChange={props.onChange('evolution')}
                error={errors.errEvolution}
              />

              <br />  <br />

              <Button variant='contained' component='label'>
                <InputLabel className='inputLabel'>
                  Ajouter des Photos:
                </InputLabel>
                <input
                  type='file'
                  onChange={props.onChange('evolution_pics')}
                  name='evolution_pics'
                  id='evolution_pics'
                  values={props.values.evolution_pics}
                  multiple
                />
              </Button>

              <br />  <br />
            <DropzoneArea
                showPreviewsInDropzone
                useChipsForPreview
                dropzoneText={'Déposez les photos d\'évolutions'}
                previewGridProps={{container: {spacing: 1, direction: 'row'}}}
                previewText="Selected files"
                Icon={AddAPhotoIcon}
            />
            <br/><br/>
            <TextField
                aria-label='minimum height'
                rows={4}
                placeholder='Conclusion'
                variant='outlined'
                margin='normal'
                required
                autoFocus
                fullWidth
                name='conclusion'
                type='textarea'
                id='conclusion'
                label='Conclusion'
                multiline
                value={props.values.conclusion}
                autoComplete='current-conclusion'
                onChange={props.onChange('conclusion')}
                error={errors.errConclusion}
            />
          </div>
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

export default Evolution
