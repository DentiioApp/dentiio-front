import React from 'react'
import { useSelector } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
    width: '23%',
    height: 'fit-content',
    marginTop: 50,
    background: '#ffffff',
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      position: 'static',
      marginTop: '0px'
    }
  },
  content: {
    textAlign: 'left',
    overflowX: 'auto'
  },
  title: {
    fontSize: 17
  },
  pos: {
    marginBottom: 12,
    marginTop: 12
  }
}))

export default function PatientDetail (props) {
  const classes = useStyles()
  const currentCase = useSelector((state) => state.cases.currentCase)

    const smoker = props.data ? props.data.isASmoker == false ? "Non" : "Oui" : "Non renseigné"
    const drink = props.data ? props.data.isAlcool == false ? "Non" : "Oui" : "Non renseigné"
    const inTreatment = props.data ? props.data.inTreatment.empty ? "Aucun traitement en cours" : "Traitement en cours: " : "Non renseigné"
    const treatment = props.data ? props.data.inTreatment.empty ? "" : props.data.inTreatment : ""
    const problemHealth = props.data ? props.data.problemHealth.empty ? "Aucun" : props.data.problemHealth : ""

    console.log(props.data)

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
                    Anamnèse
        </Typography>
        <Table className={classes.pos}>
          <TableBody>
            <TableRow>
              <TableCell component='th' scope='row'>
                                Age
              </TableCell>
              <TableCell align='left'>
                {props.data && props.data.age} ans
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                                Sexe
              </TableCell>
              <TableCell align='left'>
                  {props.data && props.data.gender}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                                Alcool
              </TableCell>
              <TableCell align='left'>
                  {drink}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                                Fumeur
              </TableCell>
              <TableCell align='left'>
                  {smoker}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Typography variant='body2' component='span'>
            {inTreatment}
            <br/>
            {treatment}
        </Typography>

        <Divider className={classes.pos} />
        <Typography variant='body2' component='span'>
                    Antécédents médicaux :<br />
          {problemHealth}
        </Typography>

        <Divider className={classes.pos} />
        <Typography variant='body2' component='span'>
                    Alergies :<br />
          {currentCase.allergen}
                    Pollen et codéine
        </Typography>
      </CardContent>
      <CardActions />
    </Card>
  )
}
