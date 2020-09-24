import { Avatar, makeStyles } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import React, {useEffect, useState} from 'react'
import Header from '../../components/App/Header/Header'
import imgProfile from '../../images/profile.png'
import {getUserId, getUserById} from '../../services/Users'
import {getCaseByUserId} from '../../services/Cases'
import CasesItem from "../../components/App/CaseItem/CaseItem";
import Container from "@material-ui/core/Container";
import {useSelector} from "react-redux";
import titleSvg from "../../images/maquette/c-case-title.svg";

function logout () {
  localStorage.clear()
  window.location.href = '/'
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '55px'
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(3)
    }
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
  const [item, setItem] = useState({})
  const [cases, setCases] = useState({})

  const ResponseUser = async () => {
    const CaseById = await  getUserById(getUserId())
    setItem(CaseById.datas)
  }
  const ResponseCases = async () => {
    const CaseById = await  getCaseByUserId(getUserId())
    setCases(CaseById.datas['hydra:member'])
  }

  useEffect(() => {
    if (Object.entries(item).length === 0 ) {
      ResponseUser()
    }
    if (Object.entries(cases).length === 0 ) {
      ResponseCases()
    }
  })

  console.log(cases)

  return (
    <>
      <Header target='profile' />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
                <Avatar className={classes.large} alt='' src={imgProfile} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant='h4' style={{textTransform: "capitalize"}}>
                    {item && item.pseudo}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {item && item.job && item.job.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                    onClick={logout}
                    variant="contained"
                    color="inherit"
                    className={classes.button}
                >
                  <ExitToAppIcon fontSize={"small"} color={"inherit"}/>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <Container maxWidth='lg'>
        <Typography component={"h2"} variant={"h5"} color={"primary"} style={{paddingTop: "20px"}}>
          <center>Cas publiés</center>
        </Typography>
        <div className={classes.card}>
          {Object.keys(cases).length !== 0 && cases.map((oCase, index) => {
                return <CasesItem key={index} item={oCase} />
          })}
        </div>
      </Container>
    </>
  )
}

export default Profile
