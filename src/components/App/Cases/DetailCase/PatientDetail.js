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
import LocalBarIcon from '@material-ui/icons/LocalBar';
import SmokeFreeIcon from '@material-ui/icons/SmokeFree';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';

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
  const inTreatment = props.data ? props.data.inTreatment.empty ? 'Aucun traitement en cours' : 'Traitement en cours: ' : 'Non renseigné'
  const treatment = props.data ? props.data.inTreatment.empty ? '' : props.data.inTreatment : ''
  const problemHealth = props.data ? props.data.problemHealth.empty ? 'Aucun' : props.data.problemHealth : ''

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
                {props.data?.age} ans
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                                Sexe
              </TableCell>
              <TableCell align='left'>
                {props.data?.gender}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                Addiction
              </TableCell>
              <TableCell align='left'>
                {props.data?.isAlcool ? <LocalBarIcon /> : '' }
                {props.data?.isASmoker ? <SmokingRoomsIcon /> : <SmokeFreeIcon /> }
              </TableCell>
            </TableRow>
            <TableRow>
            </TableRow>
          </TableBody>
        </Table>
        <Typography variant='body2' component='span'>
          {inTreatment}
          <br />
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
          {props.data?.allergie}
        </Typography>
      </CardContent>
      <CardActions />
    </Card>
  )
}
