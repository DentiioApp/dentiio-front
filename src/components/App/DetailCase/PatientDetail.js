import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Divider from '@material-ui/core/Divider'

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

export default function PatientDetail () {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles()
  const currentCase = useSelector((state) => state.cases.currentCase)

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
                                {currentCase.age}
                                33 ans
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                                Sexe
              </TableCell>
              <TableCell align='left'>
                                {currentCase.sexe}
                                Homme
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                                Alcool
              </TableCell>
              <TableCell align='left'>
                                {currentCase.drinker}
                                Oui
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th' scope='row'>
                                Fumeur
              </TableCell>
              <TableCell align='left'>
                                {currentCase.smoker}
                                Oui
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Typography variant='body2' component='span'>
                    Traitement en cours :<br />
                    {currentCase.currentTreatment}
                    Tramadol tous les soirs
        </Typography>

        <Divider className={classes.pos} />
        <Typography variant='body2' component='span'>
                    Antécédents médicaux :<br />
                    {currentCase.oldAffect}
                    Fibromialgie il y a 5 ans , Cholesterol  et Diabète controlé
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
