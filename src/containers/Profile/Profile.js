import {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Header from '../../components/App/Header/Header'
import UserAvatar from '../../components/UI/Avatars/UserAvatar'
import {getUserId} from '../../services/Users'
import {getCaseByUserId} from '../../services/Cases'
import CasesItem from '../../components/App/Cases/CaseItem/CaseItem'
import Container from '@material-ui/core/Container'
import {Link} from 'react-router-dom'
import {setup} from '../../services/Auth'
import ParametersProfileButton from "../../components/UI/buttons/ParametersProfileButton";
import {useSelector} from "react-redux";
import Box from "@material-ui/core/Box";
import MailIcon from '@material-ui/icons/Mail';

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
    const currents_user = useSelector((state) => (state.user.current_user))

    const [cases, setCases] = useState({})


    const ResponseCases = async () => {
        const CaseById = await getCaseByUserId(getUserId())
        CaseById.datas && setCases(CaseById.datas['hydra:member'])
    }

    useEffect(() => {
        if (Object.entries(cases).length === 0) {
            ResponseCases()
        }
    })

    if (setup()) {
        return (
            <>
                <Box bgcolor="background.paper" style={{height: "50em"}}>
                    <Header target='profile'/>
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item style={{textAlign: "center"}}>
                                    <Link to='/avatar'>
                                        <Button>
                                            <UserAvatar avatar={currents_user.avatar} width={"150px"}/>
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction='column' spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant='h4'
                                                            style={{textTransform: 'capitalize'}}>
                                                    {currents_user && currents_user.pseudo}
                                                </Typography>
                                                <Typography variant='body2' color='textSecondary'>
                                                    {currents_user && currents_user.job && currents_user.job.name}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <ParametersProfileButton/>
                                            <br/>
                                            <a href="mailto:contact@dentiio.com" target="_top" style={{ textDecoration: "none" }}>
                                            <Button variant="outlined" color="primary" startIcon={<MailIcon />}>
                                                Nous contacter
                                            </Button>
                                            </a>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    {Object.keys(cases).length !== 0 ?
                        <Container maxWidth='lg'>
                            <Typography component='h2' variant='h5' color='primary' style={{paddingTop: '20px'}}>
                                <center>Cas publiés</center>
                            </Typography>
                            <div className={classes.card}>
                                {cases.map((oCase, index) => {
                                    return <CasesItem key={index} item={oCase} btnEdit={true}/>
                                })}
                            </div>
                        </Container> : null
                    }
                </Box>
            </>
        )
    } else {
        window.location.href = '/'
    }
}

export default Profile
