import { Avatar, makeStyles } from '@material-ui/core'
import ButtonBase from '@material-ui/core/ButtonBase'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Header from '../../components/App/Header/Header'
import imgProfile from '../../images/profile.svg'

function logout () {
  localStorage.clear()
  window.location.href = '/'
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '55px'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '80%'
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  flright: {
    float: 'right'
  },
  flex: {
    display: 'flex'
  }
}))

const Profile = () => {
  const classes = useStyles()
  return (
    <>
      <Header target='profile' />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <Avatar className={classes.large} alt='' src={imgProfile} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs >
                  <Typography gutterBottom variant="h4">
                    John Doe
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    Médecin
                  </Typography>
                </Grid>
              </Grid>

              <Grid item>
                <button onClick={logout}>Se déconnecter</button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default Profile
