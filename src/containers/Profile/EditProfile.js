import React, {useEffect, useState} from 'react'
import { makeStyles} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Header from '../../components/App/Header/Header'
import {getUserId, getUserById, editUser} from '../../services/Users'
import {setup} from '../../services/Auth'
import TextField from "@material-ui/core/TextField";
import Spinner from "../../components/UI/Dawers/Spinner";
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router-dom'
import {useToasts} from "react-toast-notifications";
import config from "../../config";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {SET_USER} from "../../store/actions";
import {useDispatch} from "react-redux";


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
    arrowBack: {
        marginTop: '70px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '0px'
        }
    }
}))

const EditProfile = () => {
    const classes = useStyles()
    const {addToast} = useToasts()
    let history = useHistory()
    const messages = config.messages.editUser
    const [item, setItem] = useState({})
    const [pseudo, setPseudo] = useState()
    const [email, setEmail] = useState()
    const dispatch = useDispatch()


    const ResponseUser = async () => {
        const response = await getUserById(getUserId())
        setItem(response.datas)

        if (Object.entries(response).length !== 0) {
            dispatch({ type: SET_USER, datas: response.datas })
        }
    }

    useEffect(() => {
        if (Object.entries(item).length === 0) {
            ResponseUser()
        }
    })

    const handleChange = (e, type) => {
        if (type === "pseudo"){setPseudo(e.target.value)}
        if (type === "email"){setEmail(e.target.value)}
    }


    const catchSubmit = async (e) => {
        e.preventDefault()
        const response = await editUser({
            pseudo: pseudo,
            userId: item.id,
            email: email
        })
        await ResponseUser()

        if (response === 'OK') {
            addToast(messages.success, {appearance: 'success'})
        } else {
            addToast(messages.error, {appearance: 'error'})
        }
    }

    if (setup()) {
        if (item.pseudo === undefined) {
            return (<><Header target='profile'/><Spinner/></>)
        } else {
            return (
                <>
                    <Header target='profile'/>
                    <IconButton  className={classes.arrowBack} href={"#"} onClick={() => history.goBack()}>
                        <ArrowBackIcon color='primary'/>
                    </IconButton>
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Typography component={"h1"} variant={"h5"}>
                                        Modifier mes informations
                                    </Typography>
                                    <br/>
                                    <TextField
                                        id="pseudo"
                                        label="Pseudo"
                                        defaultValue={item && item.pseudo}
                                        variant="outlined"
                                        onChange={(e) => {handleChange(e, "pseudo")}}
                                    />
                                    <br/>
                                    <br/>
                                    {/*<br/>
                                    <TextField
                                        id="mail"
                                        label="Mail"
                                        defaultValue={item && item.email}
                                        variant="outlined"
                                        onChange={(e) => {handleChange(e, "email")}}
                                    />
                                    <br/>
                                    <br/>*/}
                                    <Button
                                        onClick={catchSubmit}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        className={classes.button}
                                        startIcon={<SaveIcon/>}
                                    >
                                        Enregistrer
                                    </Button>


                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </>
            )
        }
    }else {
        window.location.href = '/'
    }
}

export default EditProfile
